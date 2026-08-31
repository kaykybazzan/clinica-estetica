"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "./Button";
import { Icon } from "./Icon";
import { Field, controlClassFor } from "./Field";
import { services } from "@/data/services";
import { CONVERSION_EVENTS, trackEvent } from "@/analytics/track";
import { contactFields } from "@/forms/config";
import { formatPhoneBR, validateLead } from "@/forms/validation";
import type { FieldErrors, LeadPayload } from "@/forms/types";
import { cn } from "@/utils/cn";
import { uiContent } from "@/data/ui";

type Status = "idle" | "submitting" | "success" | "error";

export interface ContactFormProps {
  presetService?: string;
  tone?: "default" | "dark";
  className?: string;
}

function initialValues(presetService?: string): LeadPayload {
  const values: LeadPayload = { consent: false, website: "", renderedAt: 0 };
  for (const field of contactFields()) values[field.name] = field.name === "service" ? presetService ?? "" : "";
  return values;
}

export function ContactForm({ presetService, tone = "default", className }: ContactFormProps) {
  const fields = useMemo(() => contactFields(), []);
  const [values, setValues] = useState<LeadPayload>(() => initialValues(presetService));
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const renderedAt = useRef(0);
  const summaryRef = useRef<HTMLParagraphElement>(null);
  const dark = tone === "dark";
  const serviceOptions = useMemo(() => services.map((service) => service.title), []);

  useEffect(() => { renderedAt.current = Date.now(); }, []);

  function validateField(name: string, value: string | boolean) {
    const found = validateLead({ ...values, [name]: value, renderedAt: renderedAt.current });
    setErrors((current) => {
      const next = { ...current };
      if (found[name]) next[name] = found[name];
      else delete next[name];
      return next;
    });
  }

  function update(key: string, value: string | boolean) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      if (!current[key]) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const payload: LeadPayload = { ...values, renderedAt: renderedAt.current };
    const found = validateLead(payload);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      summaryRef.current?.focus();
      return;
    }

    setStatus("submitting");
    trackEvent(CONVERSION_EVENTS.formSubmit, { service: String(values.service || "não informado") });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const body = (await response.json().catch(() => ({}))) as { errors?: FieldErrors };
        if (body.errors) setErrors(body.errors);
        setStatus("error");
        return;
      }
      trackEvent(CONVERSION_EVENTS.formSuccess, { service: String(values.service || "não informado") });
      setStatus("success");
      setValues(initialValues(presetService));
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className={cn("rounded-[var(--nx-card-radius)] border p-8 text-center", dark ? "border-white/15 bg-white/5 text-on-dark" : "border-line bg-surface", className)} role="status">
        <span className="mx-auto mb-4 grid size-12 place-items-center rounded-full bg-primary text-on-primary"><Icon name="check" size={24} /></span>
        <p className="font-heading text-h3 font-semibold">{uiContent.contactForm.successTitle}</p>
        <p className={cn("mt-2", dark ? "text-on-dark-muted" : "text-fg-soft")}>{uiContent.contactForm.successMessage}</p>
        <Button variant="outline" size="sm" className="mt-6" onClick={() => setStatus("idle")}>Enviar outra mensagem</Button>
      </div>
    );
  }

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <form onSubmit={onSubmit} noValidate className={cn("flex flex-col gap-5", className)}>
      {(hasErrors || status === "error") && (
        <p ref={summaryRef} tabIndex={-1} role="alert" className="rounded-[var(--radius-brand-sm)] border border-primary bg-primary-soft px-4 py-3 text-sm font-medium text-primary">
          {status === "error" ? "O envio não foi concluído. Tente novamente ou use um dos canais diretos." : "Revise os campos destacados abaixo para concluir o envio."}
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        {fields.map((field) => {
          const value = String(values[field.name] ?? "");
          const options = field.source === "services" ? serviceOptions : field.options ?? [];
          const full = field.fullWidth || field.type === "textarea";
          return (
            <div key={field.name} className={full ? "sm:col-span-2" : undefined}>
              <Field id={`nx-${field.name}`} label={field.label} required={field.required} error={errors[field.name]} hint={field.hint}>
                {({ id, describedBy, invalid }) => {
                  if (field.type === "textarea") {
                    return <textarea id={id} name={field.name} rows={5} value={value} onChange={(e) => update(field.name, e.target.value)} onBlur={() => validateField(field.name, value)} aria-describedby={describedBy} aria-invalid={invalid} className={cn(controlClassFor(invalid), "resize-y")} placeholder={field.placeholder} maxLength={field.maxLength} />;
                  }
                  if (field.type === "select") {
                    return (
                      <select id={id} name={field.name} value={value} onChange={(e) => update(field.name, e.target.value)} onBlur={() => validateField(field.name, value)} aria-describedby={describedBy} aria-invalid={invalid} className={controlClassFor(invalid)}>
                        <option value="">Selecione</option>
                        {options.map((option) => <option key={option} value={option}>{option}</option>)}
                      </select>
                    );
                  }
                  return (
                    <input
                      id={id}
                      name={field.name}
                      type={field.type}
                      inputMode={field.type === "tel" ? "tel" : undefined}
                      autoComplete={field.name === "name" ? "name" : field.type === "email" ? "email" : field.type === "tel" ? "tel" : undefined}
                      value={value}
                      onChange={(e) => update(field.name, field.type === "tel" ? formatPhoneBR(e.target.value) : e.target.value)}
                      onBlur={() => validateField(field.name, field.type === "tel" ? formatPhoneBR(value) : value)}
                      aria-describedby={describedBy}
                      aria-invalid={invalid}
                      className={controlClassFor(invalid)}
                      placeholder={field.placeholder}
                      maxLength={field.maxLength}
                    />
                  );
                }}
              </Field>
            </div>
          );
        })}
      </div>

      <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor="nx-website">Não preencha este campo</label>
        <input id="nx-website" name="website" type="text" tabIndex={-1} autoComplete="off" value={String(values.website ?? "")} onChange={(e) => update("website", e.target.value)} />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="nx-consent" className="flex items-start gap-3 text-sm">
          <input id="nx-consent" name="consent" type="checkbox" checked={values.consent === true} onChange={(e) => update("consent", e.target.checked)} aria-invalid={Boolean(errors.consent)} aria-describedby={errors.consent ? "nx-consent-error" : undefined} className="mt-1 size-4 shrink-0 accent-[var(--nx-primary)]" />
          <span className={dark ? "text-on-dark-muted" : "text-fg-soft"}>Autorizo o contato sobre esta solicitação e li a <Link href="/politica-de-privacidade" className="text-primary underline underline-offset-4">Política de Privacidade</Link>.</span>
        </label>
        {errors.consent && <p id="nx-consent-error" className="text-sm font-medium text-primary">{errors.consent}</p>}
      </div>

      <Button type="submit" size="lg" disabled={status === "submitting"} icon={status === "submitting" ? undefined : "arrowRight"}>
        {status === "submitting" ? "Enviando…" : "Enviar mensagem"}
      </Button>
    </form>
  );
}

import type { BusinessHours, DayHours, WeekdayKey } from "@/config/client.schema";

export const WEEKDAY_ORDER: WeekdayKey[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export const WEEKDAY_LABEL: Record<WeekdayKey, string> = {
  monday: "Segunda",
  tuesday: "Terça",
  wednesday: "Quarta",
  thursday: "Quinta",
  friday: "Sexta",
  saturday: "Sábado",
  sunday: "Domingo",
};

/** Schema.org day codes, used by the LocalBusiness openingHoursSpecification. */
export const WEEKDAY_SCHEMA: Record<WeekdayKey, string> = {
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
};

export function formatDayHours(day: DayHours): string {
  if (day.closed || !day.opens || !day.closes) return "Fechado";
  return `${day.opens} às ${day.closes}`;
}

/** Collapses consecutive days that share the same hours: "Seg a Sex — 08:00 às 18:00". */
export function summarizeBusinessHours(hours: BusinessHours): { days: string; time: string }[] {
  const groups: { start: WeekdayKey; end: WeekdayKey; time: string }[] = [];

  for (const key of WEEKDAY_ORDER) {
    const time = formatDayHours(hours[key]);
    const last = groups.at(-1);
    if (last && last.time === time) {
      last.end = key;
    } else {
      groups.push({ start: key, end: key, time });
    }
  }

  return groups.map((group) => ({
    days:
      group.start === group.end
        ? WEEKDAY_LABEL[group.start]
        : `${WEEKDAY_LABEL[group.start]} a ${WEEKDAY_LABEL[group.end]}`,
    time: group.time,
  }));
}

export function areAllDaysClosed(hours: BusinessHours): boolean {
  return WEEKDAY_ORDER.every((key) => hours[key].closed);
}

export function formatCurrencyBRL(value: number): string {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
}

export function formatNumberBR(value: number): string {
  return new Intl.NumberFormat("pt-BR").format(value);
}

/** Strips everything except digits — used before building tel: and wa.me links. */
export function digitsOnly(value: string): string {
  return value.replace(/\D+/g, "");
}

export function telHref(phone: string): string {
  const digits = digitsOnly(phone);
  return digits.startsWith("55") ? `tel:+${digits}` : `tel:+55${digits}`;
}

export function formatFullAddress(address: {
  street: string;
  number: string;
  complement?: string;
  district: string;
  city: string;
  state: string;
  zipCode: string;
}): string {
  const line1 = [address.street, address.number].filter(Boolean).join(", ");
  const line2 = [address.complement, address.district].filter(Boolean).join(" — ");
  const line3 = [`${address.city} — ${address.state}`, address.zipCode].filter(Boolean).join(", ");
  return [line1, line2, line3].filter(Boolean).join(" · ");
}

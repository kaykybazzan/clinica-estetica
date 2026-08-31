"use client";

import { Button, type ButtonAnchorProps } from "./Button";
import { isWhatsAppConfigured, whatsappHref, type WhatsAppContext } from "@/integrations/whatsapp";
import { CONVERSION_EVENTS, trackEvent } from "@/analytics/track";

export interface WhatsAppButtonProps extends Omit<ButtonAnchorProps, "href" | "children"> {
  context?: WhatsAppContext;
  children?: React.ReactNode;
  /** Where the click happened — lands in the analytics payload. */
  source?: string;
}

/**
 * Any WhatsApp call to action. It builds the contextual message and reports the
 * click, so the client can see which service actually generates conversations.
 */
export function WhatsAppButton({
  context = { kind: "general" },
  children = "Falar no WhatsApp",
  source = "generic",
  icon = "whatsapp",
  iconPosition = "start",
  ...rest
}: WhatsAppButtonProps) {
  if (!isWhatsAppConfigured()) return null;

  /**
   * Assembled as an explicit object instead of a JSX spread: `ButtonProps` is a
   * discriminated union and TypeScript cannot narrow a spread of generic props
   * to the anchor half. Naming the type here does the narrowing once.
   */
  const buttonProps: ButtonAnchorProps = {
    ...rest,
    href: whatsappHref(context),
    icon,
    iconPosition,
    onClick: () => trackEvent(CONVERSION_EVENTS.whatsappClick, { source, context: context.kind }),
    children,
  };

  return <Button {...buttonProps} />;
}

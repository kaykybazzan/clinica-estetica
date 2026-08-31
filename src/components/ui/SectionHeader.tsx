import { Eyebrow, Heading, Lead } from "./Heading";
import { cn } from "@/utils/cn";
import { SmoothText } from "./SmoothText";

export interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
  level?: 1 | 2 | 3;
  tone?: "default" | "dark";
  id?: string;
  className?: string;
}

/** The three-part heading block every section shares. One place to retune it. */
export function SectionHeader({
  eyebrow,
  title,
  lead,
  align = "left",
  level = 2,
  tone = "default",
  id,
  className,
}: SectionHeaderProps) {
  const dark = tone === "dark";

  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow && (
        <SmoothText delay={0.1}>
          <Eyebrow className={dark ? "text-accent" : undefined}>{eyebrow}</Eyebrow>
        </SmoothText>
      )}
      <SmoothText delay={0.2}>
        <Heading id={id} level={level} className={cn("max-w-2xl", dark && "text-on-dark")}>
          {title}
        </Heading>
      </SmoothText>
      {lead && (
        <SmoothText delay={0.3}>
          <Lead className={cn("max-w-2xl", dark && "text-on-dark-muted")}>{lead}</Lead>
        </SmoothText>
      )}
    </div>
  );
}

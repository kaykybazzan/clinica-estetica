import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { announcementContent } from "@/data/announcement";

export function AnnouncementBar() {
  return (
    <aside className="bg-secondary text-on-dark" aria-label="Aviso">
      <Container className="flex min-h-10 items-center justify-center gap-3 py-2 text-center text-sm">
        <span className="text-on-dark-muted">{announcementContent.text}</span>
        {announcementContent.ctaLabel && announcementContent.ctaHref && (
          <Link href={announcementContent.ctaHref} className="shrink-0 font-semibold text-on-dark underline decoration-white/35 underline-offset-4 hover:decoration-white">
            {announcementContent.ctaLabel}
          </Link>
        )}
      </Container>
    </aside>
  );
}

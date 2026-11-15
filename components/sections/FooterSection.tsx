import type { SITE_SETTINGS_QUERY_RESULT } from "@/sanity.types";

export default function FooterSection({
  footer,
}: {
  footer?: NonNullable<SITE_SETTINGS_QUERY_RESULT>["footer"];
}) {
  // If no footer configured, still render nothing (this keeps behavior stable)
  if (!footer) return null;

  const links = footer.links || [];
  const defaultLinks = [
    { title: "Home", url: "#home" },
  ];

  // Combine configured links with default ones (avoid duplicates by url)
  const combinedLinks = [...links];
  for (const dl of defaultLinks) {
    if (!combinedLinks.some((l) => l.url === dl.url)) {
      combinedLinks.push({ _key: dl.url, title: dl.title, url: dl.url });
    }
  }

  return (
    <footer id="contact-footer" className="mt-12 pt-10 border-t border-border">
      <div className="container mx-auto max-w-6xl px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-muted-foreground">
          {footer.text && <p className="mb-2">{footer.text}</p>}
          {footer.copyrightText && (
            <p className="text-xs opacity-80">{footer.copyrightText}</p>
          )}
        </div>

        {combinedLinks.length > 0 && (
          <nav className="flex flex-wrap gap-3">
            {combinedLinks.map((l) => (
              <a
                key={l._key}
                href={l.url ?? undefined}
                target={l.url?.startsWith("http") ? "_blank" : undefined}
                rel={l.url?.startsWith("http") ? "noopener noreferrer" : undefined}
                className="text-sm hover:underline text-primary"
              >
                {l.title || l.url}
              </a>
            ))}
          </nav>
        )}
      </div>
    </footer>
  );
}

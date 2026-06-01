import Link from 'next/link';
import { siteConfig } from '@/lib/site';
import { NewsletterForm } from '@/components/interactive/NewsletterForm';
import { BrandLogo } from '@/components/BrandLogo';

const SOCIALS = [
  { label: 'Instagram', href: 'https://instagram.com/bigelowdesigns', icon: InstagramIcon },
  { label: 'Pinterest', href: 'https://pinterest.com/bigelowdesigns', icon: PinterestIcon },
  { label: 'X (Twitter)', href: 'https://x.com/bigelowdesigns', icon: TwitterIcon },
  { label: 'YouTube', href: 'https://youtube.com/@bigelowdesigns', icon: YoutubeIcon },
];

export function Footer() {
  return (
    <footer className="mt-24 bg-ink-900 text-canvas">
      {/* Newsletter band */}
      <section
        aria-labelledby="footer-newsletter"
        className="border-b border-white/10"
      >
        <div className="mx-auto max-w-page px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-eyebrow text-accent">The Bigelow Edit</p>
            <h2
              id="footer-newsletter"
              className="mt-3 font-serif text-h2 text-canvas text-balance"
            >
              The Bigelow Edit.
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-body-lg text-canvas/70 text-pretty">
              Weekly interior trends, honest furniture reviews, and considered
              styling tips — delivered directly to your inbox.
            </p>

            <div className="mt-10">
              <NewsletterForm variant="dark" source="footer" heading="" description="" />
            </div>
          </div>
        </div>
      </section>

      {/* Link columns */}
      <div className="mx-auto max-w-page px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-4">
            <Link
              href="/"
              aria-label={`${siteConfig.name} — Home`}
              className="inline-block text-canvas transition-colors duration-quick hover:text-accent"
            >
              <BrandLogo variant="lg" theme="dark" />
            </Link>
            <p className="mt-4 max-w-xs text-body-sm text-canvas/60">
              {siteConfig.description}
            </p>

            {/* Social row */}
            <ul className="mt-6 flex gap-3">
              {SOCIALS.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="me noopener noreferrer"
                    aria-label={label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-canvas/70 transition-colors duration-quick ease-out hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink-900"
                  >
                    <Icon />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Room Guides */}
          <FooterColumn
            label="Room Guides"
            links={siteConfig.nav[0].children}
          />

          {/* Explore */}
          <FooterColumn
            label="Explore"
            links={[
              { label: 'Furniture Reviews', href: '/reviews'       },
              { label: 'Design Trends',     href: '/design-trends' },
              { label: 'Newsletter',        href: '/newsletter'    },
            ]}
          />

          {/* Site */}
          <FooterColumn
            label="Site"
            links={[
              { label: 'About',          href: '/about'   },
              { label: 'Contact',        href: '/contact' },
              { label: 'Privacy Policy', href: '/privacy' },
              { label: 'Terms of Service', href: '/terms' },
            ]}
          />
        </div>
      </div>

      {/* Bottom strip */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-page flex-col gap-4 px-4 py-8 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p className="text-body-sm text-canvas/50" suppressHydrationWarning>
            © {new Date().getFullYear()} {siteConfig.name}. Made slowly in
            Brooklyn &amp; London.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-body-sm">
            <li>
              <Link
                href="/privacy"
                className="text-canvas/70 transition-colors duration-quick hover:text-accent"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="/terms"
                className="text-canvas/70 transition-colors duration-quick hover:text-accent"
              >
                Terms of Service
              </Link>
            </li>
            <li>
              <Link
                href="/affiliate-disclosure"
                className="text-canvas/70 transition-colors duration-quick hover:text-accent"
              >
                Affiliate Disclosure
              </Link>
            </li>
          </ul>
        </div>

        {/* Affiliate disclosure — short, elegant */}
        <div className="mx-auto max-w-page px-4 pb-10 sm:px-6 lg:px-8">
          <p className="max-w-3xl text-body-sm leading-relaxed text-canvas/45">
            <span className="font-semibold text-canvas/70">
              A note on the links.
            </span>{' '}
            When you buy something through Bigelow, the retailer sometimes sends
            us a small commission. It never changes what we recommend, and it
            never costs you a cent. As an Amazon Associate we earn from
            qualifying purchases.
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── Sub-components ───────────────────────────────────────────
function FooterColumn({
  label,
  links,
}: {
  label: string;
  links: readonly { label: string; href: string }[];
}) {
  return (
    <nav aria-label={label} className="md:col-span-2 lg:col-span-2">
      <h3 className="text-eyebrow text-canvas/80">{label}</h3>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-body-sm text-canvas/60 transition-colors duration-quick ease-out hover:text-accent"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// ─── Icons (inline SVG — zero JS, perfect a11y) ───────────────
function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}
function PinterestIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 7v10M8 14l4-3 4 3" />
    </svg>
  );
}
function TwitterIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
function YoutubeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
    </svg>
  );
}

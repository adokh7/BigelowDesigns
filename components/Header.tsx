import Link from 'next/link';
import { siteConfig } from '@/lib/site';

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-ink-100 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex h-14 md:h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="font-serif text-xl font-semibold tracking-tight text-ink-900"
          aria-label={`${siteConfig.name} — Home`}
        >
          {siteConfig.shortName}
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-7 text-sm font-medium text-ink-800">
            {siteConfig.nav.map((item) => (
              <li key={item.href} className="group relative">
                <Link
                  href={item.href}
                  className="transition-colors hover:text-accent-dark"
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="absolute left-1/2 top-full hidden -translate-x-1/2 pt-3 group-hover:block">
                    <ul className="min-w-[180px] rounded-lg border border-ink-100 bg-white p-2 shadow-lg">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className="block rounded-md px-3 py-2 text-sm text-ink-800 transition-colors hover:bg-ink-50 hover:text-accent-dark"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/search"
            aria-label="Search"
            className="rounded-md p-2 text-ink-800 transition-colors hover:bg-ink-50"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </Link>
        </div>
      </div>
    </header>
  );
}

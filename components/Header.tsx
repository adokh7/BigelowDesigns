'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { siteConfig } from '@/lib/site';
import { BrandLogo } from '@/components/BrandLogo';

// ─── Navigation data ──────────────────────────────────────────
const ROOMS = [
  { label: 'Living Room', href: '/rooms/living-room', tagline: 'Sofas, rugs & lighting'       },
  { label: 'Kitchen',     href: '/rooms/kitchen',      tagline: 'Islands, cabinets & hardware' },
  { label: 'Bedroom',     href: '/rooms/bedroom',      tagline: 'Beds, bedding & lamps'        },
  { label: 'Bathroom',    href: '/rooms/bathroom',     tagline: 'Vanities, tiles & fixtures'   },
  { label: 'Home Office', href: '/rooms/home-office',  tagline: 'Desks, chairs & storage'      },
  { label: 'Outdoor Guides', href: '/rooms/outdoor-guides', tagline: 'Furniture, planters & lights' },
] as const;

const SIMPLE_NAV = [
  { label: 'All Room Guides',   href: '/rooms'          },
  { label: 'Furniture Reviews', href: '/reviews'        },
  { label: 'Design Trends',     href: '/design-trends'  },
  { label: 'Global Designs',    href: '/global-designs' },
] as const;

/**
 * The Design Studio — our interactive styling tools. Rendered apart from
 * SIMPLE_NAV so it can carry its own accented treatment and read as a
 * destination rather than another editorial section.
 */
const STUDIO_LINK = { label: 'The Studio', href: '/tools' } as const;

type MenuId = 'rooms';

// ─── Sub-components ───────────────────────────────────────────
function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 11 11"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={clsx('transition-transform duration-quick', open && 'rotate-180')}
    >
      <path d="M1.5 3.5l4 4 4-4" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}

// ─── Header ───────────────────────────────────────────────────
export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled]     = useState(false);
  const [activeMenu, setActiveMenu] = useState<MenuId | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Elevated state on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close all menus on route change
  useEffect(() => {
    setMobileOpen(false);
    setActiveMenu(null);
  }, [pathname]);

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setActiveMenu(null); setMobileOpen(false); }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  // 100 ms grace period so the cursor can travel from trigger → panel
  const openMenu = (id: MenuId) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveMenu(id);
  };
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setActiveMenu(null), 100);
  };
  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  return (
    <>
      {/* ── Sticky bar ───────────────────────────────────────── */}
      <header
        className={clsx(
          'sticky top-0 z-header w-full border-b transition-all duration-smooth',
          scrolled
            ? 'border-ink-100 bg-surface/95 shadow-sm backdrop-blur-md supports-[backdrop-filter]:bg-surface/85'
            : 'border-ink-100/50 bg-surface/90 backdrop-blur supports-[backdrop-filter]:bg-surface/75',
        )}
      >
        {/*
          Height is content-driven (not fixed) so the logo can breathe.
          py shrinks when scrolled — combined with the logo variant swap
          below, this produces a tall editorial masthead at the top of the
          page that compacts automatically into a lean sticky bar on scroll.

          Not scrolled : py-3 md:py-4  +  160 px logo  ≈ 130 px bar
          Scrolled     : py-2 md:py-2.5 +  110 px logo  ≈  89 px bar
        */}
        <div
          className={clsx(
            'mx-auto flex max-w-page items-center justify-between px-4 sm:px-6 lg:px-8',
            'transition-all duration-smooth',
            // Centered-masthead layout at lg+: nav left / logo center /
            // actions right, via explicit grid placement below — DOM
            // order (logo, nav, actions) stays unchanged for a11y/tab
            // order, only the visual position shifts. Below lg there
            // isn't room for a true 3-column masthead, so it falls back
            // to the existing logo-left flex row.
            'lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-4',
            scrolled ? 'py-2 md:py-2.5' : 'py-3 md:py-4',
          )}
        >

          {/* Logo */}
          <Link
            href="/"
            aria-label={`${siteConfig.name} — Home`}
            className="flex-shrink-0 text-ink-900 transition-colors duration-quick hover:text-accent-600 lg:col-start-2 lg:justify-self-center"
          >
            {/*
              variant switches on scroll so the sticky bar stays compact.
              The CSS `transition: width 0.25s ease` in BrandLogo smooths
              the resize — no layout jank, no React animation library needed.
            */}
            <BrandLogo variant={scrolled ? 'sm' : 'default'} priority />
          </Link>

          {/* ── Desktop nav ─────────────────────────────────── */}
          <nav
            aria-label="Primary"
            className="hidden items-center gap-0.5 md:flex lg:col-start-1 lg:justify-self-start"
          >

            {/* Rooms */}
            <div
              className="relative"
              onMouseEnter={() => openMenu('rooms')}
              onMouseLeave={scheduleClose}
            >
              <button
                type="button"
                aria-haspopup="true"
                aria-expanded={activeMenu === 'rooms'}
                onClick={() => setActiveMenu(activeMenu === 'rooms' ? null : 'rooms')}
                className={clsx(
                  'flex items-center gap-1.5 rounded-md px-3 py-2 text-[13px] font-medium tracking-wide',
                  'transition-colors duration-quick',
                  pathname.startsWith('/rooms')
                    ? 'text-accent-600'
                    : 'text-ink-700 hover:text-accent-600',
                )}
              >
                Room Guides
                <Chevron open={activeMenu === 'rooms'} />
              </button>

              {/* Rooms panel */}
              <div
                onMouseEnter={cancelClose}
                onMouseLeave={scheduleClose}
                className={clsx(
                  'absolute left-1/2 top-full -translate-x-1/2 pt-3',
                  'origin-top transition-all duration-quick ease-out',
                  activeMenu === 'rooms'
                    ? 'pointer-events-auto translate-y-0 scale-100 opacity-100'
                    : 'pointer-events-none -translate-y-1.5 scale-[0.97] opacity-0',
                )}
              >
                <div className="w-[400px] overflow-hidden rounded-2xl border border-ink-100 bg-surface shadow-xl">
                  <div className="border-b border-ink-100 px-6 py-3.5">
                    <p className="text-eyebrow uppercase tracking-[0.16em] text-ink-400">
                      Browse by room
                    </p>
                  </div>

                  {/* 2 × 3 grid — hairline dividers via 1 px gap on ink-100 bg */}
                  <div className="grid grid-cols-2 gap-px bg-ink-100">
                    {ROOMS.map((room) => {
                      const active = pathname === room.href;
                      return (
                        <Link
                          key={room.href}
                          href={room.href}
                          className={clsx(
                            'group flex flex-col gap-0.5 bg-surface px-5 py-4',
                            'transition-colors duration-quick hover:bg-accent-50',
                            active && 'bg-accent-50',
                          )}
                        >
                          <span
                            className={clsx(
                              'text-sm font-semibold transition-colors duration-quick',
                              active
                                ? 'text-accent-600'
                                : 'text-ink-900 group-hover:text-accent-600',
                            )}
                          >
                            {room.label}
                          </span>
                          <span className="text-[12px] leading-4 text-ink-400">
                            {room.tagline}
                          </span>
                        </Link>
                      );
                    })}
                  </div>

                  <div className="border-t border-ink-100 px-6 py-3">
                    <Link
                      href="/rooms"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-600 transition-colors duration-quick hover:text-accent-500"
                    >
                      View all rooms
                      <ArrowIcon />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Flat links */}
            {SIMPLE_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  'rounded-md px-3 py-2 text-[13px] font-medium tracking-wide',
                  'transition-colors duration-quick',
                  pathname.startsWith(item.href)
                    ? 'text-accent-600'
                    : 'text-ink-700 hover:text-accent-600',
                )}
              >
                {item.label}
              </Link>
            ))}

            {/* The Design Studio — accented so it reads as a destination */}
            <Link
              href={STUDIO_LINK.href}
              className={clsx(
                'ml-2 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5',
                'text-sm font-medium transition-all duration-quick',
                pathname.startsWith(STUDIO_LINK.href)
                  ? 'border-brand/40 bg-brand/[0.08] text-brand'
                  : 'border-ink-200 text-ink-800 hover:border-brand/40 hover:bg-brand/[0.06] hover:text-brand',
              )}
            >
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-brand" />
              {STUDIO_LINK.label}
            </Link>
          </nav>

          {/* ── Right actions ────────────────────────────────── */}
          <div className="flex items-center gap-1 lg:col-start-3 lg:justify-self-end">
            {/* Search */}
            <Link
              href="/search"
              aria-label="Search"
              className="rounded-md p-2 text-ink-600 transition-colors duration-quick hover:bg-ink-50 hover:text-ink-900"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </Link>

            {/* Subscribe pill — desktop only */}
            <Link
              href="/newsletter"
              className={clsx(
                'hidden md:inline-flex items-center',
                'h-8 rounded-full border border-ink-200 px-4',
                'text-xs font-semibold text-ink-800',
                'transition-all duration-quick',
                'hover:border-accent hover:bg-accent-50 hover:text-accent-600',
              )}
            >
              Subscribe
            </Link>

            {/* Hamburger — mobile only */}
            <button
              type="button"
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMobileOpen((v) => !v)}
              className="ml-1 flex h-9 w-9 items-center justify-center rounded-md text-ink-700 transition-colors duration-quick hover:bg-ink-50 hover:text-ink-900 md:hidden"
            >
              {mobileOpen ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 6h16M4 12h10M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile backdrop ──────────────────────────────────── */}
      <div
        aria-hidden="true"
        onClick={() => setMobileOpen(false)}
        className={clsx(
          'fixed inset-0 z-[35] bg-ink-900/30 backdrop-blur-[2px] md:hidden',
          'transition-opacity duration-smooth',
          mobileOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0',
        )}
      />

      {/* ── Mobile menu drawer ───────────────────────────────── */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
        aria-hidden={!mobileOpen}
        className={clsx(
          'fixed inset-x-0 top-14 z-[36] overflow-y-auto rounded-b-3xl border-b border-ink-100 bg-surface shadow-xl md:hidden',
          'max-h-[calc(100dvh-3.5rem)]',
          'transition-all duration-smooth ease-out',
          mobileOpen
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-2 opacity-0',
        )}
      >
        <div className="px-4 py-7 sm:px-6">

          {/* Room Guides */}
          <p className="mb-3 text-eyebrow uppercase tracking-[0.16em] text-ink-400">
            Room Guides
          </p>
          <ul className="mb-7 space-y-0.5">
            {ROOMS.map((room) => {
              const active = pathname === room.href;
              return (
                <li key={room.href}>
                  <Link
                    href={room.href}
                    className={clsx(
                      'flex items-baseline justify-between rounded-xl px-4 py-3',
                      'transition-colors duration-quick',
                      'hover:bg-accent-50 hover:text-accent-600',
                      active ? 'bg-accent-50 text-accent-600' : 'text-ink-900',
                    )}
                  >
                    <span className="text-[15px] font-semibold">{room.label}</span>
                    <span className="ml-4 flex-shrink-0 text-[11px] text-ink-400">
                      {room.tagline}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mb-7 h-px bg-ink-100" />

          {/* Furniture Reviews · Design Trends */}
          <ul className="mb-7 space-y-0.5">
            {SIMPLE_NAV.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={clsx(
                      'block rounded-xl px-4 py-3 text-[15px] font-semibold',
                      'transition-colors duration-quick',
                      'hover:bg-accent-50 hover:text-accent-600',
                      active ? 'text-accent-600' : 'text-ink-900',
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}

            {/* The Design Studio */}
            <li>
              <Link
                href={STUDIO_LINK.href}
                className={clsx(
                  'flex items-center gap-2.5 rounded-xl px-4 py-3 text-[15px] font-semibold',
                  'transition-colors duration-quick',
                  pathname.startsWith(STUDIO_LINK.href)
                    ? 'bg-brand/[0.08] text-brand'
                    : 'text-brand hover:bg-brand/[0.06]',
                )}
              >
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-brand" />
                {STUDIO_LINK.label}
              </Link>
            </li>
          </ul>

          {/* Subscribe CTA */}
          <Link
            href="/newsletter"
            className="flex w-full items-center justify-center rounded-full bg-accent py-3 text-sm font-semibold text-white transition-colors duration-quick hover:bg-accent-600"
          >
            Subscribe to the newsletter
          </Link>

        </div>
      </div>
    </>
  );
}

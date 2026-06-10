import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/lib/site';
import { Reveal } from '@/components/ui/Reveal';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Room Guides',
  description:
    'Deep-dive design guides for every room in your home. Ideas, layouts, furniture picks, and expert tips — curated by editors, tested by homeowners.',
  alternates: { canonical: `${siteConfig.url}/rooms` },
  robots: { index: true, follow: true },
};

// ─── Room directory ───────────────────────────────────────────
// Strict shape: `image` is ALWAYS a public file path; the descriptive
// string lives ONLY in `imageAlt`. Never swap these.
const ROOMS = [
  {
    slug: 'living-room',
    label: 'Living Room',
    tagline: 'Sofas, layouts, rugs & the art of the considered gathering space',
    image: '/cat-living-room-pro.webp',
    imageAlt: 'Editorial architectural photography of a luxury organic modern living room',
  },
  {
    slug: 'kitchen',
    label: 'Kitchen',
    tagline: 'Islands, cabinetry, hardware & the details that define a kitchen',
    image: '/cat-kitchen-pro.webp',
    imageAlt: 'Luxury modern kitchen with marble waterfall island',
  },
  {
    slug: 'bedroom',
    label: 'Bedroom',
    tagline: 'Beds, bedding, lighting & the systems that make mornings easier',
    image: '/cat-bedroom-pro.webp?v=2',
    imageAlt: 'A serene bedroom with layered linens and considered ambient lighting',
  },
  {
    slug: 'bathroom',
    label: 'Bathroom',
    tagline: 'Vanities, tiles, fixtures & the small details that matter most',
    image: '/cat-bathroom-pro.webp?v=2',
    imageAlt: 'A minimal bathroom with clean lines and quality fixtures',
  },
  {
    slug: 'home-office',
    label: 'Home Office',
    tagline: 'Desks, chairs, storage & the setup that makes deep work possible',
    image: '/cat-home-office-pro.webp',
    imageAlt: 'High-end curated home office with wooden desk',
  },
  {
    slug: 'outdoor-guides',
    label: 'Outdoor Guides',
    tagline: 'Furniture, planters, lighting & making outside work as hard as inside',
    image: '/cat-outdoor-pro.webp',
    imageAlt: 'Mediterranean outdoor terrace at golden hour',
  },
] as const;

// ─── Page ─────────────────────────────────────────────────────
export default function RoomsPage() {
  return (
    <div className="bg-canvas">
      {/* ── Page header ─────────────────────────────────────── */}
      <div className="border-b border-ink-100 bg-surface">
        <div className="mx-auto max-w-page px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <p className="text-eyebrow uppercase tracking-[0.18em] text-accent-600">
            Explore by room
          </p>
          <h1 className="mt-3 max-w-xl text-balance font-serif text-h1 text-ink-900">
            Room Guides
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-body-lg text-ink-500">
            Every room in your home, covered in depth. Editorial guides written
            with designers and tested by homeowners — no filler, no sponsored
            content.
          </p>
        </div>
      </div>

      {/* ── Room grid ──────────────────────────────────────────── */}
      <Reveal>
        <section
          aria-label="Choose a room"
          className="mx-auto max-w-page px-4 py-16 sm:px-6 lg:px-8 lg:py-20"
        >
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {ROOMS.map((room) => (
              /* Outer div holds lift + shadow; inner Link holds overflow-hidden clip */
              <div
                key={room.slug}
                className="rounded-xl transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-xl"
              >
                <Link
                  href={`/rooms/${room.slug}`}
                  className="group relative block overflow-hidden rounded-xl h-48 sm:h-64 bg-elevated"
                  aria-label={`Browse ${room.label} guides`}
                >
                  <Image
                    src={room.image}
                    alt={room.imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-elegant ease-out group-hover:scale-[1.04]"
                  />
                  {/* Gradient overlay */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
                  />
                  {/* Text overlay */}
                  <div className="absolute bottom-0 left-0 w-full p-4 sm:p-6 text-left">
                    <p className="text-white font-bold text-lg sm:text-xl leading-tight">
                      {room.label}
                    </p>
                    <p className="text-gray-200 text-sm line-clamp-1 sm:line-clamp-2 mt-1 leading-snug">
                      {room.tagline}
                    </p>
                    <p className="mt-3 flex items-center gap-1.5 text-[12px] font-semibold text-white/55 transition-colors duration-quick group-hover:text-accent">
                      Explore guides
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
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>
      </Reveal>
    </div>
  );
}

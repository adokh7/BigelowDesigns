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
const ROOMS = [
  {
    slug: 'living-room',
    label: 'Living Room',
    tagline: 'Sofas, layouts, rugs & the art of the considered gathering space',
    image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&q=85',
    imageAlt: 'A beautifully composed living room with warm tones and careful furniture arrangement',
  },
  {
    slug: 'kitchen',
    label: 'Kitchen',
    tagline: 'Islands, cabinetry, hardware & the details that define a kitchen',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=85',
    imageAlt: 'A well-designed kitchen with a large island and warm overhead lighting',
  },
  {
    slug: 'bedroom',
    label: 'Bedroom',
    tagline: 'Beds, bedding, lighting & the systems that make mornings easier',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=85',
    imageAlt: 'A serene bedroom with layered linens and considered ambient lighting',
  },
  {
    slug: 'bathroom',
    label: 'Bathroom',
    tagline: 'Vanities, tiles, fixtures & the small details that matter most',
    image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=85',
    imageAlt: 'A minimal bathroom with clean lines and quality chrome fixtures',
  },
  {
    slug: 'home-office',
    label: 'Home Office',
    tagline: 'Desks, chairs, storage & the setup that makes deep work possible',
    image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&q=85',
    imageAlt: 'A focused home office setup with a clean desk and natural light',
  },
  {
    slug: 'outdoor-guides',
    label: 'Outdoor Guides',
    tagline: 'Furniture, planters, lighting & making outside work as hard as inside',
    image: '/outdoor-balcony-oasis.webp',
    imageAlt: 'A beautifully designed outdoor balcony oasis with warm ambient lighting and soft seating',
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
                className="rounded-2xl transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-xl"
              >
                <Link
                  href={`/rooms/${room.slug}`}
                  className="group relative block overflow-hidden rounded-2xl"
                  aria-label={`Browse ${room.label} guides`}
                >
                  <div className="relative aspect-[4/3] bg-elevated">
                    <Image
                      src={room.image}
                      alt={room.imageAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-elegant ease-out group-hover:scale-[1.04]"
                    />
                    {/* Gradient overlay */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-ink-900/85 via-ink-900/25 to-transparent"
                    />
                    {/* Text overlay */}
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <p className="font-serif text-[22px] font-semibold leading-tight text-white">
                        {room.label}
                      </p>
                      <p className="mt-1.5 line-clamp-2 text-[13px] leading-snug text-white/65">
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

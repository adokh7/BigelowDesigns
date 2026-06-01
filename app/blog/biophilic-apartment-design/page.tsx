import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';

import { AdSlot } from '@/components/ui/AdSlot';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SidebarNewsletter } from '@/components/sections/SidebarNewsletter';
import { siteConfig } from '@/lib/site';

// ─── Static page ─────────────────────────────────────────────
export const dynamic = 'force-static';

// ─── Metadata ────────────────────────────────────────────────
export const metadata: Metadata = {
  title: 'Best Biophilic Living Room Ideas for Small Spaces',
  description:
    'Discover the best biophilic living room ideas for small spaces and how to bring natural elements into apartment decor with sustainable tips.',
  alternates: { canonical: `${siteConfig.url}/blog/biophilic-apartment-design` },
  openGraph: {
    type: 'article',
    url: `${siteConfig.url}/blog/biophilic-apartment-design`,
    title: 'Best Biophilic Living Room Ideas for Small Spaces',
    description:
      'How to bring natural light, plants, and organic textures into even a 30-square-metre apartment — a complete biophilic design guide for 2026.',
    images: [
      {
        url: `${siteConfig.url}/biophilic-design.webp`,
        width: 1200,
        height: 675,
        alt: 'A sunlit small apartment living room with trailing plants, jute rug, and raw oak shelving',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Biophilic Living Room Ideas for Small Spaces',
    description:
      'Natural light, low-maintenance plants, raw wood, and earthy palettes — the complete guide to biophilic apartment design in 2026.',
    images: [`${siteConfig.url}/biophilic-design.webp`],
  },
};

// ─── Article data ─────────────────────────────────────────────
const ARTICLE = {
  title:
    'The Ultimate Guide to Biophilic Interior Design: Bringing Nature Into Small Apartments',
  excerpt:
    'In 2026, biophilic interior design has become an evidence-based approach to creating homes that actively support mental health and calm focus — even in a 30-square-metre apartment. Here is how to bring natural light, plants, and organic textures into small spaces.',
  categoryLabel: 'Design Trends',
  categoryHref:  '/design-trends',
  author: {
    name:        'Bigelow Editorial Team',
    slug:        'team-bigelow',
    avatar:      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&q=80',
    bio:         'The Bigelow editorial team is made up of passionate interior designers and architects dedicated to bringing you honest, practical, and beautiful home advice.',
    credentials: ['Bigelow Designs Editorial Team'],
  },
  publishedAt:  '2026-06-01T10:00:00Z',
  updatedAt:    '2026-06-01T10:00:00Z',
  readingTime:  10,
  heroImage:    '/biophilic-design.webp',
  heroImageAlt:
    'A sunlit small apartment living room with trailing pothos, a jute rug, raw oak shelving, and linen curtains creating a calm biophilic sanctuary',
  heroCaption:
    'A real apartment, transformed. Natural materials, strategic plants, and cleared sightlines to the window — the three moves that define biophilic living.',
  headings: [
    { id: 'natural-light-and-airflow',      text: 'Natural Light and Airflow in Small Layouts',     level: 2 },
    { id: 'sustainable-materials',          text: 'Raw, Sustainable Materials',                     level: 2 },
    { id: 'low-maintenance-plants',         text: 'Low-Maintenance Plants',                         level: 2 },
    { id: 'earthy-color-palettes',          text: 'Earthy Color Palettes that Mimic Nature',        level: 2 },
    { id: 'how-to-bring-natural-elements',  text: 'How to Bring Natural Elements Into Your Decor',  level: 2 },
    { id: 'conclusion',                     text: 'Conclusion',                                     level: 2 },
  ],
} as const;

// ─── Helper ───────────────────────────────────────────────────
function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
}

// ─── Page ─────────────────────────────────────────────────────
export default function BiophilicApartmentDesignPage() {
  const canonicalUrl    = `${siteConfig.url}/blog/biophilic-apartment-design`;
  const breadcrumbItems = [
    { name: 'Home',                url: '/'                   },
    { name: ARTICLE.categoryLabel, url: ARTICLE.categoryHref  },
    { name: ARTICLE.title,         url: canonicalUrl          },
  ];

  return (
    <>
      {/* ══════════════════════════════════════════════════════
          1. ARTICLE HEADER — narrow centred column
          ══════════════════════════════════════════════════════ */}
      <div className="bg-surface">
        <div className="mx-auto max-w-page px-4 pt-6 sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbItems} />
        </div>

        <header className="mx-auto max-w-[760px] px-4 pb-12 pt-10 text-center sm:px-6 lg:px-0 lg:pb-16 lg:pt-14">

          {/* Category tag */}
          <Link
            href={ARTICLE.categoryHref}
            className="inline-flex items-center gap-2 text-eyebrow uppercase tracking-[0.2em] text-accent-600 transition-colors duration-quick hover:text-accent-500"
          >
            <span aria-hidden="true" className="h-px w-5 bg-accent-600/40" />
            {ARTICLE.categoryLabel}
            <span aria-hidden="true" className="h-px w-5 bg-accent-600/40" />
          </Link>

          {/* Title */}
          <h1 className="mt-5 text-balance font-serif text-[clamp(28px,5vw,52px)] font-semibold leading-[1.08] tracking-[-0.03em] text-ink-900">
            {ARTICLE.title}
          </h1>

          {/* Deck */}
          <p className="mx-auto mt-5 max-w-[600px] text-pretty text-body-lg leading-relaxed text-ink-600">
            {ARTICLE.excerpt}
          </p>

          {/* Hairline */}
          <div aria-hidden="true" className="mx-auto mt-8 h-px w-16 bg-ink-200" />

          {/* Byline */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-body-sm text-ink-500">
            <Image
              src={ARTICLE.author.avatar}
              alt=""
              width={32}
              height={32}
              className="rounded-full ring-2 ring-ink-100"
            />
            <Link
              href={`/authors/${ARTICLE.author.slug}`}
              className="font-semibold text-ink-900 transition-colors duration-quick hover:text-accent-600"
            >
              {ARTICLE.author.name}
            </Link>
            <span aria-hidden="true" className="text-ink-300">&middot;</span>
            <time dateTime={ARTICLE.publishedAt}>{formatDate(ARTICLE.publishedAt)}</time>
            <span aria-hidden="true" className="text-ink-300">&middot;</span>
            <span>{ARTICLE.readingTime} min read</span>
          </div>

        </header>
      </div>

      {/* ══════════════════════════════════════════════════════
          2. HERO IMAGE — full bleed, cinematic on xl
          ══════════════════════════════════════════════════════ */}
      <div className="mx-auto max-w-page px-4 sm:px-6 lg:px-8">
        <div className="relative aspect-[16/9] overflow-hidden rounded-none bg-elevated sm:rounded-xl xl:aspect-[21/9] xl:rounded-2xl">
          <Image
            src={ARTICLE.heroImage}
            alt={ARTICLE.heroImageAlt}
            fill
            priority
            fetchPriority="high"
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover"
          />
        </div>
        <p className="mt-3 text-center text-[12px] italic leading-5 text-ink-400">
          {ARTICLE.heroCaption}
        </p>
      </div>

      {/* ══════════════════════════════════════════════════════
          3. READING LAYOUT — prose left, sticky sidebar right
          ══════════════════════════════════════════════════════ */}
      <div className="mx-auto max-w-[1120px] px-4 pb-4 pt-12 sm:px-6 lg:px-8 lg:pt-16">
        <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-16 xl:gap-20">

          {/* ── Main prose column ── */}
          <main>
            <ArticleBody />

            {/* Author card */}
            <div className="mt-12 flex gap-4 rounded-2xl border border-ink-100 bg-elevated/40 p-6 lg:mt-16">
              <Image
                src={ARTICLE.author.avatar}
                alt=""
                width={56}
                height={56}
                className="h-14 w-14 flex-shrink-0 rounded-full ring-2 ring-ink-100"
              />
              <div>
                <p className="text-eyebrow uppercase tracking-[0.14em] text-ink-400">
                  Written by
                </p>
                <Link
                  href={`/authors/${ARTICLE.author.slug}`}
                  className="mt-0.5 block font-serif text-body-lg font-semibold text-ink-900 transition-colors duration-quick hover:text-accent-600"
                >
                  {ARTICLE.author.name}
                </Link>
                <p className="mt-0.5 text-body-sm text-ink-500">
                  {ARTICLE.author.credentials.join(' · ')}
                </p>
                <p className="mt-2 text-body-sm leading-relaxed text-ink-600">
                  {ARTICLE.author.bio}
                </p>
              </div>
            </div>
          </main>

          {/* ── Sticky sidebar ── */}
          <aside className="hidden lg:block" aria-label="Sidebar">
            <div className="sticky top-24 space-y-8">

              {/* Table of contents */}
              <nav aria-label="Table of contents">
                <p className="mb-4 text-eyebrow uppercase tracking-[0.16em] text-ink-400">
                  In this article
                </p>
                <ol className="space-y-2 border-l border-ink-100 pl-4">
                  {ARTICLE.headings.map((h) => (
                    <li key={h.id}>
                      <a
                        href={`#${h.id}`}
                        className={clsx(
                          'block text-[13px] leading-5 text-ink-600',
                          'transition-colors duration-quick hover:text-accent-600',
                        )}
                      >
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>

              <div aria-hidden="true" className="h-px bg-ink-100" />

              {/* Sidebar ad */}
              <AdSlot variant="rectangle" align="start" />

              <div aria-hidden="true" className="h-px bg-ink-100" />

              {/* Newsletter mini-CTA */}
              <SidebarNewsletter />

            </div>
          </aside>

        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          4. RELATED ARTICLES
          ══════════════════════════════════════════════════════ */}
      <section
        aria-labelledby="related-heading"
        className="mx-auto max-w-[1120px] px-4 pb-20 pt-0 sm:px-6 lg:px-8 lg:pb-28"
      >
        <div className="border-t border-ink-100 pt-12 lg:pt-16">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-eyebrow uppercase tracking-[0.18em] text-accent-600">
                Keep reading
              </p>
              <h2 id="related-heading" className="mt-1.5 font-serif text-h2 text-ink-900">
                You might also like.
              </h2>
            </div>
            <Link
              href="/design-trends"
              className="hidden flex-shrink-0 text-body-sm font-semibold text-accent-600 transition-colors duration-quick hover:text-accent-500 sm:block"
            >
              All design trends &rarr;
            </Link>
          </div>

          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:gap-8">
            {RELATED_ARTICLES.map((card) => (
              <RelatedArticleCard key={card.slug} card={card} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

// ─── Article body ──────────────────────────────────────────────
// Intro (3 paragraphs) + AdSlot + sections 1–3 + AdSlot + sections 4–6.
// Each <h2> id matches the sidebar TOC exactly.
function ArticleBody() {
  return (
    <>
      {/* ── Intro prose ── */}
      <div className="prose max-w-none text-ink-800">
        <p>
          In 2026, biophilic interior design has become more than a
          trend&mdash;it is an evidence-based approach to creating homes that
          actively support mental health, better sleep, and calm focus,
          especially in dense urban environments. By weaving in natural light,
          plants, organic textures, and earthy colors, even a 30-square-meter
          apartment can feel like a restorative micro-sanctuary instead of a
          cramped box.
        </p>
        <p>
          Designers are increasingly focused on wellness, seeing homes as
          ecosystems that should &ldquo;breathe, rest, and adapt&rdquo;
          alongside us, which aligns perfectly with biophilic principles. For
          renters and small-space dwellers, this means there are more
          affordable sustainable interior design tips 2026 can offer than ever
          before&mdash;from low-maintenance plants to durable natural materials
          that age beautifully.
        </p>
        <p>
          In this guide, you will learn the best biophilic living room ideas
          for small spaces, how to bring natural elements into apartment decor,
          and which low light indoor plants for apartment wellbeing work in
          real-world microclimates.
        </p>
      </div>

      {/* ── Mid-intro AdSense ── */}
      <div className="not-prose my-10 lg:my-12">
        <AdSlot variant="responsive" />
      </div>

      {/* ── Main body prose — sections 1–3 ── */}
      <div className="prose max-w-none text-ink-800">

        {/* ─ Section 1: Natural Light ─ */}
        <h2 id="natural-light-and-airflow">
          Maximizing Natural Light and Airflow in Small Layouts
        </h2>
        <p>
          Natural light and fresh air are the backbone of biophilic design,
          yet they are exactly what most city apartments lack. With a few
          smart layout tweaks, you can dramatically improve how daylight and
          airflow move through even a narrow studio.
        </p>

        <h3>
          Best biophilic living room ideas for small spaces: start with light
        </h3>
        <p>
          Think of your windows as your apartment&apos;s &ldquo;oxygen
          portals.&rdquo; The clearer their path, the more expansive and
          relaxing your space will feel.
        </p>
        <p>Try these ideas:</p>
        <ul>
          <li>
            <strong>Keep window zones visually light.</strong> Use sheer
            curtains instead of heavy drapes, and avoid placing tall, bulky
            furniture directly in front of windows so light can travel deeper
            into the room.
          </li>
          <li>
            <strong>Use reflective surfaces strategically.</strong> A mirror
            opposite or adjacent to a window can bounce light into darker
            corners, especially helpful in narrow living rooms.
          </li>
          <li>
            <strong>Choose low, streamlined furniture.</strong> Low-profile
            sofas and coffee tables help maintain &ldquo;prospect&rdquo; (clear
            views across the room), a key biophilic principle that makes spaces
            feel open and safe.
          </li>
        </ul>
        <p>
          These simple shifts make your living room feel brighter and larger
          without any structural changes&mdash;exactly what you want in
          small-space biophilic design.
        </p>

        <h3>Micro-ventilation and natural airflow</h3>
        <p>
          Good air quality is now a core part of sustainable and
          wellness-focused interior design, not a luxury add-on. Even if you
          cannot install sophisticated systems, you can still improve airflow
          and comfort.
        </p>
        <ul>
          <li>
            <strong>Create cross-breezes where possible.</strong> When two
            windows or a window and a door align, crack both slightly to
            encourage gentle air movement.
          </li>
          <li>
            <strong>Use plants and textiles to support &ldquo;breathing&rdquo; spaces.</strong>{' '}
            Natural fibers like cotton and linen breathe better than synthetics,
            helping regulate humidity and temperature while feeling more
            pleasant on the skin.
          </li>
          <li>
            <strong>Supplement with smart fans and air purifiers.</strong> Many
            2026 eco-friendly devices are designed to be energy-efficient and
            visually minimal, supporting both wellness and sustainability.
          </li>
        </ul>
        <p>
          In a biophilic apartment, air should feel as considered as
          light&mdash;soft, fresh, and easy to breathe.
        </p>

        {/* ─ Section 2: Sustainable Materials ─ */}
        <h2 id="sustainable-materials">
          Choosing Raw, Sustainable Materials (Wood, Stone, Rattan)
        </h2>
        <p>
          One of the strongest interior design trends for 2026 is the shift
          toward natural, tactile materials&mdash;solid wood, stone, linen,
          ceramics, and natural fibers are replacing glossy synthetic finishes.
          These materials are central to biophilic design because they bring
          organic texture, warmth, and authenticity into small apartments.
        </p>
        <p>
          This is where affordable sustainable interior design tips for 2026
          really shine: you do not need a full renovation to benefit from these
          materials.
        </p>

        <h3>Wood: warmth and longevity in small apartments</h3>
        <p>
          Light woods such as pine, oak, or ash are becoming the chromatic
          foundation of many 2026 interiors because they brighten rooms while
          keeping them feeling cozy.
        </p>
        <p>Consider:</p>
        <ul>
          <li>
            <strong>Compact wooden furniture.</strong> A small oak coffee
            table, a birch sideboard, or wall-mounted pine shelves all
            introduce warmth without visually crowding the space.
          </li>
          <li>
            <strong>Wood slats and panels.</strong> Even a single slatted
            headboard or wall panel behind a sofa adds subtle depth and a
            forest-like rhythm to the room.
          </li>
          <li>
            <strong>Invest in quality, not quantity.</strong> Designers in
            2026 emphasize durable, repairable pieces you buy once and keep
            for decades, which is both sustainable and budget-savvy over time.
          </li>
        </ul>

        <h3>Stone and ceramics: grounding surfaces</h3>
        <p>
          Natural stone and matte ceramics are trending because they add a
          quiet, grounded feeling to interiors. In small apartments, they are
          particularly effective in high-touch surfaces.
        </p>
        <ul>
          <li>
            Stone-topped side tables or window ledges echo outdoor rock
            textures and provide cool contrast to soft textiles.
          </li>
          <li>
            Ceramic lamps, vases, and planters bring artisan character and
            tactile richness without taking up much space.
          </li>
        </ul>
        <p>
          These materials support the biophilic goal of creating interiors that
          feel honest, long-lasting, and closely connected to natural
          landscapes.
        </p>

        <h3>Rattan and natural fibers: lightweight and airy</h3>
        <p>
          Rattan, jute, and woven grasses are ideal for bringing natural
          elements into apartment decor when your floorplan is tight.
        </p>
        <p>Try:</p>
        <ul>
          <li>
            <strong>Rattan accent chairs or headboards.</strong> Their woven
            structure filters light and air, visually lightening the room
            compared to solid upholstered pieces.
          </li>
          <li>
            <strong>Jute or sisal rugs.</strong> These add a sandy, beach-like
            texture underfoot and pair well with wood and stone.
          </li>
          <li>
            <strong>Storage baskets.</strong> Woven baskets keep clutter under
            control while reinforcing the natural material palette.
          </li>
        </ul>
        <p>
          By layering wood, stone, rattan, and natural textiles, your apartment
          starts to feel like an urban cabin or retreat rather than a purely
          manufactured space.
        </p>

        {/* ─ Section 3: Plants ─ */}
        <h2 id="low-maintenance-plants">
          The Best Low-Maintenance Plants for Apartment Microclimates
        </h2>
        <p>
          Plants are the most recognizable expression of biophilic design and
          a direct route to low light indoor plants for apartment wellbeing.
          The key in small apartments is selecting species that match your
          actual light levels and lifestyle.
        </p>
        <p>
          Experts emphasize that &ldquo;low-light&rdquo; often means
          &ldquo;tolerates low light&rdquo; rather than truly thrives there,
          so choosing the right varieties prevents disappointment and plant
          loss.
        </p>

        <h3>Reading your apartment&apos;s microclimate</h3>
        <p>Before buying plants, observe:</p>
        <ul>
          <li>
            <strong>Light direction and duration.</strong> North-facing windows
            or shaded courtyards usually mean consistent low light; south-facing
            windows often provide bright, indirect light ideal for many species.
          </li>
          <li>
            <strong>Temperature swings.</strong> Drafty windowsills or
            radiators nearby may stress sensitive plants.
          </li>
          <li>
            <strong>Your care style.</strong> If you travel often or forget
            watering, choose species known for resilience.
          </li>
        </ul>
        <p>
          If there is enough natural light to comfortably read a book during
          the day, you can usually grow at least some houseplants.
        </p>

        <h3>Hero plants for low-light corners</h3>
        <p>
          For dim corners of living rooms, entryways, or bedrooms, these
          species consistently rank among the most reliable:
        </p>
        <ul>
          <li>
            <strong>Snake Plant (Sansevieria / Dracaena).</strong> Known as
            nearly indestructible, snake plants tolerate low light and irregular
            watering, making them ideal for beginners.
          </li>
          <li>
            <strong>ZZ Plant (Zamioculcas zamiifolia).</strong> Thrives in low
            light and dry soil, with glossy leaves that add a sculptural look
            to minimalist apartments.
          </li>
          <li>
            <strong>Cast Iron Plant (Aspidistra).</strong> A Victorian-era
            favorite for dark rooms, remarkably tolerant of shade and neglect.
          </li>
          <li>
            <strong>Pothos (especially Jade Pothos).</strong> Many plant pros
            consider jade pothos a true MVP for low-light conditions; its
            trailing vines are perfect for shelves and high cabinets.
          </li>
          <li>
            <strong>Boston Fern and other ferns.</strong> Great for shady
            corners where you want lush, feathery texture, as long as humidity
            is reasonably stable.
          </li>
        </ul>
        <p>
          These low light indoor plants for apartment wellbeing help lower
          perceived stress, improve visual comfort, and create a
          &ldquo;living&rdquo; feeling even in window-challenged spaces.
        </p>

        <h3>Plant styling ideas for tiny apartments</h3>
        <p>
          To integrate plants into the best biophilic living room ideas for
          small spaces, focus on verticality and layering.
        </p>
        <ul>
          <li>
            <strong>Hanging planters and wall-mounted pots.</strong> Use them
            above sofas or in corners to draw the eye upward without stealing
            floor space.
          </li>
          <li>
            <strong>Plant shelves.</strong> A narrow wall shelf with mixed
            plant heights creates a miniature urban jungle while doubling as
            decor.
          </li>
          <li>
            <strong>Micro herb gardens in the kitchen.</strong> Even a small
            rail or windowsill planter can host herbs, bringing fragrance and
            edible greenery into daily routines.
          </li>
        </ul>
        <p>
          If your apartment is very dark, consider discreet grow lights
          designed for interiors; in 2026, many are attractive enough to double
          as design lighting.
        </p>

      </div>

      {/* ── Mid-article AdSense (between plants and color palettes) ── */}
      <div className="not-prose my-10 lg:my-12">
        <AdSlot variant="responsive" />
      </div>

      {/* ── Main body prose — sections 4–6 ── */}
      <div className="prose max-w-none text-ink-800">

        {/* ─ Section 4: Color Palettes ─ */}
        <h2 id="earthy-color-palettes">
          Earthy Color Palettes that Mimic Nature
        </h2>
        <p>
          Color has a deep impact on mood, and current interior trends are
          shifting away from cold grays toward warmer, earth-rooted palettes
          that feel comforting and human. This aligns perfectly with biophilic
          design, which aims to recreate the visual richness of natural
          environments indoors.
        </p>

        <h3>From &ldquo;millennial gray&rdquo; to sunbaked hues</h3>
        <p>
          Designers note that all-gray interiors can feel like a &ldquo;sensory
          vacuum,&rdquo; subtly keeping our nervous system on alert rather than
          relaxed. To counter this, 2026 color trends embrace:
        </p>
        <ul>
          <li>
            <strong>Soft neutrals:</strong> warm whites, cream, sand, and beige
            as calming base tones.
          </li>
          <li>
            <strong>Earth tones:</strong> terracotta, ochre, clay, and warm
            browns inspired by soil and sunbaked landscapes.
          </li>
          <li>
            <strong>Nature greens:</strong> moss, olive, and deep forest greens
            that echo foliage and forest canopies.
          </li>
        </ul>
        <p>
          These earthy color palettes that mimic nature create a backdrop that
          instantly makes plants, wood, and stone feel at home.
        </p>

        <h3>Easy color strategies for renters</h3>
        <p>
          You do not need a full repaint to harness color in a small apartment.
        </p>
        <ul>
          <li>
            <strong>Textiles as color anchors.</strong> Start with a
            nature-inspired rug, then echo one or two colors in cushions,
            throws, or art.
          </li>
          <li>
            <strong>Color capping and accent walls.</strong> Where painting is
            allowed, using a deeper earthy tone on the ceiling or one wall can
            create a cocooning effect without overwhelming the space.
          </li>
          <li>
            <strong>Monochrome with texture.</strong> If you prefer a minimal
            palette, layer different textures of the same color
            family&mdash;linen, wool, clay, wood&mdash;to mimic the depth of
            a natural landscape.
          </li>
        </ul>
        <p>
          Combining color, material, and plant life turns even the smallest
          living room into a holistic, nature-inspired environment.
        </p>

        {/* ─ Section 5: Step-by-Step ─ */}
        <h2 id="how-to-bring-natural-elements">
          How to Bring Natural Elements Into Apartment Decor (Step-by-Step)
        </h2>
        <p>
          To make implementation simple, here is a mini roadmap for bringing
          natural elements into apartment decor without overwhelming yourself
          or your budget.
        </p>
        <ol>
          <li>
            <strong>Audit your space.</strong> Note where light enters, which
            corners feel &ldquo;dead,&rdquo; and which surfaces are dominated
            by plastic, metal, or gray tones.
          </li>
          <li>
            <strong>Pick a nature palette.</strong> Choose 2&ndash;3 core
            colors: one light neutral, one earthy tone, and one accent inspired
            by plants, sky, or stone.
          </li>
          <li>
            <strong>Change one big surface.</strong> Swap a synthetic rug for
            jute, a laminate coffee table for wood, or plasticky curtains for
            linen or cotton.
          </li>
          <li>
            <strong>Add 3&ndash;5 strategic plants.</strong> Start with hardy
            species like snake plant, pothos, or ZZ plant that fit your light
            level and routine.
          </li>
          <li>
            <strong>Layer in biophilic details.</strong> Use nature photography,
            botanical prints, ceramic vases, stone trays, and woven baskets to
            echo organic forms.
          </li>
          <li>
            <strong>Fine-tune light and airflow.</strong> Declutter window
            areas, adjust curtains, and consider a fan or air purifier to keep
            the space feeling fresh and alive.
          </li>
        </ol>
        <p>
          By taking it step by step, you create a cohesive, sustainable
          transformation rather than a random assortment of
          &ldquo;green&rdquo; objects.
        </p>

        {/* ─ Conclusion ─ */}
        <h2 id="conclusion">Conclusion</h2>
        <p>
          Biophilic interior design offers a powerful framework for turning
          compact urban apartments into calming, nature-connected sanctuaries
          that genuinely support your wellbeing in 2026. By prioritizing
          natural light and airflow, choosing raw sustainable materials,
          introducing low light indoor plants for apartment wellbeing, and
          embracing earthy color palettes, you can unlock the best biophilic
          living room ideas for small spaces without sacrificing function or
          style.
        </p>
        <p>
          Your next step: choose one room&mdash;most likely your living
          room&mdash;and apply just three moves this week: clear your windows,
          add one natural-material piece, and bring home one resilient plant
          suited to your light level. From there, keep layering nature in;
          your apartment will gradually evolve into a sustainable, biophilic
          retreat that feels like a breath of fresh air every time you walk
          through the door.
        </p>

      </div>
    </>
  );
}

// ─── Related articles ──────────────────────────────────────────
type RelatedCard = {
  slug:          string;
  title:         string;
  excerpt:       string;
  categoryLabel: string;
  categoryHref:  string;
  href:          string;
  image:         string;
  imageAlt:      string;
  readingTime:   number;
};

const RELATED_ARTICLES: RelatedCard[] = [
  {
    slug:          'hidden-armoire-storage-2026',
    title:         "The Secret Armoire: Why Hidden Storage is 2026's Ultimate Luxury",
    excerpt:
      'Custom millwork and invisible storage are redefining what it means for a room to feel truly calm. Here is the case for hiding everything.',
    categoryLabel: 'Design Trends',
    categoryHref:  '/design-trends',
    href:          '/blog/hidden-armoire-storage-2026',
    image:         'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80',
    imageAlt:      'Elegant room with seamless custom wooden cabinetry concealing storage',
    readingTime:   7,
  },
  {
    slug:          'small-home-feel-huge',
    title:         '6 Honest Ways to Make a Small Home Feel Huge (Without Tearing Down Walls)',
    excerpt:
      'Six real design decisions that make even the tightest spaces feel beautifully expansive. No renovation required — just honest tricks from the Bigelow Design Team.',
    categoryLabel: 'Room Guides',
    categoryHref:  '/rooms/living-room',
    href:          '/blog/small-home-feel-huge',
    image:         '/living-room-candid.webp',
    imageAlt:      'A real living room feeling spacious and airy through deliberate furniture placement',
    readingTime:   4,
  },
];

function RelatedArticleCard({ card }: { card: RelatedCard }) {
  return (
    <article className="group flex flex-col gap-4">
      <Link
        href={card.href}
        className="block overflow-hidden rounded-xl"
        tabIndex={-1}
        aria-hidden="true"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-elevated">
          <Image
            src={card.image}
            alt={card.imageAlt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-smooth ease-out group-hover:scale-[1.04]"
          />
        </div>
      </Link>
      <div className="flex flex-1 flex-col">
        <Link
          href={card.categoryHref}
          className="text-eyebrow uppercase tracking-[0.14em] text-accent-600 transition-colors duration-quick hover:text-accent-500"
        >
          {card.categoryLabel}
        </Link>
        <h3 className="mt-1.5 flex-1 font-serif text-body-lg font-semibold leading-snug text-ink-900">
          <Link
            href={card.href}
            className="transition-colors duration-quick hover:text-accent-600"
          >
            {card.title}
          </Link>
        </h3>
        <p className="mt-2 text-body-sm leading-relaxed text-ink-500 line-clamp-2">
          {card.excerpt}
        </p>
        <p className="mt-3 text-body-sm text-ink-400">{card.readingTime} min read</p>
      </div>
    </article>
  );
}

import Image from 'next/image';
import Link from 'next/link';

export interface CategoryItem {
  slug: string;
  label: string;
  href: string;
  image: string;
  imageAlt: string;
  caption?: string;
  articleCount?: number;
}

interface CategoryGridProps {
  eyebrow?: string;
  heading: string;
  description?: string;
  items: CategoryItem[];
}

export function CategoryGrid({
  eyebrow = 'Departments',
  heading,
  description,
  items,
}: CategoryGridProps) {
  return (
    <section
      aria-labelledby="category-heading"
      className="mx-auto max-w-page px-4 py-20 sm:px-6 lg:px-8 lg:py-28"
    >
      <header className="max-w-2xl">
        <p className="text-eyebrow text-accent-600">{eyebrow}</p>
        <h2
          id="category-heading"
          className="mt-3 font-serif text-h1 text-ink-900 text-balance"
        >
          {heading}
        </h2>
        {description && (
          <p className="mt-4 text-body-lg text-ink-600 text-pretty">
            {description}
          </p>
        )}
      </header>

      <ul className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
        {items.map((item, idx) => (
          <li key={item.slug}>
            <Link
              href={item.href}
              className="group block focus-visible:outline-none"
            >
              <figure className="relative aspect-[3/4] overflow-hidden rounded-xl bg-elevated transition-shadow duration-smooth ease-out group-hover:shadow-lg group-focus-visible:shadow-lg group-focus-visible:ring-2 group-focus-visible:ring-accent group-focus-visible:ring-offset-4">
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading={idx < 3 ? 'eager' : 'lazy'}
                  className="object-cover transition-transform duration-smooth ease-out group-hover:scale-[1.05]"
                />

                {/* Editorial number badge — top corner */}
                <span className="absolute left-5 top-5 font-serif text-body-sm font-medium text-white drop-shadow-md">
                  {String(idx + 1).padStart(2, '0')} /{' '}
                  {String(items.length).padStart(2, '0')}
                </span>
              </figure>

              <div className="mt-5">
                <h3 className="font-serif text-h3 text-ink-900 transition-colors duration-quick ease-out group-hover:text-accent-600">
                  {item.label}
                </h3>
                {item.caption && (
                  <p className="mt-1.5 text-body-sm text-ink-600">
                    {item.caption}
                  </p>
                )}
                <p className="mt-3 inline-flex items-center gap-1 text-eyebrow text-accent-600">
                  Explore
                  <span
                    aria-hidden="true"
                    className="inline-block transition-transform duration-quick ease-out group-hover:translate-x-1"
                  >
                    →
                  </span>
                  {item.articleCount && (
                    <span className="ml-2 text-ink-400 font-normal tracking-normal normal-case">
                      · {item.articleCount} articles
                    </span>
                  )}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

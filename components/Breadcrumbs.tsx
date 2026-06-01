import Link from 'next/link';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="w-full">
      <ol className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-ink-500 uppercase tracking-wider font-semibold">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={item.url} className="flex items-center gap-2">
              {idx > 0 && (
                <span aria-hidden="true" className="text-ink-400">
                  /
                </span>
              )}
              {isLast ? (
                <span aria-current="page" className="text-ink-900 font-bold truncate max-w-[180px] sm:max-w-none">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.url}
                  className="transition-colors hover:text-accent-600"
                >
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

import Link from 'next/link';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="flex flex-wrap items-center gap-1.5 text-ink-600">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={item.url} className="flex items-center gap-1.5">
              {idx > 0 && (
                <span aria-hidden="true" className="text-ink-400">
                  /
                </span>
              )}
              {isLast ? (
                <span aria-current="page" className="text-ink-800">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.url}
                  className="transition-colors hover:text-accent-dark"
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

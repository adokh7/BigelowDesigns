'use client';

import { useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import type { ProductRef } from '@/types/article';
import { AffiliateButton } from './AffiliateButton';

interface Hotspot {
  x: number;
  y: number;
  product: ProductRef;
  label?: string;
}

export function ShopTheLook({
  image,
  imageAlt,
  hotspots,
}: {
  image: string;
  imageAlt: string;
  hotspots: Hotspot[];
}) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="my-10" aria-label="Shop the look">
      <div className="relative overflow-hidden rounded-xl">
        <Image
          src={image}
          alt={imageAlt}
          width={1600}
          height={1067}
          sizes="(max-width: 768px) 100vw, 800px"
          className="h-auto w-full"
        />
        {hotspots.map((h, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setActive(active === idx ? null : idx)}
            aria-label={`View ${h.product.name}`}
            aria-expanded={active === idx}
            className={clsx(
              'absolute flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-sm font-bold transition-all',
              'bg-white/90 text-ink-900 ring-2 ring-white shadow-lg backdrop-blur',
              'before:absolute before:inset-0 before:animate-ping before:rounded-full before:bg-white/60',
              active === idx && 'scale-125 ring-accent',
            )}
            style={{ left: `${h.x}%`, top: `${h.y}%` }}
          >
            {idx + 1}
          </button>
        ))}
      </div>

      {active !== null && (
        <div className="mt-4 rounded-xl border border-ink-100 bg-white p-4">
          <ProductMiniCard product={hotspots[active].product} />
        </div>
      )}

      {active === null && (
        <ol className="mt-4 grid gap-3 sm:grid-cols-2">
          {hotspots.map((h, idx) => (
            <li
              key={idx}
              className="flex items-center gap-3 rounded-lg border border-ink-100 p-3"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink-900 text-xs font-bold text-white">
                {idx + 1}
              </span>
              <span className="text-sm text-ink-800">{h.product.name}</span>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}

function ProductMiniCard({ product }: { product: ProductRef }) {
  const link = product.affiliateLinks[0];
  return (
    <div className="flex gap-4">
      <Image
        src={product.image}
        alt={product.imageAlt}
        width={96}
        height={96}
        className="h-24 w-24 shrink-0 rounded-md object-cover"
      />
      <div className="min-w-0 flex-1">
        <h3 className="font-semibold text-ink-900">{product.name}</h3>
        {product.brand && (
          <div className="text-xs text-ink-400">{product.brand}</div>
        )}
        <div className="mt-3">
          <AffiliateButton
            href={link.url}
            network={link.network}
            price={link.price}
            currency={link.currency}
          />
        </div>
      </div>
    </div>
  );
}

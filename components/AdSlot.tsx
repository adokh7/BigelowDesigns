'use client';

import React, { useEffect, useRef } from 'react';

interface AdSenseProps {
  slot?: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal';
  responsive?: boolean;
  className?: string;
}

/**
 * Non-intrusive AdSense container safe for React and MDX hydration.
 * Wraps ads in protected containers (`adsbygoogle`) without altering layout attributes.
 */
export function AdSense({
  slot = '8933725159',
  format = 'auto',
  responsive = true,
  className = 'my-10 text-center',
}: AdSenseProps) {
  const adRef = useRef<HTMLModElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && !initialized.current) {
        if (adRef.current && !adRef.current.getAttribute('data-adsbygoogle-status')) {
          (window as any).adsbygoogle = (window as any).adsbygoogle || [];
          (window as any).adsbygoogle.push({});
          initialized.current = true;
        }
      }
    } catch (err) {
      console.error('AdSense initialization error:', err);
    }
  }, []);

  return (
    <aside
      aria-label="Advertisement"
      className={`overflow-hidden rounded-2xl border border-ink-100/50 bg-surface/40 px-4 py-3 shadow-2xs transition-opacity duration-smooth ${className}`}
    >
      <div className="text-center font-sans text-eyebrow uppercase tracking-[0.22em] text-ink-300 pb-2 text-[10px]">
        Advertisement
      </div>
      <div className="min-h-[100px] w-full flex items-center justify-center">
        <ins
          ref={adRef}
          className="adsbygoogle block w-full"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-8933725159594062"
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive={responsive ? 'true' : 'false'}
        />
      </div>
    </aside>
  );
}

export const AdSlot = AdSense;
export default AdSense;

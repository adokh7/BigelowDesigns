'use client';

import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  /** Distance traveled during reveal in px. Default 24. */
  distance?: number;
  /** Once revealed, never hide again. Default true. */
  once?: boolean;
  className?: string;
  as?: React.ElementType;
}

/**
 * Scroll-triggered fade + translate-up reveal.
 * Respects prefers-reduced-motion automatically via globals.css.
 * Disconnects observer after first reveal to free memory.
 */
export function Reveal({
  children,
  delay = 0,
  distance = 24,
  once = true,
  className,
  as: Tag = 'div',
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  return (
    <Tag
      ref={ref}
      style={{
        transitionDelay: `${delay}ms`,
        transform: visible ? 'translateY(0)' : `translateY(${distance}px)`,
      }}
      className={clsx(
        'transition-[opacity,transform] duration-editorial ease-in-out',
        visible ? 'opacity-100' : 'opacity-0',
        className,
      )}
    >
      {children}
    </Tag>
  );
}

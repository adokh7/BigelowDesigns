'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { ProductRef } from '@/types/article';
import { track } from '@/lib/analytics';

const STORAGE_KEY = 'bigelow-compare-v1';
const MAX_ITEMS = 4;

interface CompareContextValue {
  items: ProductRef[];
  /** True after localStorage has been read on the client. Use this to avoid hydration mismatch UI. */
  hydrated: boolean;
  isFull: boolean;
  max: number;
  add: (product: ProductRef, source?: string) => boolean;
  remove: (id: string) => void;
  clear: () => void;
  isInCompare: (id: string) => boolean;
}

const CompareContext = createContext<CompareContextValue | null>(null);

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ProductRef[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // ── Hydrate once on mount ──
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setItems(parsed.slice(0, MAX_ITEMS));
      }
    } catch {
      /* swallow — corrupt storage or quota */
    }
    setHydrated(true);
  }, []);

  // ── Persist on change (after hydration only) ──
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* quota exceeded — ignore silently */
    }
  }, [items, hydrated]);

  const add = useCallback(
    (product: ProductRef, source: string = 'unknown'): boolean => {
      let added = false;
      setItems((prev) => {
        if (prev.some((p) => p.id === product.id)) return prev;
        if (prev.length >= MAX_ITEMS) return prev;
        added = true;
        track('compare_add', {
          product_id: product.id,
          product_name: product.name,
          brand: product.brand,
          source,
          new_count: prev.length + 1,
        });
        return [...prev, product];
      });
      return added;
    },
    [],
  );

  const remove = useCallback((id: string) => {
    setItems((prev) => {
      const next = prev.filter((p) => p.id !== id);
      if (next.length !== prev.length) {
        track('compare_remove', { product_id: id, new_count: next.length });
      }
      return next;
    });
  }, []);

  const clear = useCallback(() => {
    setItems((prev) => {
      if (prev.length > 0) track('compare_clear', { count: prev.length });
      return [];
    });
  }, []);

  const isInCompare = useCallback(
    (id: string) => items.some((p) => p.id === id),
    [items],
  );

  const value = useMemo<CompareContextValue>(
    () => ({
      items,
      hydrated,
      isFull: items.length >= MAX_ITEMS,
      max: MAX_ITEMS,
      add,
      remove,
      clear,
      isInCompare,
    }),
    [items, hydrated, add, remove, clear, isInCompare],
  );

  return (
    <CompareContext.Provider value={value}>{children}</CompareContext.Provider>
  );
}

export function useCompare(): CompareContextValue {
  const ctx = useContext(CompareContext);
  if (!ctx) {
    throw new Error('useCompare must be used within <CompareProvider>');
  }
  return ctx;
}

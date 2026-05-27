'use client';

import { useReducer, useEffect, useDeferredValue, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import {
  ROOM_LABELS,
  QUALITY_LABELS,
  SIZE_LABELS,
  calculateBudget,
  getAffiliatePicks,
  type RoomType,
  type QualityTier,
  type RoomSize,
} from '@/lib/pricing';

// ─── State ────────────────────────────────────────────────────
interface State {
  room: RoomType | null;
  quality: QualityTier | null;
  size: RoomSize | null;
}

type Action =
  | { type: 'SET'; field: keyof State; value: string | null }
  | { type: 'RESET' }
  | { type: 'HYDRATE'; state: State };

const initialState: State = { room: null, quality: null, size: null };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET':   return { ...state, [action.field]: action.value };
    case 'RESET': return initialState;
    case 'HYDRATE': return action.state;
  }
}

const STORAGE_KEY = 'budget-estimator-v1';
const ROOMS    = Object.keys(ROOM_LABELS)    as RoomType[];
const TIERS    = Object.keys(QUALITY_LABELS) as QualityTier[];
const SIZES    = Object.keys(SIZE_LABELS)    as RoomSize[];

// ─── Component ────────────────────────────────────────────────
export function BudgetEstimator() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const deferredState = useDeferredValue(state);

  // Hydrate from localStorage once
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) dispatch({ type: 'HYDRATE', state: JSON.parse(raw) });
    } catch { /* ignore */ }
  }, []);

  // Persist
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
    catch { /* ignore */ }
  }, [state]);

  const isComplete =
    deferredState.room && deferredState.quality && deferredState.size;

  const estimate = useMemo(() => {
    if (!isComplete) return null;
    return calculateBudget(
      deferredState.room!,
      deferredState.quality!,
      deferredState.size!,
    );
  }, [isComplete, deferredState]);

  const picks = useMemo(() => {
    if (!isComplete) return [];
    return getAffiliatePicks(deferredState.room!, deferredState.quality!);
  }, [isComplete, deferredState]);

  return (
    <section
      aria-labelledby="estimator-heading"
      className="my-12 rounded-2xl bg-sunken p-6 sm:p-10"
    >
      <header className="text-center">
        <p className="text-eyebrow text-accent-600">Free Tool</p>
        <h2
          id="estimator-heading"
          className="mt-2 font-serif text-h2 text-ink-900"
        >
          What will your renovation cost?
        </h2>
        <p className="mx-auto mt-2 max-w-md text-body text-ink-600">
          Pick a room, a quality tier, and a size. We&apos;ll show you a realistic
          range — plus three pieces we&apos;d buy at that budget.
        </p>
      </header>

      <div className="mt-10 grid gap-6">
        <Fieldset
          legend="Which room?"
          options={ROOMS.map((r) => ({ value: r, label: ROOM_LABELS[r] }))}
          selected={state.room}
          onSelect={(v) => dispatch({ type: 'SET', field: 'room', value: v })}
        />
        <Fieldset
          legend="What quality level?"
          options={TIERS.map((t) => ({
            value: t,
            label: QUALITY_LABELS[t].label,
            sublabel: QUALITY_LABELS[t].sublabel,
          }))}
          selected={state.quality}
          onSelect={(v) => dispatch({ type: 'SET', field: 'quality', value: v })}
        />
        <Fieldset
          legend="What size is the room?"
          options={SIZES.map((s) => ({
            value: s,
            label: SIZE_LABELS[s].label,
            sublabel: SIZE_LABELS[s].sqft,
          }))}
          selected={state.size}
          onSelect={(v) => dispatch({ type: 'SET', field: 'size', value: v })}
        />
      </div>

      {/* Result */}
      <div
        aria-live="polite"
        className={clsx(
          'mt-10 transition-all duration-smooth ease-out',
          isComplete
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-2 pointer-events-none h-0 overflow-hidden',
        )}
      >
        {estimate && (
          <Result
            estimate={estimate}
            picks={picks}
            room={deferredState.room!}
            quality={deferredState.quality!}
            onReset={() => dispatch({ type: 'RESET' })}
          />
        )}
      </div>

      {!isComplete && (
        <p className="mt-10 text-center text-body-sm text-ink-400">
          Pick a room to begin.
        </p>
      )}
    </section>
  );
}

// ─── Fieldset (pill group) ────────────────────────────────────
interface FieldsetProps {
  legend: string;
  options: { value: string; label: string; sublabel?: string }[];
  selected: string | null;
  onSelect: (value: string) => void;
}

function Fieldset({ legend, options, selected, onSelect }: FieldsetProps) {
  return (
    <fieldset>
      <legend className="text-eyebrow text-ink-600">{legend}</legend>
      <div
        role="radiogroup"
        className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3"
      >
        {options.map((opt) => {
          const active = selected === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onSelect(opt.value)}
              className={clsx(
                'flex flex-col items-start gap-0.5',
                'rounded-lg px-4 py-3 text-left',
                'border transition-all duration-quick ease-out',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
                active
                  ? 'border-accent bg-accent-50 text-accent-600'
                  : 'border-ink-200 bg-surface text-ink-800 hover:border-accent/50',
              )}
            >
              <span className="text-body font-semibold">{opt.label}</span>
              {opt.sublabel && (
                <span className="text-body-sm text-ink-400">{opt.sublabel}</span>
              )}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

// ─── Result ───────────────────────────────────────────────────
interface ResultProps {
  estimate: ReturnType<typeof calculateBudget>;
  picks: ReturnType<typeof getAffiliatePicks>;
  room: RoomType;
  quality: QualityTier;
  onReset: () => void;
}

function Result({ estimate, picks, room, quality, onReset }: ResultProps) {
  const fmt = (n: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(n);

  return (
    <div className="rounded-xl bg-surface p-6 sm:p-8">
      <div className="text-center">
        <p className="text-eyebrow text-ink-400">Estimated budget</p>
        <p className="mt-1 font-serif text-display-lg leading-tight text-ink-900">
          {fmt(estimate.total)}
        </p>
        <p className="mt-1 text-body-sm text-ink-600">
          Range {fmt(estimate.rangeLow)} – {fmt(estimate.rangeHigh)}
        </p>
      </div>

      <dl className="mt-6 grid grid-cols-3 gap-2 border-y border-ink-100 py-4 text-center">
        <div>
          <dt className="text-eyebrow text-ink-400">Furniture</dt>
          <dd className="mt-1 font-serif text-h3 text-ink-900">
            {fmt(estimate.breakdown.furniture)}
          </dd>
        </div>
        <div>
          <dt className="text-eyebrow text-ink-400">Finishes</dt>
          <dd className="mt-1 font-serif text-h3 text-ink-900">
            {fmt(estimate.breakdown.finishes)}
          </dd>
        </div>
        <div>
          <dt className="text-eyebrow text-ink-400">Labor</dt>
          <dd className="mt-1 font-serif text-h3 text-ink-900">
            {fmt(estimate.breakdown.labor)}
          </dd>
        </div>
      </dl>

      {picks.length > 0 && (
        <div className="mt-8">
          <h3 className="font-serif text-h3 text-ink-900">
            Three picks at this budget
          </h3>
          <p className="mt-1 text-body-sm text-ink-600">
            What we&apos;d actually buy for a {QUALITY_LABELS[quality].label.toLowerCase()}{' '}
            {ROOM_LABELS[room].toLowerCase()}.
          </p>
          <ul className="mt-4 grid gap-4 sm:grid-cols-3">
            {picks.map((p) => (
              <li key={p.id}>
                <a
                  href={p.url}
                  target="_blank"
                  rel="sponsored nofollow noopener"
                  className="group block"
                >
                  <div className="aspect-[4/3] overflow-hidden rounded-lg bg-elevated">
                    <Image
                      src={p.image}
                      alt={p.name}
                      width={400}
                      height={300}
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="h-full w-full object-cover transition-transform duration-smooth ease-out group-hover:scale-105"
                    />
                  </div>
                  <p className="mt-2 text-eyebrow text-ink-400">{p.brand}</p>
                  <p className="text-body font-semibold text-ink-900 group-hover:text-accent-600">
                    {p.name}
                  </p>
                  <p className="text-body-sm text-ink-600">{fmt(p.price)}</p>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href={`/rooms/${room}`}
          className="text-body-sm font-semibold text-accent-600 hover:text-accent-500"
        >
          Read our {ROOM_LABELS[room]} guide →
        </Link>
        <span aria-hidden="true" className="text-ink-200">·</span>
        <button
          type="button"
          onClick={onReset}
          className="text-body-sm text-ink-600 underline-offset-4 hover:underline"
        >
          Start over
        </button>
      </div>
    </div>
  );
}

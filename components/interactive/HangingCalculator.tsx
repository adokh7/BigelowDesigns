'use client';

import { useMemo, useState } from 'react';

/**
 * HangingCalculator
 * ─────────────────────────────────────────────────────────────────────────
 * Two designer utilities in one editorial card:
 *
 *   1. Curtains — rod height, rod width, and panel length from the room's
 *      ceiling height, window frame height, and window width.
 *   2. Art — the exact nail height for a piece, either on an open wall
 *      (centre line at 57–60") or hung above a sofa / console.
 *
 * All maths is pure and unit-agnostic in inches. Every result recalculates
 * as the user types — there is no submit button by design.
 */

/* ─── Constants (the actual design rules) ──────────────────────────────── */

/** Rod clears the window frame by at least this much. */
const MIN_RISE_ABOVE_FRAME = 4;
/** Rod never crowds the ceiling closer than this. */
const MIN_CEILING_CLEARANCE = 2.5;
/** Rod extends this far past the frame on EACH side. */
const ROD_EXTENSION = { min: 8, ideal: 10, max: 12 };
/** Gallery centre-line range, in inches from the floor. */
const CENTRE_RANGE = { min: 57, max: 60 };
/** Breathing room between furniture top and the bottom of the art. */
const FURNITURE_GAP = { min: 6, ideal: 7, max: 8 };
/** Off-the-shelf curtain panel drops. */
const STOCK_PANELS = [63, 84, 95, 96, 108, 120, 132, 144];
/** A single stock panel is ~50" wide. */
const PANEL_WIDTH = 50;

/* ─── Formatting helpers ───────────────────────────────────────────────── */

/** 84.5 → `84 1/2"` — rounds to the nearest eighth, like a tape measure. */
function fmt(inches: number): string {
  const sign = inches < 0 ? '−' : '';
  const abs = Math.abs(inches);
  const eighths = Math.round(abs * 8);
  const whole = Math.floor(eighths / 8);
  let num = eighths % 8;
  let den = 8;
  while (num > 0 && num % 2 === 0) {
    num /= 2;
    den /= 2;
  }
  return `${sign}${whole}${num ? ` ${num}/${den}` : ''}"`;
}

/** 84.5 → `7′ 0 1/2"` */
function fmtFeet(inches: number): string {
  if (inches < 12) return fmt(inches);
  const feet = Math.floor(inches / 12);
  return `${feet}′ ${fmt(inches - feet * 12)}`;
}

/** Parses a text input into a positive number, or null when unusable. */
function num(value: string): number | null {
  if (value.trim() === '') return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
}

function nearestStock(target: number): number {
  return STOCK_PANELS.reduce((best, size) =>
    Math.abs(size - target) < Math.abs(best - target) ? size : best,
  );
}

/* ─── Shared presentational pieces ─────────────────────────────────────── */

function Field({
  label,
  hint,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  hint?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="block text-body-sm font-medium text-ink-900">{label}</span>
      {hint && <span className="mt-0.5 block text-body-sm text-ink-400">{hint}</span>}
      <div className="relative mt-2">
        <input
          type="number"
          inputMode="decimal"
          min={0}
          step="0.25"
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg border border-ink-100 bg-canvas py-3 pl-4 pr-12 text-body
                     text-ink-900 transition-colors duration-quick
                     placeholder:text-ink-200
                     focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/25"
        />
        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-body-sm text-ink-400">
          in
        </span>
      </div>
    </label>
  );
}

function Stat({
  label,
  value,
  sub,
  emphasis = false,
}: {
  label: string;
  value: string;
  sub?: string;
  emphasis?: boolean;
}) {
  return (
    <div
      className={[
        'rounded-xl border px-5 py-4 transition-colors duration-smooth',
        emphasis
          ? 'border-brand/25 bg-brand/[0.07]'
          : 'border-ink-100 bg-canvas',
      ].join(' ')}
    >
      <p className="text-eyebrow uppercase text-ink-400">{label}</p>
      <p
        className={[
          'mt-1.5 font-serif tabular-nums',
          emphasis ? 'text-h2 text-brand' : 'text-h3 text-ink-900',
        ].join(' ')}
      >
        {value}
      </p>
      {sub && <p className="mt-1 text-body-sm text-ink-600">{sub}</p>}
    </div>
  );
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <p className="border-l-2 border-brand-light pl-4 text-body-sm leading-relaxed text-ink-600">
      {children}
    </p>
  );
}

function Empty({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full min-h-64 flex-col items-center justify-center rounded-xl border border-dashed border-ink-100 px-8 text-center">
      <div className="mb-3 h-px w-10 bg-brand-light" />
      <p className="text-body-sm text-ink-400">{children}</p>
    </div>
  );
}

/* ─── Curtain panel ────────────────────────────────────────────────────── */

function CurtainCalculator() {
  const [ceiling, setCeiling] = useState('');
  const [frameTop, setFrameTop] = useState('');
  const [width, setWidth] = useState('');
  const [ringDrop, setRingDrop] = useState('');

  const result = useMemo(() => {
    const c = num(ceiling);
    const f = num(frameTop);
    const w = num(width);
    if (c === null || f === null || w === null) return null;
    if (f >= c) return { error: 'The window frame must sit below the ceiling.' } as const;

    const drop = num(ringDrop) ?? 0;
    const gap = c - f;

    // Rod height: two-thirds up the wall gap, clamped so it always clears
    // the frame and never crowds the ceiling.
    let rod = f + gap * (2 / 3);
    rod = Math.max(rod, f + MIN_RISE_ABOVE_FRAME);
    rod = Math.min(rod, c - MIN_CEILING_CLEARANCE);
    rod = Math.max(rod, f + 1); // degenerate-gap safety

    const ceilingMount = gap <= 10;
    const panelTop = rod - drop;

    const lengths = {
      float: panelTop - 0.5,
      kiss: panelTop,
      puddle: panelTop + 1,
    };

    const rodWidth = {
      min: w + ROD_EXTENSION.min * 2,
      ideal: w + ROD_EXTENSION.ideal * 2,
      max: w + ROD_EXTENSION.max * 2,
    };

    // Fullness: total fabric should be ~2× the rod width.
    const panels = Math.max(2, Math.ceil((rodWidth.ideal * 2) / PANEL_WIDTH / 2) * 2);

    return {
      rod,
      gap,
      ceilingMount,
      lengths,
      rodWidth,
      panels,
      stock: nearestStock(lengths.float),
    };
  }, [ceiling, frameTop, width, ringDrop]);

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)]">
      {/* Inputs */}
      <div className="space-y-5">
        <Field
          label="Ceiling height"
          hint="Floor to ceiling."
          value={ceiling}
          onChange={setCeiling}
          placeholder="96"
        />
        <Field
          label="Top of window frame"
          hint="Floor to the top of the moulding."
          value={frameTop}
          onChange={setFrameTop}
          placeholder="80"
        />
        <Field
          label="Window width"
          hint="Outer edge to outer edge of the frame."
          value={width}
          onChange={setWidth}
          placeholder="36"
        />
        <Field
          label="Ring or clip drop"
          hint="Optional — rod to the top of the panel."
          value={ringDrop}
          onChange={setRingDrop}
          placeholder="0"
        />
      </div>

      {/* Results */}
      <div>
        {!result ? (
          <Empty>Enter your ceiling, frame height, and window width to see the numbers.</Empty>
        ) : 'error' in result ? (
          <Empty>{result.error}</Empty>
        ) : (
          <div className="space-y-4">
            <Stat
              emphasis
              label="Mount the rod at"
              value={fmt(result.rod)}
              sub={`${fmtFeet(result.rod)} from the floor — ${fmt(result.rod - num(frameTop)!)} above the frame.`}
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <Stat
                label="Rod width"
                value={fmt(result.rodWidth.ideal)}
                sub={`Range ${fmt(result.rodWidth.min)}–${fmt(result.rodWidth.max)}.`}
              />
              <Stat
                label="Panel length"
                value={fmt(result.lengths.float)}
                sub={`Buy the ${result.stock}" stock drop.`}
              />
            </div>

            <div className="rounded-xl border border-ink-100 bg-canvas px-5 py-4">
              <p className="text-eyebrow uppercase text-ink-400">Choose your hem</p>
              <dl className="mt-3 space-y-2.5">
                {[
                  ['Float', result.lengths.float, 'A crisp ½" above the floor. Easiest to keep clean.'],
                  ['Kiss', result.lengths.kiss, 'Just grazing the floor. The tailored choice.'],
                  ['Puddle', result.lengths.puddle, 'Pools 1" on the floor. Softer, more romantic.'],
                ].map(([name, val, desc]) => (
                  <div key={name as string} className="flex items-baseline justify-between gap-4">
                    <div>
                      <dt className="inline text-body-sm font-medium text-ink-900">{name}</dt>
                      <dd className="inline text-body-sm text-ink-400"> — {desc}</dd>
                    </div>
                    <span className="shrink-0 font-serif text-body tabular-nums text-ink-900">
                      {fmt(val as number)}
                    </span>
                  </div>
                ))}
              </dl>
            </div>

            <Note>
              {result.ceilingMount ? (
                <>
                  Your frame sits close to the ceiling, so the rod goes almost all the way up —
                  take it as high as the hardware allows.
                </>
              ) : (
                <>
                  Hung two-thirds up the {fmt(result.gap)} gap above the frame. Going high and wide
                  makes the window read taller and lets the glass stay unblocked.
                </>
              )}{' '}
              For proper fullness use <strong className="font-medium text-ink-900">{result.panels} panels</strong>{' '}
              — fabric should total roughly twice the rod width.
            </Note>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Art panel ────────────────────────────────────────────────────────── */

type ArtMode = 'wall' | 'furniture';

function ArtCalculator() {
  const [mode, setMode] = useState<ArtMode>('wall');
  const [artHeight, setArtHeight] = useState('');
  const [artWidth, setArtWidth] = useState('');
  const [hardwareDrop, setHardwareDrop] = useState('');
  const [centre, setCentre] = useState('58');
  const [furnitureHeight, setFurnitureHeight] = useState('');
  const [furnitureWidth, setFurnitureWidth] = useState('');

  const result = useMemo(() => {
    const h = num(artHeight);
    if (h === null) return null;

    const drop = num(hardwareDrop) ?? 0;
    if (drop >= h) return { error: 'The hanging drop must be less than the height of the piece.' } as const;

    let bottom: number;
    let centreLine: number;

    if (mode === 'furniture') {
      const fh = num(furnitureHeight);
      if (fh === null) return null;
      bottom = fh + FURNITURE_GAP.ideal;
      centreLine = bottom + h / 2;
    } else {
      centreLine = num(centre) ?? 58;
      bottom = centreLine - h / 2;
    }

    const top = bottom + h;
    const nail = top - drop;

    // Advisories
    const notes: string[] = [];
    if (bottom < 0) notes.push('This piece is too tall to centre at that height — raise the centre line.');
    if (mode === 'furniture' && (centreLine < CENTRE_RANGE.min - 3 || centreLine > CENTRE_RANGE.max + 4)) {
      notes.push(
        `The centre lands at ${fmt(centreLine)}, outside the usual ${CENTRE_RANGE.min}–${CENTRE_RANGE.max}" gallery line. Over furniture that is fine — relating the art to the sofa matters more.`,
      );
    }
    const aw = num(artWidth);
    const fw = num(furnitureWidth);
    if (mode === 'furniture' && aw && fw) {
      const ratio = aw / fw;
      if (ratio < 0.5) notes.push(`At ${Math.round(ratio * 100)}% of the furniture width this reads small — aim for 60–75%.`);
      else if (ratio > 0.95) notes.push(`At ${Math.round(ratio * 100)}% this overwhelms the furniture — aim for 60–75%.`);
    }

    return {
      nail,
      bottom,
      top,
      centreLine,
      notes,
      twoHook: aw ? aw / 2 : null,
    };
  }, [mode, artHeight, artWidth, hardwareDrop, centre, furnitureHeight, furnitureWidth]);

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)]">
      {/* Inputs */}
      <div className="space-y-5">
        <div>
          <span className="block text-body-sm font-medium text-ink-900">Where is it going?</span>
          <div className="mt-2 grid grid-cols-2 gap-2 rounded-lg bg-sunken p-1">
            {(
              [
                ['wall', 'Open wall'],
                ['furniture', 'Over furniture'],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setMode(key)}
                aria-pressed={mode === key}
                className={[
                  'rounded-md px-3 py-2 text-body-sm font-medium transition-all duration-quick',
                  mode === key
                    ? 'bg-canvas text-ink-900 shadow-xs'
                    : 'text-ink-400 hover:text-ink-600',
                ].join(' ')}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <Field
          label="Height of the piece"
          hint="Frame included."
          value={artHeight}
          onChange={setArtHeight}
          placeholder="30"
        />
        <Field
          label="Width of the piece"
          hint="Optional — used for hook spacing."
          value={artWidth}
          onChange={setArtWidth}
          placeholder="24"
        />
        <Field
          label="Hanging drop"
          hint="Top of the frame down to the taut wire or D-ring."
          value={hardwareDrop}
          onChange={setHardwareDrop}
          placeholder="3"
        />

        {mode === 'wall' ? (
          <Field
            label="Centre line"
            hint={`Gallery standard is ${CENTRE_RANGE.min}–${CENTRE_RANGE.max}".`}
            value={centre}
            onChange={setCentre}
            placeholder="58"
          />
        ) : (
          <>
            <Field
              label="Furniture height"
              hint="Floor to the top of the sofa back or console."
              value={furnitureHeight}
              onChange={setFurnitureHeight}
              placeholder="32"
            />
            <Field
              label="Furniture width"
              hint="Optional — checks the proportion."
              value={furnitureWidth}
              onChange={setFurnitureWidth}
              placeholder="84"
            />
          </>
        )}
      </div>

      {/* Results */}
      <div>
        {!result ? (
          <Empty>
            {mode === 'furniture'
              ? 'Enter the height of your piece and the furniture below it.'
              : 'Enter the height of your piece to find the nail height.'}
          </Empty>
        ) : 'error' in result ? (
          <Empty>{result.error}</Empty>
        ) : (
          <div className="space-y-4">
            <Stat
              emphasis
              label="Put the nail at"
              value={fmt(result.nail)}
              sub={`${fmtFeet(result.nail)} from the floor. Measure up the wall and mark.`}
            />

            <div className="grid gap-4 sm:grid-cols-3">
              <Stat label="Bottom edge" value={fmt(result.bottom)} />
              <Stat label="Centre" value={fmt(result.centreLine)} />
              <Stat label="Top edge" value={fmt(result.top)} />
            </div>

            {result.twoHook && (
              <div className="rounded-xl border border-ink-100 bg-canvas px-5 py-4">
                <p className="text-eyebrow uppercase text-ink-400">Using two hooks</p>
                <p className="mt-1.5 text-body-sm text-ink-600">
                  Space them{' '}
                  <strong className="font-medium text-ink-900">{fmt(result.twoHook)} apart</strong>, each{' '}
                  {fmt(result.twoHook / 2)} either side of centre, both at the nail height above. Two
                  hooks stop the piece drifting crooked.
                </p>
              </div>
            )}

            <Note>
              {mode === 'furniture' ? (
                <>
                  The bottom edge sits {FURNITURE_GAP.ideal}" above the furniture — inside the{' '}
                  {FURNITURE_GAP.min}–{FURNITURE_GAP.max}" range that keeps art and furniture reading
                  as one group rather than two.
                </>
              ) : (
                <>
                  The centre sits at {fmt(result.centreLine)}, on the museum line. Hang to the eye,
                  not the ceiling — a high piece always looks like a mistake.
                </>
              )}
            </Note>

            {result.notes.map((n) => (
              <Note key={n}>{n}</Note>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Shell ────────────────────────────────────────────────────────────── */

type Tab = 'curtains' | 'art';

export default function HangingCalculator() {
  const [tab, setTab] = useState<Tab>('curtains');

  return (
    <section
      aria-label="Curtain and art hanging height calculator"
      className="not-prose overflow-hidden rounded-2xl border border-ink-100 bg-surface shadow-md"
    >
      {/* Masthead */}
      <header className="border-b border-ink-100 px-6 py-8 sm:px-10">
        <p className="text-eyebrow uppercase text-brand">Bigelow Tools</p>
        <h2 className="mt-2 font-serif text-h2 text-ink-900">Hanging Height Calculator</h2>
        <p className="mt-2 max-w-xl text-body text-ink-600">
          The two measurements people get wrong most often. Enter your room, get the exact number to
          mark on the wall.
        </p>
      </header>

      {/* Tabs */}
      <div role="tablist" aria-label="Calculator type" className="flex gap-8 border-b border-ink-100 px-6 sm:px-10">
        {(
          [
            ['curtains', 'Curtains'],
            ['art', 'Art'],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            role="tab"
            id={`tab-${key}`}
            aria-selected={tab === key}
            aria-controls={`panel-${key}`}
            onClick={() => setTab(key)}
            className={[
              'relative -mb-px py-4 text-body font-medium transition-colors duration-quick',
              tab === key ? 'text-ink-900' : 'text-ink-400 hover:text-ink-600',
            ].join(' ')}
          >
            {label}
            <span
              className={[
                'absolute inset-x-0 bottom-0 h-0.5 rounded-full transition-all duration-smooth ease-out',
                tab === key ? 'bg-brand opacity-100' : 'bg-brand opacity-0',
              ].join(' ')}
            />
          </button>
        ))}
      </div>

      {/* Panels */}
      <div className="px-6 py-8 sm:px-10 sm:py-10">
        <div
          role="tabpanel"
          id="panel-curtains"
          aria-labelledby="tab-curtains"
          hidden={tab !== 'curtains'}
        >
          {tab === 'curtains' && <CurtainCalculator />}
        </div>
        <div role="tabpanel" id="panel-art" aria-labelledby="tab-art" hidden={tab !== 'art'}>
          {tab === 'art' && <ArtCalculator />}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-ink-100 bg-sunken px-6 py-4 sm:px-10">
        <p className="text-body-sm text-ink-400">
          All measurements in inches, rounded to the nearest ⅛". Measure twice — walls are rarely as
          square as they look.
        </p>
      </footer>
    </section>
  );
}

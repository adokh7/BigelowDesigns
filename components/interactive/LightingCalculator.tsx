'use client';

import { useMemo, useState } from 'react';

/**
 * LightingCalculator
 * ─────────────────────────────────────────────────────────────────────────
 * Turns a room's size and intended mood into a three-layer lighting plan.
 *
 *   Target lumens = area × foot-candles × ambiance × ceiling correction
 *
 * The foot-candle figures follow IES (Illuminating Engineering Society)
 * guidance per room type. The output splits that total across the three
 * layers every designed room needs — ambient, task, and accent — and
 * recommends a colour temperature for each, because mixing Kelvins is the
 * single most common lighting mistake in a home.
 */

/* ─── Domain model ─────────────────────────────────────────────────────── */

type RoomKey = 'living' | 'bedroom' | 'kitchen' | 'office';
type AmbianceKey = 'bright' | 'cozy' | 'moody';

interface RoomSpec {
  label: string;
  /** IES foot-candle target for general illumination. */
  footCandles: number;
  /** How the total splits across layers, as percentages summing to 100. */
  layers: { ambient: number; task: number; accent: number };
  /** Base colour temperature in Kelvin. */
  kelvin: { ambient: number; task: number };
  taskExample: string;
  accentExample: string;
}

const ROOMS: Record<RoomKey, RoomSpec> = {
  living: {
    label: 'Living Room',
    footCandles: 15,
    layers: { ambient: 50, task: 25, accent: 25 },
    kelvin: { ambient: 2700, task: 2700 },
    taskExample: 'a reading lamp beside the armchair and either end of the sofa',
    accentExample: 'picture lights, a shelf wash, or an uplight behind a plant',
  },
  bedroom: {
    label: 'Bedroom',
    footCandles: 12,
    layers: { ambient: 45, task: 30, accent: 25 },
    kelvin: { ambient: 2700, task: 2700 },
    taskExample: 'bedside lamps or wall sconces you can reach lying down',
    accentExample: 'a low-level glow near the floor for moving around at night',
  },
  kitchen: {
    label: 'Kitchen',
    footCandles: 35,
    layers: { ambient: 40, task: 45, accent: 15 },
    kelvin: { ambient: 3000, task: 4000 },
    taskExample: 'under-cabinet strips over every run of worktop, plus island pendants',
    accentExample: 'in-cabinet or plinth lighting for the evening',
  },
  office: {
    label: 'Home Office',
    footCandles: 40,
    layers: { ambient: 40, task: 45, accent: 15 },
    kelvin: { ambient: 3500, task: 4000 },
    taskExample: 'an adjustable desk lamp placed opposite your writing hand',
    accentExample: 'a shelf or artwork wash to stop the room feeling like a cubicle',
  },
};

interface AmbianceSpec {
  label: string;
  /** Scales the total lumen target. */
  multiplier: number;
  /** Shifts recommended colour temperature, in Kelvin. */
  kelvinShift: number;
  /** Percentage points moved from ambient into accent. */
  accentShift: number;
  blurb: string;
}

const AMBIANCE: Record<AmbianceKey, AmbianceSpec> = {
  bright: {
    label: 'Bright & Functional',
    multiplier: 1.2,
    kelvinShift: 300,
    accentShift: -5,
    blurb: 'Full, even light for getting things done.',
  },
  cozy: {
    label: 'Cozy & Relaxed',
    multiplier: 0.85,
    kelvinShift: 0,
    accentShift: 5,
    blurb: 'Soft and warm, with light pooled rather than flooded.',
  },
  moody: {
    label: 'Moody & Dramatic',
    multiplier: 0.6,
    kelvinShift: -300,
    accentShift: 12,
    blurb: 'Low and layered, built from contrast and shadow.',
  },
};

/** Typical output of one fixture, in lumens, per layer. */
const FIXTURE_OUTPUT = { ambient: 800, task: 600, accent: 300 };

const BASE_CEILING = 8;

/* ─── Helpers ──────────────────────────────────────────────────────────── */

function num(value: string): number | null {
  if (value.trim() === '') return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
}

/** Lumens are never precise — round to something a person can shop for. */
function roundLumens(n: number): number {
  return Math.round(n / 50) * 50;
}

function fmtNum(n: number): string {
  return n.toLocaleString('en-US');
}

function fmtKelvin(k: number): string {
  return `${Math.round(k / 100) * 100}K`;
}

/* ─── Presentational pieces ────────────────────────────────────────────── */

function Field({
  label,
  hint,
  value,
  onChange,
  placeholder,
  unit,
}: {
  label: string;
  hint?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  unit: string;
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
          step="1"
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg border border-ink-100 bg-canvas py-3 pl-4 pr-14 text-body
                     text-ink-900 transition-colors duration-quick
                     placeholder:text-ink-200
                     focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/25"
        />
        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-body-sm text-ink-400">
          {unit}
        </span>
      </div>
    </label>
  );
}

function Segmented<T extends string>({
  label,
  hint,
  options,
  value,
  onChange,
  columns = 2,
}: {
  label: string;
  hint?: string;
  options: { key: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  columns?: 1 | 2;
}) {
  return (
    <div>
      <span className="block text-body-sm font-medium text-ink-900">{label}</span>
      {hint && <span className="mt-0.5 block text-body-sm text-ink-400">{hint}</span>}
      <div
        className={[
          'mt-2 grid gap-2 rounded-lg bg-sunken p-1',
          columns === 2 ? 'grid-cols-2' : 'grid-cols-1',
        ].join(' ')}
      >
        {options.map((o) => (
          <button
            key={o.key}
            type="button"
            onClick={() => onChange(o.key)}
            aria-pressed={value === o.key}
            className={[
              'rounded-md px-3 py-2.5 text-body-sm font-medium transition-all duration-quick',
              value === o.key
                ? 'bg-canvas text-ink-900 shadow-xs'
                : 'text-ink-400 hover:text-ink-600',
            ].join(' ')}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function LayerCard({
  index,
  name,
  lumens,
  fixtures,
  kelvin,
  share,
  description,
}: {
  index: string;
  name: string;
  lumens: number;
  fixtures: number;
  kelvin: number;
  share: number;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-ink-100 bg-canvas p-5">
      <div className="flex items-baseline justify-between gap-4">
        <div className="flex items-baseline gap-3">
          <span className="font-serif text-body-sm text-brand">{index}</span>
          <h4 className="font-serif text-h3 text-ink-900">{name}</h4>
        </div>
        <span className="shrink-0 text-body-sm text-ink-400">{share}%</span>
      </div>

      <p className="mt-3 font-serif text-h2 tabular-nums text-ink-900">
        {fmtNum(lumens)}
        <span className="ml-1.5 font-sans text-body-sm font-normal text-ink-400">lumens</span>
      </p>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-body-sm text-ink-600">
        <span>
          ≈ <strong className="font-medium text-ink-900">{fixtures}</strong>{' '}
          {fixtures === 1 ? 'fixture' : 'fixtures'}
        </span>
        <span aria-hidden className="text-ink-100">|</span>
        <span>
          <strong className="font-medium text-ink-900">{fmtKelvin(kelvin)}</strong>
        </span>
      </div>

      <p className="mt-3 text-body-sm leading-relaxed text-ink-600">{description}</p>
    </div>
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

/* ─── Main component ───────────────────────────────────────────────────── */

export default function LightingCalculator() {
  const [room, setRoom] = useState<RoomKey>('living');
  const [ambiance, setAmbiance] = useState<AmbianceKey>('cozy');
  const [sqft, setSqft] = useState('');
  const [ceiling, setCeiling] = useState('8');

  const result = useMemo(() => {
    const area = num(sqft);
    if (area === null) return null;

    const height = num(ceiling) ?? BASE_CEILING;
    const spec = ROOMS[room];
    const mood = AMBIANCE[ambiance];

    // Higher ceilings lose light before it reaches the working plane.
    const ceilingFactor = 1 + Math.max(0, height - BASE_CEILING) * 0.12;

    const total = area * spec.footCandles * mood.multiplier * ceilingFactor;

    // Mood shifts weight out of flat overhead light and into accent.
    const ambientShare = spec.layers.ambient - mood.accentShift;
    const accentShare = spec.layers.accent + mood.accentShift;
    const taskShare = spec.layers.task;

    const layers = {
      ambient: { lumens: roundLumens((total * ambientShare) / 100), share: ambientShare },
      task: { lumens: roundLumens((total * taskShare) / 100), share: taskShare },
      accent: { lumens: roundLumens((total * accentShare) / 100), share: accentShare },
    };

    const fixtures = {
      ambient: Math.max(1, Math.ceil(layers.ambient.lumens / FIXTURE_OUTPUT.ambient)),
      task: Math.max(1, Math.ceil(layers.task.lumens / FIXTURE_OUTPUT.task)),
      accent: Math.max(1, Math.ceil(layers.accent.lumens / FIXTURE_OUTPUT.accent)),
    };

    const kelvin = {
      ambient: spec.kelvin.ambient + mood.kelvinShift,
      task: spec.kelvin.task + mood.kelvinShift,
      accent: spec.kelvin.ambient + mood.kelvinShift,
    };

    const mixedKelvin = kelvin.ambient !== kelvin.task;

    return {
      total: roundLumens(total),
      perSqFt: total / area,
      layers,
      fixtures,
      kelvin,
      mixedKelvin,
      spec,
      mood,
      ceilingBoost: ceilingFactor > 1 ? Math.round((ceilingFactor - 1) * 100) : 0,
    };
  }, [room, ambiance, sqft, ceiling]);

  return (
    <section
      aria-label="Room lighting and Kelvin calculator"
      className="not-prose overflow-hidden rounded-2xl border border-ink-100 bg-surface shadow-md"
    >
      {/* Masthead */}
      <header className="border-b border-ink-100 px-6 py-8 sm:px-10">
        <p className="text-eyebrow uppercase text-brand">Bigelow Tools</p>
        <h2 className="mt-2 font-serif text-h2 text-ink-900">Lighting Layers &amp; Kelvin Calculator</h2>
        <p className="mt-2 max-w-xl text-body text-ink-600">
          One overhead light is why a room feels flat. Enter your space and get the full three-layer
          plan — lumens, fixture counts, and the right colour temperature for each.
        </p>
      </header>

      <div className="px-6 py-8 sm:px-10 sm:py-10">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)]">
          {/* Inputs */}
          <div className="space-y-6">
            <Segmented
              label="Room type"
              options={(Object.keys(ROOMS) as RoomKey[]).map((k) => ({
                key: k,
                label: ROOMS[k].label,
              }))}
              value={room}
              onChange={setRoom}
            />

            <Segmented
              label="Ambiance"
              hint={AMBIANCE[ambiance].blurb}
              columns={1}
              options={(Object.keys(AMBIANCE) as AmbianceKey[]).map((k) => ({
                key: k,
                label: AMBIANCE[k].label,
              }))}
              value={ambiance}
              onChange={setAmbiance}
            />

            <Field
              label="Room size"
              hint="Length × width."
              value={sqft}
              onChange={setSqft}
              placeholder="220"
              unit="ft²"
            />

            <Field
              label="Ceiling height"
              hint="Standard is 8 ft."
              value={ceiling}
              onChange={setCeiling}
              placeholder="8"
              unit="ft"
            />
          </div>

          {/* Results */}
          <div>
            {!result ? (
              <Empty>Enter your room size to see the full lighting blueprint.</Empty>
            ) : (
              <div className="space-y-5">
                {/* Headline total */}
                <div className="rounded-xl border border-brand/25 bg-brand/[0.07] px-5 py-5">
                  <p className="text-eyebrow uppercase text-ink-400">Target total light</p>
                  <p className="mt-1.5 font-serif text-display-lg tabular-nums text-brand">
                    {fmtNum(result.total)}
                    <span className="ml-2 font-sans text-body font-normal text-ink-600">lumens</span>
                  </p>
                  <p className="mt-2 text-body-sm text-ink-600">
                    That is about {Math.round(result.perSqFt)} lumens per square foot for a{' '}
                    {result.spec.label.toLowerCase()} styled {result.mood.label.toLowerCase()}
                    {result.ceilingBoost > 0 && (
                      <>, with {result.ceilingBoost}% added for your taller ceiling</>
                    )}
                    .
                  </p>
                </div>

                {/* Three layers */}
                <div>
                  <p className="text-eyebrow uppercase text-ink-400">The three layers</p>
                  <div className="mt-3 space-y-3">
                    <LayerCard
                      index="01"
                      name="Ambient"
                      lumens={result.layers.ambient.lumens}
                      share={result.layers.ambient.share}
                      fixtures={result.fixtures.ambient}
                      kelvin={result.kelvin.ambient}
                      description={`Your foundation — flush mounts, recessed downlights, or a central fixture spread evenly. Put this layer on a dimmer and you own the room's whole mood.`}
                    />
                    <LayerCard
                      index="02"
                      name="Task"
                      lumens={result.layers.task.lumens}
                      share={result.layers.task.share}
                      fixtures={result.fixtures.task}
                      kelvin={result.kelvin.task}
                      description={`Light where you actually do things: ${result.spec.taskExample}. Task light should fall on the work, never over your shoulder into a shadow.`}
                    />
                    <LayerCard
                      index="03"
                      name="Accent"
                      lumens={result.layers.accent.lumens}
                      share={result.layers.accent.share}
                      fixtures={result.fixtures.accent}
                      kelvin={result.kelvin.accent}
                      description={`The layer that makes a room look designed — ${result.spec.accentExample}. Skip it and the space reads functional but flat.`}
                    />
                  </div>
                </div>

                {/* Kelvin guidance */}
                <div className="rounded-xl border border-ink-100 bg-canvas px-5 py-5">
                  <p className="text-eyebrow uppercase text-ink-400">Colour temperature</p>

                  <div className="mt-3 flex flex-wrap gap-x-8 gap-y-3">
                    <div>
                      <p className="text-body-sm text-ink-400">Ambient &amp; accent</p>
                      <p className="font-serif text-h3 text-ink-900">{fmtKelvin(result.kelvin.ambient)}</p>
                    </div>
                    <div>
                      <p className="text-body-sm text-ink-400">Task</p>
                      <p className="font-serif text-h3 text-ink-900">{fmtKelvin(result.kelvin.task)}</p>
                    </div>
                  </div>

                  <div className="mt-4 border-l-2 border-brand pl-4">
                    <p className="text-body-sm font-medium text-ink-900">
                      Never mix colour temperatures in one sightline.
                    </p>
                    <p className="mt-1 text-body-sm leading-relaxed text-ink-600">
                      {result.mixedKelvin ? (
                        <>
                          The one exception is here: keep every general fixture at{' '}
                          {fmtKelvin(result.kelvin.ambient)} and reserve{' '}
                          {fmtKelvin(result.kelvin.task)} strictly for the work surface, where the
                          cooler light genuinely helps you see. Everything else in the room stays
                          warm — otherwise the space turns green and grey at night.
                        </>
                      ) : (
                        <>
                          Put every bulb in this room at {fmtKelvin(result.kelvin.ambient)}. One
                          cool bulb among warm ones is the fastest way to make an expensive room
                          look cheap, and it is the mistake we see most often.
                        </>
                      )}
                    </p>
                  </div>

                  <p className="mt-4 text-body-sm leading-relaxed text-ink-600">
                    Buy bulbs rated <strong className="font-medium text-ink-900">CRI 90+</strong> so
                    your paint colours, wood, and skin tones read true — and dim everything. A dimmed
                    warm bulb is the whole secret behind rooms that feel expensive at night.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-ink-100 bg-sunken px-6 py-4 sm:px-10">
        <p className="text-body-sm text-ink-400">
          Based on IES foot-candle standards. Fixture counts assume roughly {FIXTURE_OUTPUT.ambient}{' '}
          lm ambient, {FIXTURE_OUTPUT.task} lm task, and {FIXTURE_OUTPUT.accent} lm accent per unit —
          check the lumen rating on the box, not the wattage.
        </p>
      </footer>
    </section>
  );
}

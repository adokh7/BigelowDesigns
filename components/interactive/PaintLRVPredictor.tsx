'use client';

import { useMemo, useState } from 'react';

/**
 * PaintLRVPredictor
 * ─────────────────────────────────────────────────────────────────────────
 * Predicts how a paint colour will actually behave once it is on the wall,
 * from three things: which way the room faces, the colour's undertone, and
 * its Light Reflectance Value (LRV, 1–100).
 *
 * The model is a rule engine rather than a lookup table, built on two ideas:
 *
 *   1. Directional light has a colour cast. North light is cool and blue,
 *      south light is warm and intense, east and west swing across the day.
 *   2. A wall either COMPOUNDS that cast or BALANCES it. Cool paint under
 *      cool light compounds — which is why cool grey goes violet and dingy
 *      in a north room. Warm paint under the same light balances it.
 *
 * LRV is scored separately against a target band that shifts by orientation
 * and by the mood the user is after.
 *
 * Note: orientation assumes the Northern Hemisphere. Southern Hemisphere
 * users should swap north and south — surfaced in the UI.
 */

/* ─── Domain model ─────────────────────────────────────────────────────── */

type OrientationKey = 'north' | 'south' | 'east' | 'west';
type UndertoneKey = 'coolGray' | 'pureWhite' | 'greige' | 'warmBeige';
type VibeKey = 'airy' | 'cozy' | 'moody';
type Level = 'great' | 'caution' | 'avoid';

interface OrientationSpec {
  label: string;
  short: string;
  /** −1 = cool cast, +1 = warm cast. Drives the compound/balance rule. */
  warmth: number;
  /** How intense the light is. Drives glare risk. */
  intensity: number;
  /** Undertone warmth this room is most forgiving of. */
  desiredWarmth: number;
  /** Target LRV band per vibe. */
  lrv: Record<VibeKey, [number, number]>;
  light: string;
  dayShift?: string;
}

const ORIENTATIONS: Record<OrientationKey, OrientationSpec> = {
  north: {
    label: 'North-facing',
    short: 'north',
    warmth: -1,
    intensity: 0.35,
    desiredWarmth: 0.7,
    lrv: { airy: [65, 80], cozy: [45, 65], moody: [15, 35] },
    light:
      'cool, blue-toned and indirect. It never gets direct sun, so the light stays even all day but drains warmth out of everything it touches.',
  },
  south: {
    label: 'South-facing',
    short: 'south',
    warmth: 1,
    intensity: 1,
    desiredWarmth: -0.1,
    lrv: { airy: [55, 72], cozy: [40, 60], moody: [10, 30] },
    light:
      'bright, warm and relentless. You get direct sun for most of the day, which floods the room with golden light and washes the colour out of pale walls.',
  },
  east: {
    label: 'East-facing',
    short: 'east',
    warmth: 0.4,
    intensity: 0.7,
    desiredWarmth: 0.3,
    lrv: { airy: [60, 78], cozy: [45, 65], moody: [12, 32] },
    light:
      'warm and golden in the morning, then flat and cool from midday onward once the sun moves off.',
    dayShift:
      'Your walls will look noticeably warmer at breakfast than they do at dinner. Test any sample at both ends of the day — most people only look once, in the morning, and are surprised later.',
  },
  west: {
    label: 'West-facing',
    short: 'west',
    warmth: 0.6,
    intensity: 0.85,
    desiredWarmth: 0.1,
    lrv: { airy: [58, 75], cozy: [42, 62], moody: [12, 32] },
    light:
      'cool and slightly flat through the morning, then intensely warm and orange through the late afternoon and evening.',
    dayShift:
      'That evening light is strong enough to push a neutral wall visibly orange. Since west rooms are usually lived in at night, judge your sample by how it looks at 6pm — not at noon.',
  },
};

interface UndertoneSpec {
  label: string;
  /** −1 = cool, +1 = warm. */
  warmth: number;
  /** Typical LRV for this family, used as the slider's starting point. */
  defaultLrv: number;
  /** HSL hue and saturation used to render the live swatch. */
  hue: number;
  sat: number;
  reads: string;
}

const UNDERTONES: Record<UndertoneKey, UndertoneSpec> = {
  coolGray: {
    label: 'Cool Gray',
    warmth: -1,
    defaultLrv: 55,
    hue: 220,
    sat: 8,
    reads: 'blue or violet',
  },
  pureWhite: {
    label: 'Pure White',
    warmth: -0.1,
    defaultLrv: 84,
    hue: 40,
    sat: 3,
    reads: 'stark and clean',
  },
  greige: {
    label: 'Greige',
    warmth: 0.35,
    defaultLrv: 62,
    hue: 35,
    sat: 11,
    reads: 'balanced, neither warm nor cool',
  },
  warmBeige: {
    label: 'Warm Beige',
    warmth: 1,
    defaultLrv: 68,
    hue: 35,
    sat: 24,
    reads: 'yellow, cream or sandy',
  },
};

const VIBES: Record<VibeKey, { label: string; blurb: string }> = {
  airy: { label: 'Bright & Airy', blurb: 'Open, reflective, full of light.' },
  cozy: { label: 'Cozy & Wrapped', blurb: 'Enveloping and soft, but not dark.' },
  moody: { label: 'Muted & Moody', blurb: 'Deep, saturated, deliberately dim.' },
};

/* ─── Alternative shade catalogue ──────────────────────────────────────── */

interface Shade {
  name: string;
  lrv: number;
  warmth: number;
  note: string;
}

const SHADES: Shade[] = [
  { name: 'Soft warm white', lrv: 82, warmth: 0.6, note: 'A white with a drop of cream in it — reads clean without going blue.' },
  { name: 'Chalky plaster', lrv: 73, warmth: 0.6, note: 'Matte and slightly pink-beige. Holds its warmth even in weak light.' },
  { name: 'Creamy oat', lrv: 74, warmth: 0.85, note: 'Openly warm. The safest choice for a room that never sees sun.' },
  { name: 'Warm limestone', lrv: 66, warmth: 0.5, note: 'A soft stone neutral that stays steady through the day.' },
  { name: 'Warm greige', lrv: 61, warmth: 0.4, note: 'The workhorse neutral — enough warmth to avoid going cold.' },
  { name: 'Pale putty', lrv: 68, warmth: 0.5, note: 'Quietly warm and forgiving under changeable light.' },
  { name: 'Mushroom taupe', lrv: 48, warmth: 0.5, note: 'Deeper neutral with real presence. Absorbs glare beautifully.' },
  { name: 'Muted sage', lrv: 45, warmth: 0.15, note: 'A soft green-grey that stays calm rather than turning cold.' },
  { name: 'Cool architectural white', lrv: 84, warmth: -0.4, note: 'Crisp and gallery-like. Needs strong sun to avoid feeling clinical.' },
  { name: 'Soft dove gray', lrv: 57, warmth: -0.25, note: 'A restrained grey that works where light is genuinely warm.' },
  { name: 'Blue-gray slate', lrv: 30, warmth: -0.45, note: 'Cool and architectural. Best where sun keeps it from going flat.' },
  { name: 'Muted terracotta', lrv: 34, warmth: 0.9, note: 'Earthy and enveloping — glows under low or evening light.' },
  { name: 'Deep olive', lrv: 19, warmth: 0.3, note: 'Rich and grounding without the coldness of a charcoal.' },
  { name: 'Charcoal clay', lrv: 12, warmth: 0.35, note: 'A near-black with warmth in it, so it reads soft rather than harsh.' },
];

/* ─── Helpers ──────────────────────────────────────────────────────────── */

/** Approximates the on-screen colour of an LRV + undertone pairing. */
function swatchColor(lrv: number, u: UndertoneSpec): string {
  const lightness = Math.round(100 * Math.pow(Math.min(100, Math.max(1, lrv)) / 100, 0.45));
  return `hsl(${u.hue}, ${u.sat}%, ${lightness}%)`;
}

const LEVEL_STYLES: Record<Level, { chip: string; ring: string; label: string }> = {
  great: {
    chip: 'bg-forest-700/10 text-forest-700',
    ring: 'border-forest-700/25 bg-forest-700/[0.05]',
    label: 'Good match',
  },
  caution: {
    chip: 'bg-brand/10 text-brand',
    ring: 'border-brand/25 bg-brand/[0.06]',
    label: 'Proceed carefully',
  },
  avoid: {
    chip: 'bg-danger/10 text-danger',
    ring: 'border-danger/25 bg-danger/[0.05]',
    label: 'Likely to disappoint',
  },
};

/* ─── Presentational pieces ────────────────────────────────────────────── */

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
              value === o.key ? 'bg-canvas text-ink-900 shadow-xs' : 'text-ink-400 hover:text-ink-600',
            ].join(' ')}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── Main component ───────────────────────────────────────────────────── */

export default function PaintLRVPredictor() {
  const [orientation, setOrientation] = useState<OrientationKey>('north');
  const [vibe, setVibe] = useState<VibeKey>('airy');
  const [undertone, setUndertone] = useState<UndertoneKey>('coolGray');
  const [lrv, setLrv] = useState<number>(UNDERTONES.coolGray.defaultLrv);
  const [touchedLrv, setTouchedLrv] = useState(false);

  /** Switching family resets the LRV unless the user has taken manual control. */
  function pickUndertone(key: UndertoneKey) {
    setUndertone(key);
    if (!touchedLrv) setLrv(UNDERTONES[key].defaultLrv);
  }

  const result = useMemo(() => {
    const o = ORIENTATIONS[orientation];
    const u = UNDERTONES[undertone];
    const [lo, hi] = o.lrv[vibe];

    /* ── Undertone: does this wall compound the room's cast, or balance it? */
    const compound = o.warmth * u.warmth; // > 0 means same direction
    let undertoneLevel: Level = 'great';
    let undertoneVerdict = '';

    if (orientation === 'north' && u.warmth < -0.5) {
      // The headline failure case.
      undertoneLevel = 'avoid';
      undertoneVerdict = `This is the pairing that goes wrong most often. North light is already blue, and a cool grey has nothing warm in it to push back — so the two compound. On the wall it will read dingy, and in the corners and shadows it will turn distinctly violet or purple. It will not look like the swatch, and no amount of lighting fully rescues it.`;
    } else if (orientation === 'north' && u.warmth < 0.2) {
      undertoneLevel = 'caution';
      undertoneVerdict = `North light will pull whatever warmth this colour has straight out of it. A near-neutral like this tends to land colder and greyer on the wall than it looks on the card — clean in the middle of the day, a little bleak by late afternoon.`;
    } else if (orientation === 'north') {
      undertoneLevel = 'great';
      undertoneVerdict = `This is the right instinct for a north room. The warmth in the colour counteracts the blue cast coming through the window, so the wall holds its character instead of going grey. Expect it to read slightly cooler and more muted than the swatch — that is the light doing its job, not the paint failing.`;
    } else if (orientation === 'south' && u.warmth > 0.7) {
      undertoneLevel = 'caution';
      undertoneVerdict = `South light is warm, and so is this colour, so the two amplify each other. In full afternoon sun expect it to read considerably more yellow than the swatch — sometimes to the point of looking sallow. It is livable, but if you dislike yellow walls, step the warmth down.`;
    } else if (orientation === 'south' && u.warmth < -0.5) {
      undertoneLevel = 'great';
      undertoneVerdict = `A smart pairing. All that warm southern sun neutralises the coolness, so a grey that would look bleak elsewhere lands balanced and architectural here. South rooms are one of the few places cool greys genuinely behave.`;
    } else if (compound > 0.35) {
      undertoneLevel = 'caution';
      undertoneVerdict = `Your light and your paint lean the same direction, so they reinforce each other. Expect the colour to read warmer and more saturated on the wall than it does on the card, especially late in the day.`;
    } else {
      undertoneLevel = 'great';
      undertoneVerdict = `The undertone sits comfortably against this room's light — warm enough not to go cold, restrained enough not to turn yellow when the sun is on it.`;
    }

    /* ── LRV: is it inside the band this room and mood can carry? */
    let lrvLevel: Level = 'great';
    let lrvVerdict = '';
    const glare = o.intensity > 0.8 && lrv > 78;

    if (glare) {
      lrvLevel = 'avoid';
      lrvVerdict = `At LRV ${lrv} this colour reflects most of the light that hits it — and a ${o.short} room delivers a lot of light. In direct sun the wall will glare badly enough to be genuinely uncomfortable to sit opposite, and the colour will bleach out to plain white. Drop into the ${lo}–${hi} range so the wall absorbs some of that intensity instead of throwing it back at you.`;
    } else if (lrv < lo - 12) {
      lrvLevel = orientation === 'north' && vibe !== 'moody' ? 'avoid' : 'caution';
      lrvVerdict =
        orientation === 'north' && vibe !== 'moody'
          ? `LRV ${lrv} is far too low for a ${o.short} room aiming for ${VIBES[vibe].label.toLowerCase()}. With so little natural light coming in and a wall this absorbent, the room will read like a cave from mid-afternoon onward. For this look you want LRV above 60 — ideally in the ${lo}–${hi} band.`
          : `At LRV ${lrv} this is darker than the ${lo}–${hi} band that usually delivers ${VIBES[vibe].label.toLowerCase()} in a ${o.short} room. Workable if you commit to it with good layered lighting, but it will feel dimmer than you are picturing.`;
    } else if (lrv < lo) {
      lrvLevel = 'caution';
      lrvVerdict = `LRV ${lrv} sits just under the ${lo}–${hi} band for this look. Expect the room to feel a shade more enclosed than you intend — fine if you like that, worth nudging up if you do not.`;
    } else if (lrv > hi + 10) {
      lrvLevel = 'caution';
      lrvVerdict = `LRV ${lrv} is brighter than the ${lo}–${hi} band this look usually needs. The room will feel light, but a colour this reflective tends to lose its character and read as plain white once it is up on four walls.`;
    } else if (lrv > hi) {
      lrvLevel = 'caution';
      lrvVerdict = `LRV ${lrv} sits a touch above the ${lo}–${hi} band. Still workable, though the colour will show less of itself than the swatch suggests.`;
    } else {
      lrvLevel = 'great';
      lrvVerdict = `LRV ${lrv} lands inside the ${lo}–${hi} range that suits a ${o.short} room going for ${VIBES[vibe].label.toLowerCase()} — bright enough to feel intentional, absorbent enough to keep its colour.`;
    }

    /* ── Overall verdict is the worse of the two. */
    const rank: Record<Level, number> = { great: 0, caution: 1, avoid: 2 };
    const overall: Level =
      rank[undertoneLevel] >= rank[lrvLevel] ? undertoneLevel : lrvLevel;

    /* ── Safer alternatives: closest fit on warmth and LRV band. */
    const mid = (lo + hi) / 2;
    const alternatives = SHADES.map((s) => {
      const warmthFit = 1 - Math.abs(s.warmth - o.desiredWarmth) / 2;
      const inBand = s.lrv >= lo && s.lrv <= hi ? 1 : 0;
      const lrvFit = 1 - Math.min(1, Math.abs(s.lrv - mid) / 45);
      return { shade: s, score: warmthFit * 1.1 + lrvFit + inBand * 0.6 };
    })
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map((x) => x.shade);

    return {
      o,
      u,
      overall,
      undertoneLevel,
      undertoneVerdict,
      lrvLevel,
      lrvVerdict,
      band: [lo, hi] as const,
      alternatives,
      glare,
    };
  }, [orientation, vibe, undertone, lrv]);

  const styles = LEVEL_STYLES[result.overall];

  return (
    <section
      aria-label="Paint LRV and light predictor"
      className="not-prose overflow-hidden rounded-2xl border border-ink-100 bg-surface shadow-md"
    >
      {/* Masthead */}
      <header className="border-b border-ink-100 px-6 py-8 sm:px-10">
        <p className="text-eyebrow uppercase text-brand">Bigelow Tools</p>
        <h2 className="mt-2 font-serif text-h2 text-ink-900">Paint LRV &amp; Light Predictor</h2>
        <p className="mt-2 max-w-xl text-body text-ink-600">
          The same white looks warm in one room and grey in the next. Tell us which way your room
          faces and we will tell you how your colour will actually behave on the wall.
        </p>
      </header>

      <div className="px-6 py-8 sm:px-10 sm:py-10">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)]">
          {/* ── Inputs ── */}
          <div className="space-y-6">
            <Segmented
              label="Which way does the room face?"
              hint="Northern Hemisphere — swap north and south if you are below the equator."
              options={(Object.keys(ORIENTATIONS) as OrientationKey[]).map((k) => ({
                key: k,
                label: ORIENTATIONS[k].label,
              }))}
              value={orientation}
              onChange={setOrientation}
            />

            <Segmented
              label="What are you going for?"
              hint={VIBES[vibe].blurb}
              columns={1}
              options={(Object.keys(VIBES) as VibeKey[]).map((k) => ({
                key: k,
                label: VIBES[k].label,
              }))}
              value={vibe}
              onChange={setVibe}
            />

            <Segmented
              label="Paint undertone family"
              options={(Object.keys(UNDERTONES) as UndertoneKey[]).map((k) => ({
                key: k,
                label: UNDERTONES[k].label,
              }))}
              value={undertone}
              onChange={pickUndertone}
            />

            {/* LRV slider + live swatch */}
            <div>
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-body-sm font-medium text-ink-900">
                  Light Reflectance Value
                </span>
                <span className="font-serif text-h3 tabular-nums text-ink-900">{lrv}</span>
              </div>
              <span className="mt-0.5 block text-body-sm text-ink-400">
                Printed on the back of most paint cards. 1 is black, 100 is pure white.
              </span>

              <div className="mt-4 flex items-center gap-4">
                <div
                  aria-hidden
                  className="h-14 w-14 shrink-0 rounded-lg border border-ink-100 shadow-xs transition-colors duration-smooth"
                  style={{ backgroundColor: swatchColor(lrv, result.u) }}
                />
                <input
                  type="range"
                  min={1}
                  max={100}
                  value={lrv}
                  aria-label="Light Reflectance Value"
                  onChange={(e) => {
                    setLrv(Number(e.target.value));
                    setTouchedLrv(true);
                  }}
                  className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-sunken accent-brand
                             focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
                />
              </div>

              <p className="mt-3 text-body-sm text-ink-400">
                Target for this room and look:{' '}
                <strong className="font-medium text-ink-900">
                  LRV {result.band[0]}–{result.band[1]}
                </strong>
              </p>
            </div>
          </div>

          {/* ── Results ── */}
          <div className="space-y-5">
            {/* Verdict */}
            <div className={['rounded-xl border px-5 py-5', styles.ring].join(' ')}>
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={['rounded-full px-2.5 py-1 text-eyebrow uppercase', styles.chip].join(' ')}
                >
                  {styles.label}
                </span>
                <span className="text-body-sm text-ink-400">
                  {result.u.label} · LRV {lrv} · {result.o.label}
                </span>
              </div>

              <h3 className="mt-4 font-serif text-h3 text-ink-900">
                How this paint will actually behave in your room
              </h3>

              <p className="mt-3 text-body leading-relaxed text-ink-600">
                Your light is {result.o.light}
              </p>
              <p className="mt-3 text-body leading-relaxed text-ink-600">
                {result.undertoneVerdict}
              </p>
              <p className="mt-3 text-body leading-relaxed text-ink-600">{result.lrvVerdict}</p>

              {result.o.dayShift && (
                <p className="mt-4 border-l-2 border-brand pl-4 text-body-sm leading-relaxed text-ink-600">
                  <strong className="font-medium text-ink-900">Across the day —</strong>{' '}
                  {result.o.dayShift}
                </p>
              )}
            </div>

            {/* Alternatives */}
            <div>
              <p className="text-eyebrow uppercase text-ink-400">
                Safer choices for a {result.o.short}-facing room
              </p>
              <div className="mt-3 space-y-3">
                {result.alternatives.map((s) => (
                  <div
                    key={s.name}
                    className="flex gap-4 rounded-xl border border-ink-100 bg-canvas p-4"
                  >
                    <div
                      aria-hidden
                      className="h-12 w-12 shrink-0 rounded-lg border border-ink-100"
                      style={{
                        backgroundColor: swatchColor(
                          s.lrv,
                          s.warmth > 0.55
                            ? UNDERTONES.warmBeige
                            : s.warmth > 0.2
                              ? UNDERTONES.greige
                              : s.warmth > -0.2
                                ? UNDERTONES.pureWhite
                                : UNDERTONES.coolGray,
                        ),
                      }}
                    />
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-baseline gap-x-3">
                        <h4 className="font-serif text-body-lg text-ink-900">{s.name}</h4>
                        <span className="text-body-sm tabular-nums text-ink-400">LRV {s.lrv}</span>
                      </div>
                      <p className="mt-1 text-body-sm leading-relaxed text-ink-600">{s.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className="border-l-2 border-brand-light pl-4 text-body-sm leading-relaxed text-ink-600">
              Whatever you choose, buy a sample pot and paint a large sheet of card — not the wall
              itself. Move it to each wall and look at it in the morning, at midday and at night
              before you commit. Every colour lies on a small chip.
            </p>
          </div>
        </div>
      </div>

      <footer className="border-t border-ink-100 bg-sunken px-6 py-4 sm:px-10">
        <p className="text-body-sm text-ink-400">
          LRV measures how much light a colour reflects, from 1 (absorbs almost everything) to 100
          (reflects almost everything). Most manufacturers print it on the back of the card or list
          it online.
        </p>
      </footer>
    </section>
  );
}

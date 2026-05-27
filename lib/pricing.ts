/**
 * Budget Estimator — pricing matrix & affiliate catalog.
 * All amounts in USD. UK conversion handled at render time.
 */

export type RoomType =
  | 'kitchen'
  | 'living-room'
  | 'bedroom'
  | 'bathroom'
  | 'home-office'
  | 'outdoor';

export type QualityTier = 'budget' | 'mid' | 'luxury';
export type RoomSize = 'small' | 'medium' | 'large';

export const ROOM_LABELS: Record<RoomType, string> = {
  kitchen: 'Kitchen',
  'living-room': 'Living Room',
  bedroom: 'Bedroom',
  bathroom: 'Bathroom',
  'home-office': 'Home Office',
  outdoor: 'Outdoor',
};

export const QUALITY_LABELS: Record<QualityTier, { label: string; sublabel: string }> = {
  budget:  { label: 'Budget',    sublabel: 'IKEA · Wayfair house brands' },
  mid:     { label: 'Mid-range', sublabel: 'Article · West Elm · Burrow' },
  luxury:  { label: 'Luxury',    sublabel: 'Maiden Home · Roche Bobois' },
};

export const SIZE_LABELS: Record<RoomSize, { label: string; sqft: string }> = {
  small:  { label: 'Small',  sqft: 'under 150 sq ft' },
  medium: { label: 'Medium', sqft: '150 – 300 sq ft' },
  large:  { label: 'Large',  sqft: 'over 300 sq ft' },
};

// Base budget per room (mid-range, medium-sized) — USD
const ROOM_BASE: Record<RoomType, number> = {
  kitchen:       8_000,
  'living-room': 3_500,
  bedroom:       2_500,
  bathroom:      4_500,
  'home-office': 1_800,
  outdoor:       2_000,
};

const QUALITY_MULTIPLIER: Record<QualityTier, number> = {
  budget: 0.5,
  mid:    1.0,
  luxury: 2.5,
};

const SIZE_MULTIPLIER: Record<RoomSize, number> = {
  small:  0.8,
  medium: 1.0,
  large:  1.4,
};

export interface BudgetEstimate {
  total: number;
  rangeLow: number;
  rangeHigh: number;
  breakdown: { furniture: number; finishes: number; labor: number };
}

export function calculateBudget(
  room: RoomType,
  quality: QualityTier,
  size: RoomSize,
): BudgetEstimate {
  const base = ROOM_BASE[room] * QUALITY_MULTIPLIER[quality] * SIZE_MULTIPLIER[size];

  // Allocation varies by room type — kitchens/baths skew toward labor & finishes
  const labourShare = room === 'kitchen' || room === 'bathroom' ? 0.4 : 0.15;
  const finishesShare = room === 'kitchen' || room === 'bathroom' ? 0.25 : 0.15;
  const furnitureShare = 1 - labourShare - finishesShare;

  const total = Math.round(base / 50) * 50; // round to nearest $50
  return {
    total,
    rangeLow: Math.round((total * 0.85) / 50) * 50,
    rangeHigh: Math.round((total * 1.2) / 50) * 50,
    breakdown: {
      furniture: Math.round((total * furnitureShare) / 50) * 50,
      finishes:  Math.round((total * finishesShare)  / 50) * 50,
      labor:     Math.round((total * labourShare)    / 50) * 50,
    },
  };
}

// ──────────────────────────────────────────────────────────────
// Affiliate product catalog — 3 picks per (room, quality)
// In production, this would import from content/products/*.json
// ──────────────────────────────────────────────────────────────
export interface AffiliatePick {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  url: string;
  network: string;
}

type Catalog = Record<RoomType, Record<QualityTier, AffiliatePick[]>>;

export const CATALOG: Catalog = {
  'living-room': {
    budget: [
      { id: 'ikea-kivik',   name: 'Kivik 3-Seat Sofa',     brand: 'IKEA',   price: 699,  image: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=400&q=80', url: 'https://ikea.com/kivik?ref=bigelow',     network: 'IKEA' },
      { id: 'wayfair-rug',  name: 'Hand-loomed Wool Rug',  brand: 'Wayfair',price: 249,  image: 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=400&q=80', url: 'https://wayfair.com/rug?ref=bigelow',     network: 'Wayfair' },
      { id: 'ikea-lack',    name: 'Lack Coffee Table',     brand: 'IKEA',   price: 49,   image: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=400&q=80', url: 'https://ikea.com/lack?ref=bigelow',      network: 'IKEA' },
    ],
    mid: [
      { id: 'burrow-nomad', name: 'Nomad 3-Seat Sofa',     brand: 'Burrow', price: 1695, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80', url: 'https://burrow.com/nomad?ref=bigelow',   network: 'Burrow' },
      { id: 'article-sven', name: 'Sven Leather Sofa',     brand: 'Article',price: 1799, image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=400&q=80', url: 'https://article.com/sven?ref=bigelow',  network: 'Article' },
      { id: 'westelm-rug',  name: 'Souk Wool Rug 8×10',    brand: 'West Elm',price: 599, image: 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=400&q=80', url: 'https://westelm.com/souk?ref=bigelow',   network: 'West Elm' },
    ],
    luxury: [
      { id: 'maiden-sofa',  name: 'Sullivan Sectional',    brand: 'Maiden Home', price: 5800, image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&q=80', url: 'https://maidenhome.com/sullivan?ref=bigelow', network: 'Maiden Home' },
      { id: 'rh-chair',     name: 'Cloud Modular Lounge',  brand: 'RH',          price: 4200, image: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=400&q=80', url: 'https://rh.com/cloud?ref=bigelow',           network: 'RH' },
      { id: 'cb2-rug',      name: 'Distressed Persian Rug',brand: 'CB2',         price: 1499, image: 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=400&q=80', url: 'https://cb2.com/persian?ref=bigelow',         network: 'CB2' },
    ],
  },
  kitchen: {
    budget: [
      { id: 'ikea-island',  name: 'Vadholma Kitchen Island', brand: 'IKEA', price: 549, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80', url: 'https://ikea.com/island?ref=bigelow', network: 'IKEA' },
      { id: 'ikea-stool',   name: 'Bergmund Bar Stool',      brand: 'IKEA', price: 99,  image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&q=80', url: 'https://ikea.com/bergmund?ref=bigelow', network: 'IKEA' },
      { id: 'lowes-faucet', name: 'Brushed Brass Faucet',    brand: 'Lowes', price: 189, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80', url: 'https://lowes.com/faucet?ref=bigelow', network: 'Lowes' },
    ],
    mid: [
      { id: 'westelm-island', name: 'Mid-Century Kitchen Island', brand: 'West Elm', price: 1299, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80', url: 'https://westelm.com/island?ref=bigelow', network: 'West Elm' },
      { id: 'cb2-stool',    name: 'Roadhouse Counter Stool',    brand: 'CB2',      price: 299,  image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&q=80', url: 'https://cb2.com/stool?ref=bigelow', network: 'CB2' },
      { id: 'kohler-faucet',name: 'Purist Pull-down Faucet',   brand: 'Kohler',   price: 549,  image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80', url: 'https://kohler.com/purist?ref=bigelow', network: 'Kohler' },
    ],
    luxury: [
      { id: 'rh-island',    name: 'Parisian Marble Island',      brand: 'RH',     price: 8200, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80', url: 'https://rh.com/island?ref=bigelow', network: 'RH' },
      { id: 'molteni-stool',name: 'D.154.5 Counter Stool',      brand: 'Molteni',price: 1899, image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&q=80', url: 'https://molteni.com?ref=bigelow', network: 'Molteni' },
      { id: 'waterworks-fct',name: 'Henry Articulated Faucet',  brand: 'Waterworks', price: 1450, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80', url: 'https://waterworks.com?ref=bigelow', network: 'Waterworks' },
    ],
  },
  bedroom: {
    budget: [
      { id: 'ikea-malm',   name: 'Malm Bed Frame Queen', brand: 'IKEA', price: 249, image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&q=80', url: 'https://ikea.com/malm?ref=bigelow', network: 'IKEA' },
      { id: 'target-bed',  name: 'Linen Duvet Set',      brand: 'Target', price: 99, image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&q=80', url: 'https://target.com/duvet?ref=bigelow', network: 'Target' },
      { id: 'ikea-lamp',   name: 'Skurup Pendant Lamp',  brand: 'IKEA', price: 39,  image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&q=80', url: 'https://ikea.com/skurup?ref=bigelow', network: 'IKEA' },
    ],
    mid: [
      { id: 'article-bed', name: 'Nera Walnut Bed',      brand: 'Article', price: 1299, image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&q=80', url: 'https://article.com/nera?ref=bigelow', network: 'Article' },
      { id: 'parachute',   name: 'Linen Sheet Set',      brand: 'Parachute', price: 269, image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&q=80', url: 'https://parachutehome.com?ref=bigelow', network: 'Parachute' },
      { id: 'westelm-lamp',name: 'Sculptural Glass Lamp',brand: 'West Elm', price: 199, image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&q=80', url: 'https://westelm.com/lamp?ref=bigelow', network: 'West Elm' },
    ],
    luxury: [
      { id: 'maiden-bed',  name: 'Dune Upholstered Bed', brand: 'Maiden Home', price: 4800, image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&q=80', url: 'https://maidenhome.com/dune?ref=bigelow', network: 'Maiden Home' },
      { id: 'frette',      name: 'Egyptian Cotton Set',  brand: 'Frette', price: 1200, image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&q=80', url: 'https://frette.com?ref=bigelow', network: 'Frette' },
      { id: 'flos-lamp',   name: 'IC Lights T2 Pendant', brand: 'Flos', price: 1395, image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&q=80', url: 'https://flos.com/ic?ref=bigelow', network: 'Flos' },
    ],
  },
  bathroom: {
    budget:  [],
    mid:     [],
    luxury:  [],
  },
  'home-office': {
    budget:  [],
    mid:     [],
    luxury:  [],
  },
  outdoor: {
    budget:  [],
    mid:     [],
    luxury:  [],
  },
};

export function getAffiliatePicks(
  room: RoomType,
  quality: QualityTier,
): AffiliatePick[] {
  const picks = CATALOG[room]?.[quality] ?? [];
  if (picks.length > 0) return picks;
  // Fallback: try adjacent quality tier
  const fallback = quality === 'luxury' ? 'mid' : quality === 'mid' ? 'budget' : 'mid';
  return CATALOG[room]?.[fallback] ?? [];
}

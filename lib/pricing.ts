import { ServiceCategory } from './types';

export const services: ServiceCategory[] = [
  {
    slug: 'electrical',
    icon: '⚡',
    color: '#F59E0B',
    items: [
      { key: 'socket', price: 300, priceRange: [300, 800] },
      { key: 'lighting', price: 400, priceRange: [400, 1500] },
      { key: 'breaker', price: 500, priceRange: [500, 2000] },
      { key: 'fan', price: 600, priceRange: [600, 1500] },
      { key: 'rewire', price: 2000, priceRange: [2000, 8000] },
      { key: 'inspection', price: 500, priceRange: [500, 1500] },
      { key: 'ev_charger', price: 5000, priceRange: [5000, 15000], isHighlight: true },
    ],
  },
  {
    slug: 'ac',
    icon: '❄️',
    color: '#3B82F6',
    items: [
      { key: 'ac_clean', price: 400, priceRange: [400, 800] },
      { key: 'ac_install', price: 2500, priceRange: [2500, 6000] },
      { key: 'ac_repair', price: 500, priceRange: [500, 3000] },
      { key: 'ac_inspect', price: 300, priceRange: [300, 600] },
      { key: 'fridge', price: 500, priceRange: [500, 3000] },
      { key: 'washer', price: 500, priceRange: [500, 3000] },
      { key: 'heater', price: 400, priceRange: [400, 2000] },
    ],
  },
  {
    slug: 'cctv',
    icon: '📹',
    color: '#8B5CF6',
    items: [
      { key: 'cctv_consult', price: 0, priceRange: [0, 0], isFree: true },
      { key: 'cctv_home', price: 3000, priceRange: [3000, 8000] },
      { key: 'cctv_office', price: 5000, priceRange: [5000, 25000] },
      { key: 'cctv_repair', price: 500, priceRange: [500, 2000] },
      { key: 'cctv_inspect', price: 300, priceRange: [300, 800] },
      { key: 'dvr_setup', price: 500, priceRange: [500, 1500] },
      { key: 'remote_view', price: 300, priceRange: [300, 800] },
    ],
  },
  {
    slug: 'general',
    icon: '🔧',
    color: '#10B981',
    items: [
      { key: 'door', price: 250, priceRange: [250, 1500] },
      { key: 'plumbing', price: 300, priceRange: [300, 2000] },
      { key: 'furniture', price: 300, priceRange: [300, 1500] },
      { key: 'paint', price: 500, priceRange: [500, 3000] },
      { key: 'mount', price: 250, priceRange: [250, 800] },
    ],
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((s) => s.slug === slug);
}

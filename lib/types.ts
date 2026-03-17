export type Lang = 'en' | 'th' | 'zh';

export type ServiceSlug = 'electrical' | 'ac' | 'cctv' | 'general';

export interface ServiceItem {
  key: string;
  price: number;
  priceRange: [number, number];
  isFree?: boolean;
  isHighlight?: boolean;
}

export interface ServiceCategory {
  slug: ServiceSlug;
  icon: string;
  color: string;
  items: ServiceItem[];
}

export interface GalleryItem {
  id: string;
  category: ServiceSlug;
  descKey: string;
}

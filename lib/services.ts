import { ServiceSlug, GalleryItem } from './types';

export const serviceCategories: { slug: ServiceSlug; icon: string; color: string }[] = [
  { slug: 'electrical', icon: '\u26A1', color: '#F59E0B' },
  { slug: 'ac', icon: '\u2744\uFE0F', color: '#3B82F6' },
  { slug: 'cctv', icon: '\uD83D\uDCF9', color: '#8B5CF6' },
  { slug: 'general', icon: '\uD83D\uDD27', color: '#10B981' },
];

export const validSlugs: ServiceSlug[] = ['electrical', 'ac', 'cctv', 'general'];
export const validLangs = ['en', 'th', 'zh'] as const;

export function isValidLang(lang: string): lang is 'en' | 'th' | 'zh' {
  return validLangs.includes(lang as 'en' | 'th' | 'zh');
}

export function isValidSlug(slug: string): slug is ServiceSlug {
  return validSlugs.includes(slug as ServiceSlug);
}

export const galleryItems: GalleryItem[] = [
  { id: '1', category: 'electrical', descKey: 'gallery_electrical_1' },
  { id: '2', category: 'electrical', descKey: 'gallery_electrical_2' },
  { id: '3', category: 'electrical', descKey: 'gallery_electrical_3' },
  { id: '4', category: 'ac', descKey: 'gallery_ac_1' },
  { id: '5', category: 'ac', descKey: 'gallery_ac_2' },
  { id: '6', category: 'ac', descKey: 'gallery_ac_3' },
  { id: '7', category: 'cctv', descKey: 'gallery_cctv_1' },
  { id: '8', category: 'cctv', descKey: 'gallery_cctv_2' },
  { id: '9', category: 'cctv', descKey: 'gallery_cctv_3' },
  { id: '10', category: 'general', descKey: 'gallery_general_1' },
  { id: '11', category: 'general', descKey: 'gallery_general_2' },
  { id: '12', category: 'general', descKey: 'gallery_general_3' },
];

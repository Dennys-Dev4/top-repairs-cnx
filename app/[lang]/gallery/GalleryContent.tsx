'use client';

import { useState } from 'react';
import { Lang, ServiceSlug } from '@/lib/types';
import { t, getServiceName } from '@/lib/translations';
import { galleryItems, serviceCategories } from '@/lib/services';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';

const categoryColors: Record<ServiceSlug, string> = {
  electrical: '#F59E0B',
  ac: '#3B82F6',
  cctv: '#8B5CF6',
  general: '#10B981',
};

const categoryIcons: Record<ServiceSlug, string> = {
  electrical: '\u26A1',
  ac: '\u2744\uFE0F',
  cctv: '\uD83D\uDCF9',
  general: '\uD83D\uDD27',
};

export default function GalleryContent({ lang }: { lang: Lang }) {
  const [filter, setFilter] = useState<ServiceSlug | 'all'>('all');

  const filtered = filter === 'all' ? galleryItems : galleryItems.filter((i) => i.category === filter);

  return (
    <section className="section-padding px-4 relative overflow-hidden">
      <div className="orb orb-purple w-[350px] h-[350px] top-[-5%] left-[-10%] opacity-15" />
      <div className="orb orb-blue w-[250px] h-[250px] bottom-[10%] right-[-8%] opacity-15" />
      <div className="max-w-7xl mx-auto relative z-10">
        <AnimateOnScroll>
          <div className="text-center mb-16">
            <p className="section-label mb-5">{t(lang, 'gallery_title')}</p>
            <h1 className="font-[family-name:var(--font-playfair)] heading-lg mb-5 tracking-tight">
              {t(lang, 'gallery_title')}
            </h1>
            <p className="text-body-lg max-w-2xl mx-auto">{t(lang, 'gallery_desc')}</p>
          </div>
        </AnimateOnScroll>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-3 rounded-2xl text-[15px] font-medium transition-all duration-300 min-h-[48px] cursor-pointer ${
              filter === 'all' ? 'bg-orange text-white shadow-lg shadow-orange/20' : 'bg-navy text-text-secondary border border-border hover:text-text-primary hover:border-navy-lighter'
            }`}
          >
            {t(lang, 'filter_all')}
          </button>
          {serviceCategories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setFilter(cat.slug)}
              className={`px-6 py-3 rounded-2xl text-[15px] font-medium transition-all duration-300 min-h-[48px] cursor-pointer ${
                filter === cat.slug ? 'bg-orange text-white shadow-lg shadow-orange/20' : 'bg-navy text-text-secondary border border-border hover:text-text-primary hover:border-navy-lighter'
              }`}
            >
              {cat.icon} {getServiceName(lang, cat.slug)}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <AnimateOnScroll key={item.id}>
              <div className="card card-lift !p-0 overflow-hidden group">
                <div
                  className="h-56 flex items-center justify-center text-[72px] relative"
                  style={{ backgroundColor: `${categoryColors[item.category]}06` }}
                >
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      background: `radial-gradient(circle at center, ${categoryColors[item.category]}15 0%, transparent 70%)`,
                    }}
                  />
                  <span className="relative z-10">{categoryIcons[item.category]}</span>
                </div>
                <div className="p-6">
                  <span
                    className="inline-block px-3 py-1.5 rounded-lg text-[13px] font-medium mb-3"
                    style={{
                      backgroundColor: `${categoryColors[item.category]}15`,
                      color: categoryColors[item.category],
                    }}
                  >
                    {getServiceName(lang, item.category)}
                  </span>
                  <p className="text-text-secondary text-[15px] leading-relaxed">{t(lang, item.descKey)}</p>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

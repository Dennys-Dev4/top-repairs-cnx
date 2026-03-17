'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Lang } from '@/lib/types';
import { t, getServiceName, getItemName } from '@/lib/translations';
import { services } from '@/lib/pricing';

export default function PriceCalculator({ lang }: { lang: Lang }) {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  const category = selectedCategory !== null ? services[selectedCategory] : null;
  const item = category && selectedItem !== null ? category.items[selectedItem] : null;

  return (
    <div className="card !p-10 md:!p-12">
      <p className="section-label">{t(lang, 'get_estimate')}</p>
      <h3 className="font-[family-name:var(--font-playfair)] heading-md mb-10 tracking-tight">
        {t(lang, 'get_estimate')}
      </h3>

      {/* Step 1 */}
      <div className="mb-10">
        <p className="text-[13px] font-semibold uppercase tracking-wider text-text-muted mb-5">{t(lang, 'select_service')}</p>
        <div className="grid grid-cols-2 gap-4">
          {services.map((s, i) => (
            <button
              key={s.slug}
              onClick={() => { setSelectedCategory(i); setSelectedItem(null); }}
              className={`p-6 rounded-2xl border text-left transition-all duration-400 cursor-pointer ${
                selectedCategory === i
                  ? 'border-orange/40 bg-orange/[0.06] shadow-lg shadow-orange/5'
                  : 'border-border bg-page-bg hover:border-border-hover hover:bg-card-hover'
              }`}
            >
              <span className="text-[32px] block mb-3">{s.icon}</span>
              <span className="text-[14px] font-semibold text-text-primary block">{getServiceName(lang, s.slug)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Step 2 */}
      {category && (
        <div className="mb-10">
          <p className="text-[13px] font-semibold uppercase tracking-wider text-text-muted mb-5">{t(lang, 'describe_problem')}</p>
          <div className="space-y-3">
            {category.items.map((itm, i) => (
              <button
                key={itm.key}
                onClick={() => setSelectedItem(i)}
                className={`w-full p-5 rounded-2xl border text-left text-[15px] transition-all duration-300 cursor-pointer ${
                  selectedItem === i
                    ? 'border-orange/40 bg-orange/[0.06] text-text-primary'
                    : 'border-border bg-page-bg text-text-secondary hover:border-border-hover'
                }`}
              >
                {getItemName(lang, itm.key)}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 3 */}
      {item && (
        <div className="bg-page-bg border border-border rounded-2xl p-10 mb-8 text-center">
          {item.isFree ? (
            <div className="text-[40px] font-bold text-green">{t(lang, 'free')}</div>
          ) : (
            <>
              <p className="text-[12px] font-semibold uppercase tracking-widest text-text-muted mb-4">{t(lang, 'starting_from')}</p>
              <div className="text-[40px] font-bold text-orange tracking-tight">
                {'\u0E3F'}{item.priceRange[0].toLocaleString()} — {'\u0E3F'}{item.priceRange[1].toLocaleString()}
              </div>
            </>
          )}
          <p className="text-text-muted text-[13px] mt-5">{t(lang, 'price_disclaimer')}</p>
        </div>
      )}

      {item && (
        <Link href={`/${lang}/contact`} className="btn-primary w-full text-center text-[16px]">
          {t(lang, 'get_exact_quote')}
        </Link>
      )}
    </div>
  );
}

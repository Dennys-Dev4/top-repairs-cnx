'use client';

import { useState } from 'react';

interface FAQItem {
  q: string;
  a: string;
}

export default function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <div key={i} className="card overflow-hidden !p-0">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-center justify-between px-7 py-6 text-left min-h-[60px] cursor-pointer hover:bg-white/[0.015] transition-colors duration-300"
          >
            <span className="font-medium text-text-primary text-[16px] pr-6 leading-relaxed">{item.q}</span>
            <div className={`w-8 h-8 rounded-full border border-border flex items-center justify-center shrink-0 transition-all duration-400 ${openIndex === i ? 'bg-orange border-orange rotate-180' : ''}`}>
              <svg
                className={`w-4 h-4 transition-colors duration-300 ${openIndex === i ? 'text-white' : 'text-text-muted'}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </button>
          <div
            className={`grid transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              openIndex === i ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
            }`}
          >
            <div className="overflow-hidden">
              <div className="px-7 pb-7 text-text-secondary text-[15px] leading-[1.85]">{item.a}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

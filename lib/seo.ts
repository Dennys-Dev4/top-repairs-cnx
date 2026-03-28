import { Lang, ServiceSlug } from './types';
import { PHONE } from './contact';
import { t } from './translations';

const baseUrl = 'https://toprepairscnx.com';

interface PageMeta {
  title: string;
  description: string;
}

const pageMeta: Record<string, Record<Lang, PageMeta>> = {
  home: {
    en: {
      title: 'Top Repairs CNX \u2014 Trusted Handyman in Chiang Mai & Lamphun | Electrical, AC, CCTV',
      description: 'Professional repair services in Chiang Mai and Lamphun. Electrical, AC, CCTV installation, and general repairs. 10+ years experience. Book online or call now!',
    },
    th: {
      title: 'Top Repairs CNX \u2014 \u0E0A\u0E48\u0E32\u0E07\u0E0B\u0E48\u0E2D\u0E21\u0E21\u0E37\u0E2D\u0E2D\u0E32\u0E0A\u0E35\u0E1E \u0E40\u0E0A\u0E35\u0E22\u0E07\u0E43\u0E2B\u0E21\u0E48 & \u0E25\u0E33\u0E1E\u0E39\u0E19 | \u0E44\u0E1F\u0E1F\u0E49\u0E32 \u0E41\u0E2D\u0E23\u0E4C \u0E01\u0E25\u0E49\u0E2D\u0E07\u0E27\u0E07\u0E08\u0E23\u0E1B\u0E34\u0E14',
      description: '\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E0B\u0E48\u0E2D\u0E21\u0E21\u0E37\u0E2D\u0E2D\u0E32\u0E0A\u0E35\u0E1E \u0E40\u0E0A\u0E35\u0E22\u0E07\u0E43\u0E2B\u0E21\u0E48\u0E41\u0E25\u0E30\u0E25\u0E33\u0E1E\u0E39\u0E19 \u0E07\u0E32\u0E19\u0E44\u0E1F\u0E1F\u0E49\u0E32 \u0E41\u0E2D\u0E23\u0E4C \u0E01\u0E25\u0E49\u0E2D\u0E07\u0E27\u0E07\u0E08\u0E23\u0E1B\u0E34\u0E14 \u0E41\u0E25\u0E30\u0E07\u0E32\u0E19\u0E0B\u0E48\u0E2D\u0E21\u0E17\u0E31\u0E48\u0E27\u0E44\u0E1B \u0E1B\u0E23\u0E30\u0E2A\u0E1A\u0E01\u0E32\u0E23\u0E13\u0E4C\u0E01\u0E27\u0E48\u0E32 10 \u0E1B\u0E35 \u0E08\u0E2D\u0E07\u0E2D\u0E2D\u0E19\u0E44\u0E25\u0E19\u0E4C\u0E2B\u0E23\u0E37\u0E2D\u0E42\u0E17\u0E23\u0E40\u0E25\u0E22!',
    },
    zh: {
      title: 'Top Repairs CNX \u2014 \u6E05\u8FC8\u548C\u5357\u5954\u4E13\u4E1A\u7EF4\u4FEE\u670D\u52A1 | \u7535\u6C14\u3001\u7A7A\u8C03\u3001\u76D1\u63A7',
      description: '\u6E05\u8FC8\u548C\u5357\u5954\u4E13\u4E1A\u7EF4\u4FEE\u670D\u52A1\u3002\u7535\u6C14\u3001\u7A7A\u8C03\u3001\u76D1\u63A7\u5B89\u88C5\u548C\u4E00\u822C\u7EF4\u4FEE\u300210\u5E74\u4EE5\u4E0A\u7ECF\u9A8C\u3002\u5728\u7EBF\u9884\u7EA6\u6216\u7ACB\u5373\u81F4\u7535\uFF01',
    },
  },
  electrical: {
    en: {
      title: 'Electrician in Chiang Mai \u2014 Electrical Repair & EV Charger Installation | Top Repairs CNX',
      description: 'Professional electrical services in Chiang Mai. Wiring, outlets, lighting, circuit breakers, and EV charger installation with safety inspection. Call Top today!',
    },
    th: {
      title: '\u0E0A\u0E48\u0E32\u0E07\u0E44\u0E1F\u0E1F\u0E49\u0E32 \u0E40\u0E0A\u0E35\u0E22\u0E07\u0E43\u0E2B\u0E21\u0E48 \u2014 \u0E0B\u0E48\u0E2D\u0E21\u0E44\u0E1F\u0E1F\u0E49\u0E32 & \u0E15\u0E34\u0E14\u0E15\u0E31\u0E49\u0E07\u0E40\u0E04\u0E23\u0E37\u0E48\u0E2D\u0E07\u0E0A\u0E32\u0E23\u0E4C\u0E08 EV | Top Repairs CNX',
      description: '\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E07\u0E32\u0E19\u0E44\u0E1F\u0E1F\u0E49\u0E32\u0E21\u0E37\u0E2D\u0E2D\u0E32\u0E0A\u0E35\u0E1E \u0E40\u0E0A\u0E35\u0E22\u0E07\u0E43\u0E2B\u0E21\u0E48 \u0E2A\u0E32\u0E22\u0E44\u0E1F \u0E1B\u0E25\u0E31\u0E4A\u0E01 \u0E44\u0E1F\u0E2A\u0E48\u0E2D\u0E07\u0E2A\u0E27\u0E48\u0E32\u0E07 \u0E40\u0E1A\u0E23\u0E01\u0E40\u0E01\u0E2D\u0E23\u0E4C \u0E41\u0E25\u0E30\u0E15\u0E34\u0E14\u0E15\u0E31\u0E49\u0E07\u0E40\u0E04\u0E23\u0E37\u0E48\u0E2D\u0E07\u0E0A\u0E32\u0E23\u0E4C\u0E08 EV \u0E1E\u0E23\u0E49\u0E2D\u0E21\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E04\u0E27\u0E32\u0E21\u0E1B\u0E25\u0E2D\u0E14\u0E20\u0E31\u0E22',
    },
    zh: {
      title: '\u6E05\u8FC8\u7535\u5DE5 \u2014 \u7535\u6C14\u7EF4\u4FEE & EV\u5145\u7535\u5668\u5B89\u88C5 | Top Repairs CNX',
      description: '\u6E05\u8FC8\u4E13\u4E1A\u7535\u6C14\u670D\u52A1\u3002\u5E03\u7EBF\u3001\u63D2\u5EA7\u3001\u7167\u660E\u3001\u65AD\u8DEF\u5668\u548CEV\u5145\u7535\u5668\u5B89\u88C5\uFF08\u542B\u5B89\u5168\u68C0\u67E5\uFF09\u3002\u7ACB\u5373\u8054\u7CFBTop\uFF01',
    },
  },
  ac: {
    en: {
      title: 'AC Repair & Installation Chiang Mai \u2014 Air Conditioning Service | Top Repairs CNX',
      description: 'AC cleaning, installation, and repair in Chiang Mai. All brands: Daikin, Mitsubishi, Samsung, LG. Refrigerator and washing machine repair too. Book now!',
    },
    th: {
      title: '\u0E0B\u0E48\u0E2D\u0E21\u0E41\u0E2D\u0E23\u0E4C & \u0E15\u0E34\u0E14\u0E15\u0E31\u0E49\u0E07\u0E41\u0E2D\u0E23\u0E4C \u0E40\u0E0A\u0E35\u0E22\u0E07\u0E43\u0E2B\u0E21\u0E48 \u2014 \u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E41\u0E2D\u0E23\u0E4C\u0E04\u0E23\u0E1A\u0E27\u0E07\u0E08\u0E23 | Top Repairs CNX',
      description: '\u0E25\u0E49\u0E32\u0E07\u0E41\u0E2D\u0E23\u0E4C \u0E15\u0E34\u0E14\u0E15\u0E31\u0E49\u0E07\u0E41\u0E2D\u0E23\u0E4C \u0E0B\u0E48\u0E2D\u0E21\u0E41\u0E2D\u0E23\u0E4C \u0E40\u0E0A\u0E35\u0E22\u0E07\u0E43\u0E2B\u0E21\u0E48 \u0E23\u0E31\u0E1A\u0E17\u0E38\u0E01\u0E22\u0E35\u0E48\u0E2B\u0E49\u0E2D Daikin Mitsubishi Samsung LG \u0E0B\u0E48\u0E2D\u0E21\u0E15\u0E39\u0E49\u0E40\u0E22\u0E47\u0E19 \u0E40\u0E04\u0E23\u0E37\u0E48\u0E2D\u0E07\u0E0B\u0E31\u0E01\u0E1C\u0E49\u0E32 \u0E08\u0E2D\u0E07\u0E40\u0E25\u0E22!',
    },
    zh: {
      title: '\u6E05\u8FC8\u7A7A\u8C03\u7EF4\u4FEE\u5B89\u88C5 \u2014 \u7A7A\u8C03\u670D\u52A1 | Top Repairs CNX',
      description: '\u6E05\u8FC8\u7A7A\u8C03\u6E05\u6D17\u3001\u5B89\u88C5\u548C\u7EF4\u4FEE\u3002\u652F\u6301\u6240\u6709\u54C1\u724C\u3002\u8FD8\u63D0\u4F9B\u51B0\u7BB1\u548C\u6D17\u8863\u673A\u7EF4\u4FEE\u3002\u7ACB\u5373\u9884\u7EA6\uFF01',
    },
  },
  cctv: {
    en: {
      title: 'CCTV Installation Chiang Mai \u2014 Security Camera Sales & Setup | Top Repairs CNX',
      description: 'Professional CCTV installation for homes, offices, and buildings in Chiang Mai. Hikvision, Dahua. Remote phone viewing setup. Free consultation!',
    },
    th: {
      title: '\u0E15\u0E34\u0E14\u0E15\u0E31\u0E49\u0E07\u0E01\u0E25\u0E49\u0E2D\u0E07\u0E27\u0E07\u0E08\u0E23\u0E1B\u0E34\u0E14 \u0E40\u0E0A\u0E35\u0E22\u0E07\u0E43\u0E2B\u0E21\u0E48 \u2014 \u0E02\u0E32\u0E22\u0E41\u0E25\u0E30\u0E15\u0E34\u0E14\u0E15\u0E31\u0E49\u0E07\u0E23\u0E30\u0E1A\u0E1A\u0E01\u0E25\u0E49\u0E2D\u0E07 | Top Repairs CNX',
      description: '\u0E15\u0E34\u0E14\u0E15\u0E31\u0E49\u0E07\u0E01\u0E25\u0E49\u0E2D\u0E07\u0E27\u0E07\u0E08\u0E23\u0E1B\u0E34\u0E14\u0E21\u0E37\u0E2D\u0E2D\u0E32\u0E0A\u0E35\u0E1E \u0E1A\u0E49\u0E32\u0E19 \u0E2A\u0E33\u0E19\u0E31\u0E01\u0E07\u0E32\u0E19 \u0E2D\u0E32\u0E04\u0E32\u0E23 \u0E40\u0E0A\u0E35\u0E22\u0E07\u0E43\u0E2B\u0E21\u0E48 Hikvision Dahua \u0E15\u0E31\u0E49\u0E07\u0E04\u0E48\u0E32\u0E14\u0E39\u0E1C\u0E48\u0E32\u0E19\u0E21\u0E37\u0E2D\u0E16\u0E37\u0E2D \u0E1B\u0E23\u0E36\u0E01\u0E29\u0E32\u0E1F\u0E23\u0E35!',
    },
    zh: {
      title: '\u6E05\u8FC8\u76D1\u63A7\u5B89\u88C5 \u2014 \u5B89\u9632\u6444\u50CF\u5934\u9500\u552E\u4E0E\u5B89\u88C5 | Top Repairs CNX',
      description: '\u6E05\u8FC8\u4E13\u4E1A\u76D1\u63A7\u5B89\u88C5\u3002\u9002\u7528\u4E8E\u4F4F\u5B85\u3001\u529E\u516C\u5BA4\u548C\u5EFA\u7B51\u3002\u6D77\u5EB7\u5A01\u89C6\u3001\u5927\u534E\u3002\u624B\u673A\u8FDC\u7A0B\u67E5\u770B\u8BBE\u7F6E\u3002\u514D\u8D39\u54A8\u8BE2\uFF01',
    },
  },
  services: {
    en: {
      title: 'Our Services — Electrical, AC, CCTV & General Repairs | Top Repairs CNX',
      description: 'Professional repair and installation services in Chiang Mai & Lamphun. Electrical, AC, CCTV, and general repairs. View all services and pricing.',
    },
    th: {
      title: 'บริการของเรา — ไฟฟ้า แอร์ กล้องวงจรปิด & ซ่อมทั่วไป | Top Repairs CNX',
      description: 'บริการซ่อมและติดตั้งมืออาชีพในเชียงใหม่ & ลำพูน ไฟฟ้า แอร์ กล้องวงจรปิด และงานซ่อมทั่วไป ดูบริการและราคาทั้งหมด',
    },
    zh: {
      title: '我们的服务 — 电气、空调、监控 & 一般维修 | Top Repairs CNX',
      description: '清迈和南奔专业维修和安装服务。电气、空调、监控和一般维修。查看所有服务和价格。',
    },
  },
  general: {
    en: {
      title: 'Handyman in Chiang Mai & Lamphun \u2014 General Repairs & Maintenance | Top Repairs CNX',
      description: 'Reliable handyman services in Chiang Mai and Lamphun. Door repair, plumbing, painting, furniture assembly. No job too small. Get a free estimate!',
    },
    th: {
      title: '\u0E0A\u0E48\u0E32\u0E07\u0E0B\u0E48\u0E2D\u0E21 \u0E40\u0E0A\u0E35\u0E22\u0E07\u0E43\u0E2B\u0E21\u0E48 & \u0E25\u0E33\u0E1E\u0E39\u0E19 \u2014 \u0E07\u0E32\u0E19\u0E0B\u0E48\u0E2D\u0E21\u0E17\u0E31\u0E48\u0E27\u0E44\u0E1B | Top Repairs CNX',
      description: '\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E0A\u0E48\u0E32\u0E07\u0E0B\u0E48\u0E2D\u0E21\u0E40\u0E0A\u0E37\u0E48\u0E2D\u0E16\u0E37\u0E2D\u0E44\u0E14\u0E49 \u0E40\u0E0A\u0E35\u0E22\u0E07\u0E43\u0E2B\u0E21\u0E48\u0E41\u0E25\u0E30\u0E25\u0E33\u0E1E\u0E39\u0E19 \u0E0B\u0E48\u0E2D\u0E21\u0E1B\u0E23\u0E30\u0E15\u0E39 \u0E1B\u0E23\u0E30\u0E1B\u0E32 \u0E17\u0E32\u0E2A\u0E35 \u0E1B\u0E23\u0E30\u0E01\u0E2D\u0E1A\u0E40\u0E1F\u0E2D\u0E23\u0E4C\u0E19\u0E34\u0E40\u0E08\u0E2D\u0E23\u0E4C \u0E44\u0E21\u0E48\u0E21\u0E35\u0E07\u0E32\u0E19\u0E40\u0E25\u0E47\u0E01\u0E40\u0E01\u0E34\u0E19\u0E44\u0E1B \u0E1B\u0E23\u0E30\u0E40\u0E21\u0E34\u0E19\u0E23\u0E32\u0E04\u0E32\u0E1F\u0E23\u0E35!',
    },
    zh: {
      title: '\u6E05\u8FC8\u548C\u5357\u5954\u7EF4\u4FEE\u5DE5 \u2014 \u4E00\u822C\u7EF4\u4FEE\u670D\u52A1 | Top Repairs CNX',
      description: '\u6E05\u8FC8\u548C\u5357\u5954\u53EF\u9760\u7684\u7EF4\u4FEE\u670D\u52A1\u3002\u95E8\u9501\u7EF4\u4FEE\u3001\u6C34\u7BA1\u3001\u6CB9\u6F06\u3001\u5BB6\u5177\u7EC4\u88C5\u3002\u514D\u8D39\u4F30\u4EF7\uFF01',
    },
  },
};

export function getPageMeta(page: string, lang: Lang): PageMeta {
  return pageMeta[page]?.[lang] || pageMeta[page]?.en || { title: 'Top Repairs CNX', description: '' };
}

export function getHreflangTags(path: string) {
  const langs: Lang[] = ['en', 'th', 'zh'];
  return langs.map((lang) => ({
    rel: 'alternate' as const,
    hrefLang: lang === 'zh' ? 'zh-Hans' : lang,
    href: `${baseUrl}/${lang}${path}`,
  }));
}

export function getCanonicalUrl(lang: Lang, path: string) {
  return `${baseUrl}/${lang}${path}`;
}

export function getOgLocale(lang: Lang) {
  const locales: Record<Lang, string> = { en: 'en_US', th: 'th_TH', zh: 'zh_CN' };
  return locales[lang];
}

export function getLocalBusinessJsonLd(lang: Lang = 'th') {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Top Repairs CNX',
    description: getPageMeta('home', lang).description,
    url: `${baseUrl}/${lang}`,
    telephone: PHONE,
    inLanguage: lang === 'zh' ? 'zh-Hans' : lang,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Chiang Mai',
      addressRegion: 'Chiang Mai',
      addressCountry: 'TH',
    },
    areaServed: [
      { '@type': 'City', name: 'Chiang Mai' },
      { '@type': 'City', name: 'Lamphun' },
    ],
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '08:00',
      closes: '20:00',
    },
    priceRange: '\u0E3F250 - \u0E3F25,000',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '200',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Repair Services',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Electrical Services' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AC & Appliance Repair' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'CCTV & Security' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'General Repairs' } },
      ],
    },
  };
}

export function getFaqJsonLd(lang: Lang, slug: ServiceSlug) {
  const faqCounts: Record<ServiceSlug, number> = {
    electrical: 4,
    ac: 3,
    cctv: 3,
    general: 3,
  };
  const count = faqCounts[slug] || 3;
  const items = Array.from({ length: count }, (_, i) => {
    const q = t(lang, `faq_${slug}_q${i + 1}`);
    const a = t(lang, `faq_${slug}_a${i + 1}`);
    if (!q || !a || q.startsWith('[') || a.startsWith('[')) return null;
    return {
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    };
  }).filter(Boolean);

  if (items.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items,
    inLanguage: lang === 'zh' ? 'zh-Hans' : lang,
  };
}

export function getServiceJsonLd(slug: ServiceSlug) {
  const serviceNames: Record<ServiceSlug, string> = {
    electrical: 'Electrical Repair',
    ac: 'AC & Appliance Repair',
    cctv: 'CCTV & Security Installation',
    general: 'General Repairs & Handyman',
  };
  const minPrices: Record<ServiceSlug, string> = {
    electrical: '500',
    ac: '500',
    cctv: '500',
    general: '500',
  };
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: serviceNames[slug],
    provider: {
      '@type': 'LocalBusiness',
      name: 'Top Repairs CNX',
      url: baseUrl,
    },
    areaServed: [
      { '@type': 'City', name: 'Chiang Mai' },
      { '@type': 'City', name: 'Lamphun' },
    ],
    offers: {
      '@type': 'Offer',
      priceCurrency: 'THB',
      priceSpecification: {
        '@type': 'PriceSpecification',
        minPrice: minPrices[slug],
        priceCurrency: 'THB',
      },
    },
  };
}

export function getBreadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${baseUrl}${item.url}`,
    })),
  };
}

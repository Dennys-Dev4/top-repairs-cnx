import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Lang, ServiceSlug } from '@/lib/types';
import { t, getServiceName, getServiceDesc, getItemName, getFAQs } from '@/lib/translations';
import { getPageMeta, getServiceJsonLd, getBreadcrumbJsonLd, getHreflangTags, getCanonicalUrl, getOgLocale, getFaqJsonLd } from '@/lib/seo';
import { isValidLang, isValidSlug, validLangs, validSlugs } from '@/lib/services';
import { getServiceBySlug } from '@/lib/pricing';
import FAQAccordion from '@/components/ui/FAQAccordion';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';

const accentColors: Record<string, string> = {
  electrical: '#F59E0B',
  ac: '#3B82F6',
  cctv: '#8B5CF6',
  general: '#10B981',
};

export function generateStaticParams() {
  const params: { lang: string; slug: string }[] = [];
  for (const lang of validLangs) {
    for (const slug of validSlugs) {
      params.push({ lang, slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isValidLang(lang) || !isValidSlug(slug)) return {};
  const meta = getPageMeta(slug, lang);
  const hreflang = getHreflangTags(`/services/${slug}`);
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: getCanonicalUrl(lang, `/services/${slug}`),
      languages: Object.fromEntries(hreflang.map((h) => [h.hrefLang, h.href])),
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: getCanonicalUrl(lang, `/services/${slug}`),
      locale: getOgLocale(lang),
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
    },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang: langStr, slug: slugStr } = await params;
  if (!isValidLang(langStr) || !isValidSlug(slugStr)) notFound();

  const lang = langStr as Lang;
  const slug = slugStr as ServiceSlug;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const faqs = getFAQs(lang, slug);
  const accent = accentColors[slug] || '#F97316';

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getServiceJsonLd(slug)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getBreadcrumbJsonLd([
              { name: t(lang, 'nav_home'), url: `/${lang}` },
              { name: t(lang, 'nav_services'), url: `/${lang}/services` },
              { name: getServiceName(lang, slug), url: `/${lang}/services/${slug}` },
            ])
          ),
        }}
      />
      {getFaqJsonLd(lang, slug) && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getFaqJsonLd(lang, slug)) }}
        />
      )}

      <section className="section-padding px-4 relative overflow-hidden">
        <div className="orb w-[400px] h-[400px] top-[-5%] right-[-12%] opacity-20" style={{ background: `radial-gradient(circle, ${accent}15, transparent 70%)` }} />
        <div className="max-w-4xl mx-auto relative z-10">
          {/* Header */}
          <AnimateOnScroll>
            <div className="text-center mb-16">
              <p className="section-label mb-5">{t(lang, 'nav_services')}</p>
              <span className="text-[72px] mb-6 block">{service.icon}</span>
              <h1 className="font-[family-name:var(--font-playfair)] heading-lg mb-5 tracking-tight">
                {getServiceName(lang, slug)}
              </h1>
              <p className="text-body-lg max-w-2xl mx-auto">{getServiceDesc(lang, slug)}</p>
            </div>
          </AnimateOnScroll>

          {/* EV Charger Highlight */}
          {slug === 'electrical' && (
            <AnimateOnScroll>
              <div
                className="card !p-7 mb-10"
                style={{ borderColor: `${accent}40`, background: `linear-gradient(135deg, ${accent}08, transparent)` }}
              >
                <div className="flex items-start gap-5">
                  <span className="text-[40px] shrink-0">{'\u26A1'}</span>
                  <div>
                    <h3 className="font-semibold text-[20px] mb-2" style={{ color: accent }}>{t(lang, 'service_ev')}</h3>
                    <p className="text-text-secondary text-[15px] leading-relaxed">{t(lang, 'ev_highlight')}</p>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          )}

          {/* Service Items */}
          <AnimateOnScroll>
            <div className="space-y-4 mb-14">
              {service.items.map((item) => (
                <div
                  key={item.key}
                  className={`card !p-5 flex items-center justify-between ${
                    item.isHighlight ? '!border-amber/30' : ''
                  }`}
                  style={item.isHighlight ? { background: `linear-gradient(135deg, ${accent}08, transparent)` } : undefined}
                >
                  <span className="text-text-primary text-[16px]">{getItemName(lang, item.key)}</span>
                  <span className="whitespace-nowrap ml-6 text-[15px]">
                    {item.isFree ? (
                      <span className="text-green font-semibold text-[18px]">{t(lang, 'free')}</span>
                    ) : (
                      <>
                        <span className="text-text-muted">{t(lang, 'starting_from')} </span>
                        <span className="font-bold text-[20px]" style={{ color: accent }}>
                          {'\u0E3F'}{item.price.toLocaleString()}
                        </span>
                      </>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </AnimateOnScroll>

          {/* CTAs */}
          <AnimateOnScroll>
            <div className="flex flex-col sm:flex-row gap-5 mb-16">
              <Link href={`/${lang}/booking`} className="btn-primary flex-1 text-center text-[16px]">
                {t(lang, 'book_service')}
              </Link>
              <Link href={`/${lang}/contact`} className="btn-secondary flex-1 text-center text-[16px]">
                {t(lang, 'get_estimate')}
              </Link>
            </div>
          </AnimateOnScroll>

          {/* FAQ */}
          {faqs.length > 0 && (
            <AnimateOnScroll>
              <h2 className="font-[family-name:var(--font-playfair)] heading-md mb-8">FAQ</h2>
              <FAQAccordion items={faqs} />
            </AnimateOnScroll>
          )}
        </div>
      </section>
    </>
  );
}

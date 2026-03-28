import { Metadata } from 'next';
import Link from 'next/link';
import { Lang } from '@/lib/types';
import { t, reviews } from '@/lib/translations';
import { getPageMeta, getLocalBusinessJsonLd, getBreadcrumbJsonLd, getHreflangTags, getCanonicalUrl, getOgLocale } from '@/lib/seo';
import { isValidLang } from '@/lib/services';
import { PHONE, PHONE_DISPLAY, LINE_URL } from '@/lib/contact';
import ServiceCard from '@/components/ui/ServiceCard';
import ReviewCard from '@/components/ui/ReviewCard';
import PriceCalculator from '@/components/ui/PriceCalculator';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isValidLang(lang)) return {};
  const meta = getPageMeta('home', lang);
  const hreflang = getHreflangTags('');
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: getCanonicalUrl(lang, ''),
      languages: Object.fromEntries(hreflang.map((h) => [h.hrefLang, h.href])),
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: getCanonicalUrl(lang, ''),
      siteName: 'Top Repairs CNX',
      type: 'website',
      locale: getOgLocale(lang),
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
    },
  };
}

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: langStr } = await params;
  const lang = langStr as Lang;

  const stats = [
    { key: 'years_experience', icon: '\uD83D\uDEE0\uFE0F' },
    { key: 'jobs_completed', icon: '\u2705' },
    { key: 'customer_rating', icon: '\u2B50' },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getLocalBusinessJsonLd(lang)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getBreadcrumbJsonLd([{ name: t(lang, 'nav_home'), url: `/${lang}` }])
          ),
        }}
      />

      {/* Hero Section */}
      <section className="hero-gradient relative min-h-[70vh] flex items-center px-4 overflow-hidden pt-16 pb-12">
        {/* Gradient orbs */}
        <div className="orb orb-orange w-[600px] h-[600px] top-[-10%] right-[-15%] animate-float" />
        <div className="orb orb-blue w-[400px] h-[400px] bottom-[5%] left-[-10%] animate-float-delayed" />
        <div className="orb orb-purple w-[300px] h-[300px] top-[30%] left-[15%] opacity-30 animate-float" />

        <div className="max-w-7xl mx-auto text-center w-full relative z-10">
          <AnimateOnScroll>
            <p className="section-label mb-6">{t(lang, 'hero_tagline')}</p>
          </AnimateOnScroll>
          <AnimateOnScroll>
            <h1 className="font-[family-name:var(--font-playfair)] heading-xl mb-8 tracking-tight">
              {t(lang, 'hero_title')}
            </h1>
          </AnimateOnScroll>
          <AnimateOnScroll>
            <p className="text-body-lg max-w-2xl mx-auto mb-10">
              {t(lang, 'hero_subtitle')}
            </p>
          </AnimateOnScroll>
          <AnimateOnScroll>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 mb-6">
              <Link href={`/${lang}/booking`} className="btn-primary text-[18px] !px-12 !py-5 w-full sm:w-auto">
                {t(lang, 'hero_cta')}
              </Link>
              <Link href={`/${lang}/contact`} className="btn-secondary text-[18px] !px-12 !py-5 w-full sm:w-auto">
                {t(lang, 'get_estimate')}
              </Link>
            </div>
          </AnimateOnScroll>
          <AnimateOnScroll>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 text-text-muted text-[14px]">
              <span>{t(lang, 'hero_or_contact')}</span>
              <div className="flex items-center gap-4">
                <a href={`tel:${PHONE}`} className="inline-flex items-center gap-2 text-text-secondary hover:text-orange transition-colors duration-300 font-medium">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {PHONE_DISPLAY}
                </a>
                <span className="text-border">|</span>
                <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-text-secondary hover:text-[#06C755] transition-colors duration-300 font-medium">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                  </svg>
                  LINE
                </a>
              </div>
            </div>
          </AnimateOnScroll>

          {/* Stats integrated into hero */}
          <AnimateOnScroll>
            <div className="grid grid-cols-3 gap-4 sm:gap-6 max-w-2xl mx-auto mt-14 pt-10 border-t border-border/40">
              {stats.map((stat) => (
                <div key={stat.key} className="text-center group">
                  <span className="text-[28px] sm:text-[32px] block mb-2 group-hover:scale-110 transition-transform duration-300">{stat.icon}</span>
                  <span className="text-[14px] sm:text-[15px] font-semibold text-text-primary tracking-tight">{t(lang, stat.key)}</span>
                </div>
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding px-4 relative overflow-hidden">
        <div className="orb orb-orange w-[400px] h-[400px] top-[10%] right-[-15%] opacity-20" />
        <div className="max-w-7xl mx-auto relative z-10">
          <AnimateOnScroll>
            <div className="text-center mb-16">
              <p className="section-label mb-5">{t(lang, 'nav_services')}</p>
              <h2 className="font-[family-name:var(--font-playfair)] heading-lg mb-5 tracking-tight">
                {t(lang, 'services_title')}
              </h2>
              <p className="text-body max-w-xl mx-auto">{t(lang, 'services_desc')}</p>
            </div>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(['electrical', 'ac', 'cctv', 'general'] as const).map((slug) => (
              <AnimateOnScroll key={slug}>
                <ServiceCard slug={slug} lang={lang} />
              </AnimateOnScroll>
            ))}
          </div>
          <AnimateOnScroll>
            <div className="text-center mt-10">
              <Link
                href={`/${lang}/services`}
                className="text-orange hover:text-orange-dark font-semibold text-[16px] transition-colors duration-300 inline-flex items-center gap-2"
              >
                {t(lang, 'view_all')} <span className="text-[20px]">&rarr;</span>
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Price Calculator */}
      <div className="section-divider" />
      <section className="section-padding px-4 relative overflow-hidden">
        <div className="orb orb-blue w-[350px] h-[350px] bottom-[10%] left-[-10%] opacity-20" />
        <div className="max-w-xl mx-auto relative z-10">
          <AnimateOnScroll>
            <PriceCalculator lang={lang} />
          </AnimateOnScroll>
        </div>
      </section>

      {/* Reviews Section */}
      <div className="section-divider" />
      <section className="section-padding px-4 relative overflow-hidden">
        <div className="orb orb-purple w-[300px] h-[300px] top-[5%] left-[-8%] opacity-15" />
        <div className="max-w-7xl mx-auto relative z-10">
          <AnimateOnScroll>
            <div className="text-center mb-16">
              <p className="section-label mb-5">{t(lang, 'customer_rating')}</p>
              <h2 className="font-[family-name:var(--font-playfair)] heading-lg tracking-tight">
                {t(lang, 'reviews_heading')}
              </h2>
            </div>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <AnimateOnScroll key={review.name}>
                <ReviewCard {...review} lang={lang} />
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="px-4 py-6 sm:py-10">
        <div className="max-w-5xl mx-auto">
          <AnimateOnScroll>
            <div className="cta-banner px-8 py-10 sm:px-14 sm:py-14 text-center relative z-10">
              <h2 className="font-[family-name:var(--font-playfair)] text-[24px] sm:text-[32px] font-bold mb-4 tracking-tight">
                {t(lang, 'cta_heading')}
              </h2>
              <p className="text-text-secondary text-[16px] mb-8 max-w-xl mx-auto leading-relaxed">
                {t(lang, 'cta_desc')}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href={`/${lang}/booking`} className="btn-primary text-[16px] !px-10 !py-4 w-full sm:w-auto">
                  {t(lang, 'hero_cta')}
                </Link>
                <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-[#06C755] hover:bg-[#05b34d] text-white rounded-[14px] font-semibold text-[16px] transition-all duration-300 min-h-[56px] w-full sm:w-auto hover:-translate-y-0.5 active:translate-y-0">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                  </svg>
                  LINE
                </a>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Service Area & Hours */}
      <div className="section-divider" />
      <section className="section-padding px-4">
        <div className="max-w-7xl mx-auto">
          <AnimateOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card card-lift text-center !p-10">
                <div className="w-16 h-16 rounded-2xl bg-orange/10 flex items-center justify-center mx-auto mb-5">
                  <svg className="w-7 h-7 text-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <h3 className="font-[family-name:var(--font-playfair)] text-[24px] font-bold mb-4 tracking-tight">{t(lang, 'contact_area')}</h3>
                <p className="text-text-secondary text-[16px] leading-relaxed">{t(lang, 'service_areas')}</p>
              </div>
              <div className="card card-lift text-center !p-10">
                <div className="w-16 h-16 rounded-2xl bg-electric-blue/10 flex items-center justify-center mx-auto mb-5">
                  <svg className="w-7 h-7 text-electric-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-[family-name:var(--font-playfair)] text-[24px] font-bold mb-4 tracking-tight">{t(lang, 'contact_hours')}</h3>
                <p className="text-text-secondary text-[16px] leading-relaxed">{t(lang, 'working_hours')}</p>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
}

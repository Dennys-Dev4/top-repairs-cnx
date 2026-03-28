import { Metadata } from 'next';
import { Lang } from '@/lib/types';
import { t } from '@/lib/translations';
import { getBreadcrumbJsonLd, getHreflangTags, getCanonicalUrl, getOgLocale } from '@/lib/seo';
import { isValidLang } from '@/lib/services';
import BookingCalendar from '@/components/ui/BookingCalendar';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isValidLang(lang)) return {};
  const hreflang = getHreflangTags('/booking');
  return {
    title: `${t(lang as Lang, 'booking_title')} | Top Repairs CNX`,
    description: t(lang as Lang, 'booking_desc'),
    alternates: {
      canonical: getCanonicalUrl(lang as Lang, '/booking'),
      languages: Object.fromEntries(hreflang.map((h) => [h.hrefLang, h.href])),
    },
    openGraph: {
      title: `${t(lang as Lang, 'booking_title')} | Top Repairs CNX`,
      description: t(lang as Lang, 'booking_desc'),
      url: getCanonicalUrl(lang as Lang, '/booking'),
      locale: getOgLocale(lang as Lang),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${t(lang as Lang, 'booking_title')} | Top Repairs CNX`,
      description: t(lang as Lang, 'booking_desc'),
    },
  };
}

export default async function BookingPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: langStr } = await params;
  const lang = langStr as Lang;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getBreadcrumbJsonLd([
              { name: t(lang, 'nav_home'), url: `/${lang}` },
              { name: t(lang, 'nav_booking'), url: `/${lang}/booking` },
            ])
          ),
        }}
      />

      <section className="section-padding px-4 relative overflow-hidden">
        <div className="orb orb-orange w-[350px] h-[350px] top-[-5%] right-[-10%] opacity-15" />
        <div className="max-w-lg mx-auto relative z-10">
          <AnimateOnScroll>
            <div className="text-center mb-12">
              <p className="section-label mb-5">{t(lang, 'nav_booking')}</p>
              <h1 className="font-[family-name:var(--font-playfair)] heading-lg mb-5 tracking-tight">
                {t(lang, 'booking_title')}
              </h1>
              <p className="text-body-lg">{t(lang, 'booking_desc')}</p>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll>
            <BookingCalendar lang={lang} />
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
}

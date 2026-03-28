import { Metadata } from 'next';
import { Lang } from '@/lib/types';
import { t } from '@/lib/translations';
import { getHreflangTags, getCanonicalUrl, getOgLocale } from '@/lib/seo';
import { isValidLang } from '@/lib/services';
import GalleryContent from './GalleryContent';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isValidLang(lang)) return {};
  const hreflang = getHreflangTags('/gallery');
  return {
    title: `${t(lang as Lang, 'gallery_title')} | Top Repairs CNX`,
    description: t(lang as Lang, 'gallery_desc'),
    alternates: {
      canonical: getCanonicalUrl(lang as Lang, '/gallery'),
      languages: Object.fromEntries(hreflang.map((h) => [h.hrefLang, h.href])),
    },
    openGraph: {
      title: `${t(lang as Lang, 'gallery_title')} | Top Repairs CNX`,
      description: t(lang as Lang, 'gallery_desc'),
      url: getCanonicalUrl(lang as Lang, '/gallery'),
      locale: getOgLocale(lang as Lang),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${t(lang as Lang, 'gallery_title')} | Top Repairs CNX`,
      description: t(lang as Lang, 'gallery_desc'),
    },
  };
}

export default async function GalleryPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: langStr } = await params;
  const lang = langStr as Lang;

  return <GalleryContent lang={lang} />;
}

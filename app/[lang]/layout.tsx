import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Playfair_Display, Noto_Sans_Thai, Noto_Sans_SC } from 'next/font/google';
import { notFound } from 'next/navigation';
import { isValidLang, validLangs } from '@/lib/services';
import { Lang } from '@/lib/types';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import EmergencyButton from '@/components/ui/EmergencyButton';

const plusJakarta = Plus_Jakarta_Sans({
  variable: '--font-jakarta',
  subsets: ['latin'],
  display: 'swap',
});

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
});

const notoSansThai = Noto_Sans_Thai({
  variable: '--font-noto-thai',
  subsets: ['thai'],
  display: 'swap',
});

const notoSansSC = Noto_Sans_SC({
  variable: '--font-noto-sc',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Top Repairs CNX',
  description: 'Professional repair services in Chiang Mai and Lamphun',
  icons: { icon: '/favicon.ico' },
  metadataBase: new URL('https://toprepairscnx.com'),
  openGraph: {
    siteName: 'Top Repairs CNX',
    type: 'website',
    locale: 'en',
  },
};

export function generateStaticParams() {
  return validLangs.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isValidLang(lang)) notFound();

  return (
    <html lang={lang === 'zh' ? 'zh-Hans' : lang}>
      <body
        className={`${plusJakarta.variable} ${playfair.variable} ${notoSansThai.variable} ${notoSansSC.variable} antialiased`}
      >
        <div className="min-h-screen flex flex-col">
          <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-orange focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-semibold">
            Skip to content
          </a>
          <Navbar lang={lang as Lang} />
          <main id="main-content" className="flex-1 pt-[76px]">{children}</main>
          <Footer lang={lang as Lang} />
          <EmergencyButton lang={lang as Lang} />
        </div>
      </body>
    </html>
  );
}

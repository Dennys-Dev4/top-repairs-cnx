'use client';

import { useState } from 'react';
import { Lang } from '@/lib/types';
import { t } from '@/lib/translations';
import { PHONE, PHONE_DISPLAY, LINE_ID, LINE_URL, FORMSPREE_URL } from '@/lib/contact';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';

export default function ContactContent({ lang }: { lang: Lang }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(false);
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, lang }),
      });
      if (!res.ok) throw new Error('Failed');
      setSubmitted(true);
    } catch {
      setError(true);
    }
    setSubmitting(false);
  };

  return (
    <section className="section-padding px-4 relative overflow-hidden">
      <div className="orb orb-orange w-[350px] h-[350px] top-[-5%] right-[-10%] opacity-15" />
      <div className="orb orb-purple w-[250px] h-[250px] bottom-[10%] left-[-8%] opacity-15" />
      <div className="max-w-7xl mx-auto relative z-10">
        <AnimateOnScroll>
          <div className="text-center mb-16">
            <p className="section-label mb-5">{t(lang, 'contact_title')}</p>
            <h1 className="font-[family-name:var(--font-playfair)] heading-lg mb-5 tracking-tight">
              {t(lang, 'contact_title')}
            </h1>
            <p className="text-body-lg max-w-2xl mx-auto">{t(lang, 'contact_desc')}</p>
          </div>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <AnimateOnScroll>
            <div className="card !p-10">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="text-[64px] mb-6">{'\u2705'}</div>
                  <p className="text-[20px] font-semibold text-text-primary">{t(lang, 'booking_success')}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="contact-name" className="sr-only">{t(lang, 'your_name')}</label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder={t(lang, 'your_name')}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="sr-only">{t(lang, 'email')}</label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder={t(lang, 'email')}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="sr-only">{t(lang, 'message')}</label>
                    <textarea
                      id="contact-message"
                      rows={6}
                      required
                      placeholder={t(lang, 'message')}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>
                  {error && (
                    <p className="text-red text-[14px]">{t(lang, 'form_error')}</p>
                  )}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary w-full !py-5 text-[18px] disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
                  >
                    {submitting ? '...' : t(lang, 'send_message')}
                  </button>
                </form>
              )}
            </div>
          </AnimateOnScroll>

          {/* Contact Info */}
          <div className="space-y-5">
            <AnimateOnScroll>
              <div className="card">
                <h3 className="font-[family-name:var(--font-playfair)] text-[20px] font-bold text-text-primary mb-5">{t(lang, 'contact_info')}</h3>
                <div className="space-y-5">
                  <a
                    href={`tel:${PHONE}`}
                    className="flex items-center gap-4 text-text-secondary hover:text-orange transition-colors duration-300 text-[16px]"
                  >
                    <div className="w-11 h-11 rounded-xl bg-page-bg border border-border flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    {PHONE_DISPLAY}
                  </a>
                  <div className="flex items-center gap-4 text-text-secondary text-[16px]">
                    <div className="w-11 h-11 rounded-xl bg-page-bg border border-border flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    LINE: {LINE_ID}
                  </div>
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll>
              <div className="card">
                <h3 className="font-[family-name:var(--font-playfair)] text-[20px] font-bold text-text-primary mb-3">{t(lang, 'contact_hours')}</h3>
                <p className="text-text-secondary text-[16px]">{t(lang, 'working_hours')}</p>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll>
              <div className="card">
                <h3 className="font-[family-name:var(--font-playfair)] text-[20px] font-bold text-text-primary mb-3">{t(lang, 'contact_area')}</h3>
                <p className="text-text-secondary text-[16px]">{t(lang, 'service_areas')}</p>
              </div>
            </AnimateOnScroll>

            {/* Quick action buttons */}
            <AnimateOnScroll>
              <div className="flex flex-col gap-4">
                <a
                  href={LINE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 py-5 bg-[#06C755] hover:bg-[#05b34d] text-white rounded-2xl font-semibold text-[17px] transition-all duration-300 min-h-[56px] shadow-lg shadow-[#06C755]/15"
                >
                  {t(lang, 'emergency_line')}
                </a>
              </div>
            </AnimateOnScroll>

            {/* Google Maps embed */}
            <AnimateOnScroll>
              <div className="card !p-0 overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241689.21399755606!2d98.8!3d18.75!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30da3a7e90bb6f5d%3A0x5fa3904e1bacd685!2sChiang%20Mai!5e0!3m2!1sen!2sth!4v1700000000000"
                  width="100%"
                  height="320"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Service Area - Chiang Mai & Lamphun"
                />
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}

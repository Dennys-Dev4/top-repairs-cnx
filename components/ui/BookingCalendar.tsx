'use client';

import { useState } from 'react';
import { Lang } from '@/lib/types';
import { t } from '@/lib/translations';
import { FORMSPREE_URL } from '@/lib/contact';

const DAYS: Record<Lang, string[]> = {
  en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  th: ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'],
  zh: ['日', '一', '二', '三', '四', '五', '六'],
};

const MONTH_NAMES: Record<Lang, string[]> = {
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  th: ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'],
  zh: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
};

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

export default function BookingCalendar({ lang }: { lang: Lang }) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    lineId: '',
    service: '',
    description: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

  const isToday = (day: number) =>
    day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();

  const isPast = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return date < todayStart;
  };

  const prevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(currentYear - 1); }
    else { setCurrentMonth(currentMonth - 1); }
    setSelectedDate(null);
  };

  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(currentYear + 1); }
    else { setCurrentMonth(currentMonth + 1); }
    setSelectedDate(null);
  };

  const canGoPrev = currentYear > today.getFullYear() || currentMonth > today.getMonth();

  const timeSlots = [
    { key: 'morning', label: t(lang, 'morning') },
    { key: 'afternoon', label: t(lang, 'afternoon') },
    { key: 'evening', label: t(lang, 'evening') },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(false);
    const body = {
      ...formData,
      date: selectedDate ? `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(selectedDate).padStart(2, '0')}` : '',
      time: selectedTime,
      lang,
    };
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error('Failed');
      setSubmitted(true);
    } catch {
      setError(true);
    }
    setSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="card !p-14 text-center">
        <div className="text-[64px] mb-6">{'\u2705'}</div>
        <p className="text-[20px] font-semibold text-text-primary leading-relaxed">{t(lang, 'booking_success')}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      {/* Calendar */}
      <div className="card !p-8">
        <p className="text-[12px] font-semibold uppercase tracking-widest text-text-muted mb-6">{t(lang, 'preferred_date')}</p>
        <div className="flex items-center justify-between mb-7">
          <button
            type="button" onClick={prevMonth} disabled={!canGoPrev}
            className="p-3 rounded-xl hover:bg-card-hover disabled:opacity-15 min-w-[48px] min-h-[48px] flex items-center justify-center transition-colors cursor-pointer disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h3 className="font-[family-name:var(--font-playfair)] text-[22px] font-bold text-text-primary tracking-tight">
            {MONTH_NAMES[lang][currentMonth]} {currentYear}
          </h3>
          <button
            type="button" onClick={nextMonth}
            className="p-3 rounded-xl hover:bg-card-hover min-w-[48px] min-h-[48px] flex items-center justify-center transition-colors cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-7 gap-2 text-center text-[11px] text-text-muted mb-3 font-semibold uppercase tracking-widest">
          {DAYS[lang].map((d) => (<div key={d} className="py-2">{d}</div>))}
        </div>

        <div className="grid grid-cols-7 gap-2 text-center">
          {Array.from({ length: firstDay }).map((_, i) => (<div key={`empty-${i}`} />))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const past = isPast(day);
            const todayDay = isToday(day);
            const selected = selectedDate === day;
            return (
              <button
                key={day} type="button" disabled={past}
                onClick={() => setSelectedDate(day)}
                className={`aspect-square rounded-xl text-[14px] font-medium transition-all duration-300 min-h-[46px] flex items-center justify-center cursor-pointer disabled:cursor-not-allowed ${
                  past ? 'text-text-muted/20'
                    : selected ? 'bg-orange text-white font-bold shadow-lg shadow-orange/25'
                    : todayDay ? 'ring-2 ring-orange/30 text-orange font-bold bg-orange/[0.06]'
                    : 'text-text-secondary hover:bg-card-hover'
                }`}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>

      {/* Time Slots */}
      <div>
        <p className="text-[12px] font-semibold uppercase tracking-widest text-text-muted mb-5">{t(lang, 'preferred_time')}</p>
        <div className="grid grid-cols-3 gap-4">
          {timeSlots.map((slot) => (
            <button
              key={slot.key} type="button" onClick={() => setSelectedTime(slot.key)}
              className={`py-5 rounded-2xl border text-[14px] font-semibold transition-all duration-400 min-h-[56px] cursor-pointer ${
                selectedTime === slot.key
                  ? 'border-orange/40 bg-orange/[0.06] text-text-primary shadow-lg shadow-orange/5'
                  : 'border-border text-text-secondary hover:border-border-hover'
              }`}
            >
              {slot.label}
            </button>
          ))}
        </div>
      </div>

      {/* Form */}
      <div className="space-y-5">
        <div>
          <label htmlFor="booking-name" className="sr-only">{t(lang, 'your_name')}</label>
          <input id="booking-name" type="text" required placeholder={t(lang, 'your_name')} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
        </div>
        <div>
          <label htmlFor="booking-phone" className="sr-only">{t(lang, 'phone')}</label>
          <input id="booking-phone" type="tel" required placeholder={t(lang, 'phone')} value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
        </div>
        <div>
          <label htmlFor="booking-line" className="sr-only">{t(lang, 'line_id')}</label>
          <input id="booking-line" type="text" placeholder={t(lang, 'line_id')} value={formData.lineId} onChange={(e) => setFormData({ ...formData, lineId: e.target.value })} />
        </div>
        <div>
          <label htmlFor="booking-service" className="sr-only">{t(lang, 'select_service')}</label>
          <select id="booking-service" required value={formData.service} onChange={(e) => setFormData({ ...formData, service: e.target.value })}>
            <option value="">{t(lang, 'select_service')}</option>
            <option value="electrical">{t(lang, 'service_electrical')}</option>
            <option value="ac">{t(lang, 'service_ac')}</option>
            <option value="cctv">{t(lang, 'service_cctv')}</option>
            <option value="general">{t(lang, 'service_general')}</option>
          </select>
        </div>
        <div>
          <label htmlFor="booking-desc" className="sr-only">{t(lang, 'describe_problem')}</label>
          <textarea id="booking-desc" rows={4} placeholder={t(lang, 'describe_problem')} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
        </div>
      </div>

      {error && (
        <p className="text-red text-[14px]">{t(lang, 'form_error')}</p>
      )}

      <button
        type="submit"
        disabled={submitting || !selectedDate || !selectedTime}
        className="btn-primary w-full !py-5 text-[17px] disabled:opacity-30 disabled:shadow-none disabled:transform-none disabled:cursor-not-allowed"
      >
        {submitting ? '...' : t(lang, 'submit_booking')}
      </button>
    </form>
  );
}

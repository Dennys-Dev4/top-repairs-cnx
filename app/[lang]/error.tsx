'use client';

import Link from 'next/link';

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-[80px] mb-4">⚠️</div>
        <h1 className="font-[family-name:var(--font-playfair)] text-[40px] font-bold mb-3 tracking-tight">
          Something went wrong
        </h1>
        <p className="text-text-secondary text-[16px] mb-8 leading-relaxed">
          An unexpected error occurred. Please try again or go back to the homepage.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button onClick={reset} className="btn-primary cursor-pointer">
            Try Again
          </button>
          <Link href="/en" className="btn-secondary">
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}

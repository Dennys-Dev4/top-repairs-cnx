import Link from 'next/link';

export default function NotFound() {
  return (
    <html lang="en">
      <body style={{ backgroundColor: '#0B1120', color: '#F1F5F9', fontFamily: 'system-ui, sans-serif', margin: 0 }}>
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
          <div style={{ textAlign: 'center', maxWidth: '480px' }}>
            <div style={{ fontSize: '80px', marginBottom: '1rem' }}>🔧</div>
            <h1 style={{ fontSize: '48px', fontWeight: 700, marginBottom: '0.5rem' }}>404</h1>
            <p style={{ fontSize: '18px', color: '#8896AB', marginBottom: '2rem', lineHeight: 1.6 }}>
              Page not found. The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
            <Link
              href="/en"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '16px 36px',
                background: 'linear-gradient(135deg, #F97316 0%, #FB923C 100%)',
                color: '#fff',
                fontWeight: 600,
                fontSize: '16px',
                borderRadius: '14px',
                textDecoration: 'none',
              }}
            >
              Go to Homepage
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}

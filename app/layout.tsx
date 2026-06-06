// app/layout.tsx
import type { Metadata } from 'next';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'GMBhub — Turn Foot Traffic into 5-Star Google Reviews',
  description:
    'AI-powered Google My Business reputation management & local SEO growth platform. Generate more 5-star Google reviews with intelligent QR funnels.',
  keywords: 'google reviews, GMB, reputation management, local SEO, QR code reviews, review funnel, google my business',
  openGraph: {
    title: 'GMBhub',
    description: 'Turn Foot Traffic into 5-Star Google Reviews. Instantly.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#030303] text-white font-sans antialiased">
        {children}
      </body>
    </html>
  );
}

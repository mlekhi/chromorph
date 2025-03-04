import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MenuBar from '@/components/ui/Menu';
import Footer from '@/components/ui/Footer';
import { BackgroundContainer } from "@/components/ui/backgroundContainer";
import { ThemeProvider } from '@/components/providers/ThemeProvider';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://chromorph.com'),
  title: {
    default: 'Chromorph - SVG to 3D Model Converter',
    template: '%s | Chromorph'
  },
  description: 'Transform your SVG files into stunning 3D models instantly with Chromorph. Free, fast, and easy to use SVG to 3D converter with Chrome effect.',
  keywords: ['SVG to 3D', '3D conversion', 'Chrome 3D', 'SVG converter', '3D modeling', 'web tools', 'design tools'],
  authors: [{ name: 'Maya Lekhi', url: 'https://github.com/mlekhi' }],
  creator: 'Maya Lekhi',
  publisher: 'Chromorph',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: 'Chromorph',
    title: 'Chromorph - SVG to 3D Model Converter',
    description: 'Transform your SVG files into stunning 3D models instantly. Free, fast, and easy to use.',
    url: 'https://chromorph.com',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Chromorph - SVG to 3D Converter'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@maya_l39',
    creator: '@maya_l39',
    title: 'Chromorph - SVG to 3D Model Converter',
    description: 'Transform your SVG files into stunning 3D models instantly',
    images: ['/twitter-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/site.webmanifest',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
    other: [
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        url: '/favicon-32x32.png',
      },
    ],
  },
  verification: {
    google: 'your-google-site-verification',
  },
  alternates: {
    canonical: 'https://chromorph.com',
    languages: {
      'en-US': 'https://chromorph.com',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider>
          <BackgroundContainer>
            {/* JSON-LD structured data */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  '@context': 'https://schema.org',
                  '@type': 'WebApplication',
                  name: 'Chromorph',
                  url: 'https://chromorph.com',
                  description: 'Transform your SVG files into stunning 3D models instantly with Chromorph.',
                  applicationCategory: 'DesignApplication',
                  operatingSystem: 'Web browser',
                  offers: {
                    '@type': 'Offer',
                    price: '0',
                    priceCurrency: 'USD'
                  },
                  creator: {
                    '@type': 'Person',
                    name: 'Maya Lekhi',
                    url: 'https://github.com/mlekhi'
                  },
                  browserRequirements: 'Requires JavaScript. Requires HTML5.',
                  softwareVersion: '1.0.0',
                  screenshot: '/og-image.png',
                  featureList: [
                    'SVG to 3D conversion',
                    'Chrome effect',
                    'Instant preview',
                    'Free to use'
                  ]
                })
              }}
            />
            <MenuBar />
            {children}
            <Footer />
          </BackgroundContainer>
        </ThemeProvider>
      </body>
    </html>
  );
}

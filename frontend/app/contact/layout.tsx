import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Chromorph - SVG to 3D Converter',
  description: 'Get in touch with the Chromorph team for questions about our SVG to 3D model conversion service, technical support, or feedback. We\'re here to help!',
  keywords: 'contact, support, feedback, SVG to 3D, Chromorph, 3D conversion, technical support',
  openGraph: {
    title: 'Contact Chromorph - SVG to 3D Converter',
    description: 'Get in touch with the Chromorph team for questions about our SVG to 3D model conversion service, technical support, or feedback.',
    type: 'website',
    url: 'https://chromorph.com/contact',
    siteName: 'Chromorph',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Chromorph - SVG to 3D Converter',
    description: 'Get in touch with the Chromorph team for questions about our SVG to 3D model conversion service.',
    creator: '@maya_l39',
  },
  alternates: {
    canonical: 'https://chromorph.com/contact'
  }
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            name: 'Chromorph Contact Page',
            description: 'Contact page for Chromorph SVG to 3D conversion service',
            url: 'https://chromorph.com/contact',
            mainEntity: {
              '@type': 'Organization',
              name: 'Chromorph',
              description: 'SVG to 3D model conversion service',
              url: 'https://chromorph.com',
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'customer service',
                availableLanguage: 'English'
              }
            }
          })
        }}
      />
      {children}
    </>
  );
} 
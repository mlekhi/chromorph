import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Chromorph',
  description: 'Privacy policy and data handling practices for Chromorph - SVG to 3D model converter.',
};

export default function PrivacyPolicy() {
  return (
    <main className="container mx-auto px-4 py-24 max-w-4xl">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-[var(--text-primary)]">Privacy Policy</h1>
      <p className="text-[var(--text-secondary)] mb-12">Last updated: March 2025</p>

      <div className="space-y-12">
        {/* Introduction */}
        <section>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
            At Chromorph, we take your privacy seriously. This policy outlines how we collect, use, and protect your information when you use our SVG to 3D model conversion service.
          </p>
        </section>

        {/* Information Collection */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-[var(--text-primary)]">Information We Collect</h2>
          <div className="bg-[var(--card-bg)] rounded-lg p-6 space-y-4">
            <p className="text-[var(--text-secondary)]">When you use Chromorph, we collect:</p>
            <ul className="list-disc pl-6 space-y-2 text-[var(--text-secondary)]">
              <li>SVG files you upload for conversion</li>
              <li>Basic usage data (conversion requests, file sizes)</li>
              <li>Technical information (browser type, device info)</li>
              <li>Optional account information if you choose to register</li>
            </ul>
          </div>
        </section>

        {/* How We Use Information */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-[var(--text-primary)]">How We Use Your Information</h2>
          <div className="bg-[var(--card-bg)] rounded-lg p-6 space-y-4">
            <p className="text-[var(--text-secondary)]">We use collected information to:</p>
            <ul className="list-disc pl-6 space-y-2 text-[var(--text-secondary)]">
              <li>Process your SVG to 3D model conversions</li>
              <li>Improve our conversion algorithms and service quality</li>
              <li>Provide technical support and respond to inquiries</li>
              <li>Send important service updates and announcements</li>
            </ul>
          </div>
        </section>

        {/* Data Security */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-[var(--text-primary)]">Data Security</h2>
          <div className="bg-[var(--card-bg)] rounded-lg p-6">
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Your files and data are encrypted during transmission and storage. We implement industry-standard security measures to protect against unauthorized access, alteration, or disclosure of your information. Uploaded SVG files are automatically deleted from our servers after processing unless you explicitly choose to save them.
            </p>
          </div>
        </section>

        {/* Data Sharing */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-[var(--text-primary)]">Data Sharing</h2>
          <div className="bg-[var(--card-bg)] rounded-lg p-6">
            <p className="text-[var(--text-secondary)] leading-relaxed">
              We do not sell, trade, or rent your personal information to third parties. We may share anonymous, aggregated data for analytical purposes or to improve our services. Any sharing of information is conducted in compliance with applicable data protection laws.
            </p>
          </div>
        </section>

        {/* Your Rights */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-[var(--text-primary)]">Your Rights</h2>
          <div className="bg-[var(--card-bg)] rounded-lg p-6 space-y-4">
            <p className="text-[var(--text-secondary)]">You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2 text-[var(--text-secondary)]">
              <li>Access your personal information</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of marketing communications</li>
            </ul>
          </div>
        </section>

        {/* Contact Section */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-[var(--text-primary)]">Contact Us</h2>
          <div className="bg-[var(--card-bg)] p-6 rounded-lg">
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              If you have any questions about our privacy policy or data practices, please contact us:
            </p>
            <a 
              href="mailto:privacy@chromorph.com" 
              className="inline-block bg-[var(--foreground)] text-[var(--background)] px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-colors"
            >
              Contact Privacy Team →
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}

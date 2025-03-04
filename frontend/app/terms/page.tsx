import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms and Conditions | Chromorph',
  description: 'Terms of service and usage conditions for Chromorph - SVG to 3D model converter.',
};

export default function TermsAndConditions() {
  return (
    <main className="container mx-auto px-4 py-24 max-w-4xl">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-[var(--text-primary)]">Terms and Conditions</h1>
      <p className="text-[var(--text-secondary)] mb-12">Last updated: March 2025</p>

      <div className="space-y-12">
        {/* Introduction */}
        <section>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
            Welcome to Chromorph. By using our service, you agree to these terms and conditions. Please read them carefully before using our SVG to 3D model conversion service.
          </p>
        </section>

        {/* Service Usage */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-[var(--text-primary)]">Service Usage</h2>
          <div className="bg-[var(--card-bg)] rounded-lg p-6 space-y-4">
            <p className="text-[var(--text-secondary)]">By using Chromorph, you agree to:</p>
            <ul className="list-disc pl-6 space-y-2 text-[var(--text-secondary)]">
              <li>Only upload SVG files you have the right to use</li>
              <li>Not use the service for any illegal or unauthorized purpose</li>
              <li>Not attempt to interfere with or disrupt the service</li>
              <li>Comply with all applicable laws and regulations</li>
            </ul>
          </div>
        </section>

        {/* Intellectual Property */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-[var(--text-primary)]">Intellectual Property</h2>
          <div className="bg-[var(--card-bg)] rounded-lg p-6">
            <p className="text-[var(--text-secondary)] leading-relaxed">
              You retain all rights to your original SVG files. The 3D models generated through our service are your property to use as permitted by law. Chromorph's service, including its technology and branding, remains our intellectual property. We grant you a limited license to use the converted 3D models for your intended purpose.
            </p>
          </div>
        </section>

        {/* Limitations of Liability */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-[var(--text-primary)]">Limitations of Liability</h2>
          <div className="bg-[var(--card-bg)] rounded-lg p-6">
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Chromorph provides the service "as is" without warranties of any kind. We are not liable for any damages arising from your use of the service. This includes but is not limited to errors, omissions, interruptions, deletions, defects, or delays in operation or transmission.
            </p>
          </div>
        </section>

        {/* Service Modifications */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-[var(--text-primary)]">Service Modifications</h2>
          <div className="bg-[var(--card-bg)] rounded-lg p-6">
            <p className="text-[var(--text-secondary)] leading-relaxed">
              We reserve the right to modify, suspend, or discontinue any part of the service at any time. We may also limit certain features or restrict access to parts or all of the service without notice or liability.
            </p>
          </div>
        </section>

        {/* User Content */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-[var(--text-primary)]">User Content</h2>
          <div className="bg-[var(--card-bg)] rounded-lg p-6 space-y-4">
            <p className="text-[var(--text-secondary)]">You are responsible for:</p>
            <ul className="list-disc pl-6 space-y-2 text-[var(--text-secondary)]">
              <li>The content of all SVG files you upload</li>
              <li>Ensuring you have the right to use and convert the files</li>
              <li>Any consequences of using the converted 3D models</li>
              <li>Maintaining backups of your original files</li>
            </ul>
          </div>
        </section>

        {/* Termination */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-[var(--text-primary)]">Termination</h2>
          <div className="bg-[var(--card-bg)] rounded-lg p-6">
            <p className="text-[var(--text-secondary)] leading-relaxed">
              We may terminate or suspend your access to the service immediately, without prior notice or liability, for any reason, including breach of these terms. Upon termination, your right to use the service will immediately cease.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-[var(--text-primary)]">Contact Us</h2>
          <div className="bg-[var(--card-bg)] p-6 rounded-lg">
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              If you have any questions about these terms and conditions, please contact us:
            </p>
            <a 
              href="mailto:legal@chromorph.com" 
              className="inline-block bg-[var(--foreground)] text-[var(--background)] px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-colors"
            >
              Contact Legal Team →
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}

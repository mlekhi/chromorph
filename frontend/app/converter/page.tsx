'use client';

import UploadForm from '@/components/sections/UploadForm';

export default function Converter() {
  const handleUploadSuccess = (url: string) => {
    window.location.href = `/viewer?model=${url}`;
  };

  return (
    <main className="container mx-auto px-4 py-24">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center text-[var(--text-primary)]">Convert Your SVG</h1>
        <p className="text-lg text-[var(--text-secondary)] text-center mb-12">
          Transform your SVG into a stunning 3D model with one click.
        </p>
        <UploadForm onUploadSuccess={handleUploadSuccess} />
      </div>
    </main>
  );
}

"use client";

import React, { useState } from 'react';
import UploadForm from '../components/UploadForm';
import GLBViewer from '../components/GLBViewer';

const HomePage: React.FC = () => {
  const [glbUrl, setGlbUrl] = useState<string | null>(null);

  const handleUploadSuccess = (url: string) => {
    setGlbUrl(url);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">SVG to GLB Converter</h1>
      {!glbUrl ? (
        <UploadForm onUploadSuccess={handleUploadSuccess} />
      ) : (
        <div className="mt-8 w-full max-w-4xl">
          <h2 className="text-2xl font-bold mb-4">Preview your GLB Model</h2>
          <GLBViewer glbUrl={glbUrl} />
          <a
            href={glbUrl}
            download="scene.glb"
            className="mt-4 inline-block px-4 py-2 bg-green-500 text-white rounded"
          >
            Download GLB
          </a>
        </div>
      )}
    </div>
  );
};

export default HomePage;

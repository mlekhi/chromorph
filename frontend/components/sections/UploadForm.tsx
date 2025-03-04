"use client";

import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface UploadFormProps {
  onUploadSuccess: (glbUrl: string) => void;
}

const UploadForm: React.FC<UploadFormProps> = ({ onUploadSuccess }) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      setError(null);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/svg+xml': ['.svg'],
    },
  });

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:8000/upload/', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: 'Upload failed' }));
        throw new Error(errorData.detail || 'Upload failed');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      onUploadSuccess(url);
      router.push(`/viewer?model=${encodeURIComponent(url)}`);
    } catch (error) {
      console.error(error);
      setError(error instanceof Error ? error.message : 'Upload failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="w-full max-w-md mx-auto bg-[var(--card-bg)] rounded-lg border border-[var(--card-border)] shadow-xl overflow-hidden"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div 
        {...getRootProps()} 
        className="cursor-pointer p-6 text-center hover:bg-[var(--card-border)] transition-colors duration-200"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-lg text-[var(--text-primary)]">Drop your SVG here ...</p>
        ) : (
          <div className="space-y-2">
            <p className="text-lg text-[var(--text-primary)]">Drag & drop your SVG file here</p>
            <p className="text-sm text-[var(--text-secondary)]">or click to browse</p>
          </div>
        )}
      </div>
      {file && (
        <motion.div
          className="px-6 py-3 border-t border-[var(--card-border)] bg-[var(--card-bg)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-sm text-[var(--text-secondary)]">
            Selected: <span className="font-medium text-[var(--text-primary)]">{file.name}</span>
          </p>
        </motion.div>
      )}
      {error && (
        <motion.div
          className="px-6 py-3 border-t border-red-500/20 bg-red-500/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-sm text-red-500">{error}</p>
        </motion.div>
      )}
      <div className="p-6">
        <motion.button
          onClick={handleUpload}
          disabled={!file || loading}
          className="w-full bg-[var(--foreground)] text-[var(--background)] px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={file && !loading ? { scale: 1.02 } : {}}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {loading ? 'Converting...' : 'Convert to 3D →'}
        </motion.button>
        {loading && (
          <motion.p
            className="mt-4 text-sm text-center text-[var(--text-secondary)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            Processing your SVG... This may take a moment.
          </motion.p>
        )}
      </div>
    </motion.div>
  );
};

export default UploadForm;


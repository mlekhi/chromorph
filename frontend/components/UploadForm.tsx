"use client";

import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface UploadFormProps {
  onUploadSuccess: (glbUrl: string) => void;
}

const UploadForm: React.FC<UploadFormProps> = ({ onUploadSuccess }) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/svg+xml',
  });

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      // Adjust the URL if your FastAPI backend runs elsewhere.
      const response = await fetch('http://localhost:8000/upload/', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      onUploadSuccess(url);
    } catch (error) {
      console.error(error);
      alert('Upload failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-4 border-2 border-dashed border-gray-400 rounded">
      <div {...getRootProps()} className="cursor-pointer p-6 text-center">
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the SVG file here ...</p>
        ) : (
          <p>Drag 'n' drop an SVG file here, or click to select file</p>
        )}
      </div>
      {file && <p className="mt-2">Selected File: {file.name}</p>}
      <button
        onClick={handleUpload}
        disabled={!file || loading}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
      >
        Upload and Convert
      </button>
      {loading && (
        <div className="mt-4">
          <p>Processing... Please wait.</p>
        </div>
      )}
    </div>
  );
};

export default UploadForm;

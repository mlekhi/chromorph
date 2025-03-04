import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Convert SVG to 3D | Chromorph',
  description: 'Convert your SVG files into beautiful 3D models for Chrome with one click.',
};

export default function ConverterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 
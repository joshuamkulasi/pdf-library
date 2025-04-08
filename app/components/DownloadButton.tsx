'use client';

import React, { useState } from 'react';
import { incrementDownloadCount } from '../lib/storage';

interface DownloadButtonProps {
  filename: string;
  title: string;
  bookId: number;
  initialDownloadCount?: number;
}

export default function DownloadButton({ 
  filename, 
  title, 
  bookId,
  initialDownloadCount = 0 
}: DownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    try {
      setIsDownloading(true);
      await incrementDownloadCount(bookId);
      // The download will start automatically after the click event completes
    } catch (error) {
      console.error('Error incrementing download count:', error);
      // Prevent download if there's an error
      e.preventDefault();
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <a
      href={`/books/${filename}`}
      download
      onClick={handleDownload}
      className={`inline-flex items-center px-3 py-1 text-sm text-black bg-yellow-400 rounded hover:bg-yellow-500 transition-colors ${
        isDownloading ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      <svg 
        className={`w-4 h-4 mr-2 ${isDownloading ? 'animate-spin' : ''}`} 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
        />
      </svg>
      {isDownloading ? 'Downloading...' : 'Download'}
    </a>
  );
} 
import React from 'react';

interface DownloadButtonProps {
  filename: string;
  title: string;
}

export default function DownloadButton({ filename, title }: DownloadButtonProps) {
  return (
    <a
      href={`/books/${filename}`}
      download
      className="inline-flex items-center px-3 py-1 text-sm text-black bg-yellow-400 rounded hover:bg-yellow-500 transition-colors"
    >
      <svg 
        className="w-4 h-4 mr-2" 
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
      Download
    </a>
  );
} 
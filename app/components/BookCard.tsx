'use client';

import { Book } from '../data/books';
import Image from 'next/image';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  const handleDownload = () => {
    // Start file download
    const downloadUrl = `/books/${book.filename}`;
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = book.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 w-full">
        <Image
          src={book.cover}
          alt={book.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{book.title}</h3>
        <p className="text-sm text-gray-600 mb-2">By {book.author}</p>
        <p className="text-sm text-gray-500 mb-4 line-clamp-2">{book.description}</p>
        <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
          <span>{book.category}</span>
          <span>Added: {new Date(book.addedDate).toLocaleDateString()}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Downloads: {book.downloadCount}</span>
          <button
            onClick={handleDownload}
            className="flex items-center gap-1 px-4 py-2 bg-yellow-400 text-black rounded-md hover:bg-yellow-300 transition-colors duration-300"
          >
            <ArrowDownTrayIcon className="h-5 w-5" />
            Download
          </button>
        </div>
      </div>
    </div>
  );
} 
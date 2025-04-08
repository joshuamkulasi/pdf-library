'use client';

import { Book } from '../data/books';
import Image from 'next/image';
import DownloadButton from './DownloadButton';
import { useState, useEffect } from 'react';
import { getDownloadCount } from '../lib/storage';

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  const [downloadCount, setDownloadCount] = useState(book.downloadCount || 0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const updateDownloadCount = async () => {
      try {
        const count = await getDownloadCount(book.id);
        setDownloadCount(count);
      } catch (error) {
        console.error('Error fetching download count:', error);
      } finally {
        setIsLoading(false);
      }
    };
    updateDownloadCount();
  }, [book.id]);

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
          <span className="text-sm text-gray-500">
            {isLoading ? 'Loading...' : `Downloads: ${downloadCount}`}
          </span>
          <DownloadButton 
            filename={book.filename} 
            title={book.title} 
            bookId={book.id}
            initialDownloadCount={downloadCount}
          />
        </div>
      </div>
    </div>
  );
} 
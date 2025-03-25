import React from 'react';
import Link from 'next/link';
import DownloadButton from '../../components/DownloadButton';
import { getBooksByCategory } from '@/app/data/books';
import BookCard from '@/app/components/BookCard';

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const categoryName = decodeURIComponent(params.category).split('-').map((word)=>word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  const categoryBooks = getBooksByCategory(categoryName);

  return (
    <div className="min-h-screen bg-red-900">
      {/* Header Section */}
      <div className="bg-black">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-yellow-400">
            {categoryName}
          </h1>
          <p className="mt-2 text-white">
            Browse our collection of {categoryName.toLowerCase()} books
          </p>
        </div>
      </div>

      {/* Books Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categoryBooks.map((book) => (
            <div 
              key={book.id} 
              className="bg-white rounded-lg shadow-sm hover:shadow-yellow-400/50 hover:shadow-lg transition-shadow duration-200 overflow-hidden border-2 border-yellow-400"
            >
              <div className="p-6">
                <div className="flex items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-black">
                      {book.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">{book.author}</p>
                    <p className="mt-2 text-sm text-gray-700">{book.description}</p>
                    <div className="mt-3 space-y-3">
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span className="bg-black text-white px-2 py-1 rounded">
                          {book.category}
                        </span>
                        <span>
                          Added: {new Date(book.addedDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          Downloads: {book.downloadCount}
                        </span>
                        <DownloadButton filename={book.filename} title={book.title} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 
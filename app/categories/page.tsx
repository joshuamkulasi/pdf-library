import React from 'react';
import Link from 'next/link';
import { getAllBooks } from '../data/books';

export default async function CategoriesPage() {
  try {
    const books = await getAllBooks() || [];
    
    // Get unique categories and their counts
    const categories = books.reduce((acc, book) => {
      const category = book.category;
      if (!acc[category]) {
        acc[category] = {
          name: category,
          count: 0,
          slug: category.toLowerCase().replace(/\s+/g, '-')
        };
      }
      acc[category].count++;
      return acc;
    }, {} as Record<string, { name: string; count: number; slug: string }>);

    return (
      <div className="min-h-screen bg-red-900">
        {/* Header Section */}
        <div className="bg-black">
          <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-yellow-400">
              Categories
            </h1>
            <p className="mt-2 text-white">
              Browse books by category
            </p>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Object.values(categories).map((category) => (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}`}
                className="bg-white rounded-lg shadow-sm hover:shadow-yellow-400/50 hover:shadow-lg transition-shadow duration-200 overflow-hidden border-2 border-yellow-400"
              >
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-black">
                    {category.name}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">
                    {category.count} {category.count === 1 ? 'book' : 'books'}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error in CategoriesPage:', error);
    return (
      <div className="min-h-screen bg-red-900 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Categories</h1>
          <p className="text-gray-600">
            We're having trouble loading the categories. Please try refreshing the page.
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }
} 
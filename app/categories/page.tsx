import React from 'react';
import Link from 'next/link';

export default function CategoriesPage() {
  const categories = [
    {
      id: 'electrical',
      name: 'Electrical',
      description: 'Standards and guidelines for electrical installations and systems',
      bookCount: 4,
      image: '/categories/electrical.jpg'
    },
    {
      id: 'classic-literature',
      name: 'Classic Literature',
      description: 'Timeless works that have shaped literary history',
      bookCount: 45,
      image: '/categories/classics.jpg'
    },
    {
      id: 'science-fiction',
      name: 'Science Fiction',
      description: 'Explore futuristic worlds and scientific possibilities',
      bookCount: 28,
      image: '/categories/scifi.jpg'
    },
    {
      id: 'mystery',
      name: 'Mystery & Thriller',
      description: 'Suspenseful tales of crime and intrigue',
      bookCount: 36,
      image: '/categories/mystery.jpg'
    },
    {
      id: 'romance',
      name: 'Romance',
      description: 'Stories of love and relationships',
      bookCount: 42,
      image: '/categories/romance.jpg'
    },
    {
      id: 'non-fiction',
      name: 'Non-Fiction',
      description: 'Educational and informative works',
      bookCount: 67,
      image: '/categories/nonfiction.jpg'
    }
  ];

  return (
    <div className="min-h-screen bg-red-900">
      {/* Header Section */}
      <div className="bg-black">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-yellow-400">
            Browse Categories
          </h1>
          <p className="mt-2 text-white">
            Explore our collection by genre and category
          </p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.id}`}
              className="group bg-white rounded-lg shadow-sm hover:shadow-yellow-400/50 hover:shadow-lg transition-shadow duration-200 overflow-hidden border-2 border-yellow-400"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold text-black group-hover:text-gray-900">
                  {category.name}
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  {category.description}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {category.bookCount} books
                  </span>
                  <span className="inline-flex items-center text-yellow-400 group-hover:text-yellow-500">
                    Browse
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 
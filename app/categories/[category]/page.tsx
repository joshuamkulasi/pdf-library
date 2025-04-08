import React from 'react';
import Link from 'next/link';
import { getBooksByCategory } from '../../data/books';
import BookCard from '../../components/BookCard';

interface PageProps {
  params: {
    category: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  // Decode and normalize the category name
  const categoryName = decodeURIComponent(params.category)
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  try {
    // Get books for the category
    let categoryBooks = await getBooksByCategory(categoryName);

    // Handle sorting based on searchParams
    const sortBy = searchParams.sort as string;
    if (sortBy === 'date') {
      categoryBooks.sort((a, b) => new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime());
    } else if (sortBy === 'rating') {
      categoryBooks.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === 'downloads') {
      categoryBooks.sort((a, b) => (b.downloadCount || 0) - (a.downloadCount || 0));
    }

    // If no books found, show a message
    if (categoryBooks.length === 0) {
      return (
        <div className="min-h-screen bg-red-900">
          <div className="bg-black">
            <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold text-yellow-400">
                {categoryName}
              </h1>
              <p className="mt-2 text-white">
                No books found in this category.
              </p>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-white text-lg">Try browsing our other categories.</p>
              <Link 
                href="/categories" 
                className="mt-4 inline-block text-yellow-400 hover:text-yellow-300"
              >
                View All Categories
              </Link>
            </div>
          </div>
        </div>
      );
    }

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
            {/* Sorting Options */}
            <div className="mt-4 flex space-x-4">
              <Link 
                href={`/categories/${params.category}`}
                className="text-white hover:text-yellow-400"
              >
                Default
              </Link>
              <Link 
                href={`/categories/${params.category}?sort=date`}
                className="text-white hover:text-yellow-400"
              >
                Sort by Date
              </Link>
              <Link 
                href={`/categories/${params.category}?sort=rating`}
                className="text-white hover:text-yellow-400"
              >
                Sort by Rating
              </Link>
              <Link 
                href={`/categories/${params.category}?sort=downloads`}
                className="text-white hover:text-yellow-400"
              >
                Sort by Downloads
              </Link>
            </div>
          </div>
        </div>

        {/* Books Grid */}
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categoryBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error loading category:', error);
    return (
      <div className="min-h-screen bg-red-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-yellow-400 mb-4">Error Loading Category</h1>
          <p className="text-white">We're having trouble loading the books. Please try again later.</p>
          <Link 
            href="/categories" 
            className="mt-4 inline-block text-yellow-400 hover:text-yellow-300"
          >
            Return to Categories
          </Link>
        </div>
      </div>
    );
  }
} 
import React from 'react';
import { searchBooks } from '../data/books';
import DownloadButton from '../components/DownloadButton';

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const query = searchParams.q || '';
  const searchResults = searchBooks(query);

  return (
    <div className="min-h-screen bg-red-900">
      {/* Search Results Header */}
      <div className="bg-black">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <form action="/search" method="GET" className="relative">
            <input
              type="text"
              name="q"
              defaultValue={query}
              placeholder="Search books..."
              className="w-full px-4 py-2 text-gray-900 bg-white border border-yellow-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            />
            <button 
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-600 hover:text-red-700"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </form>
        </div>
      </div>

      {/* Search Results */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-yellow-400">
            {query ? `Search Results for "${query}"` : 'All Books'}
          </h2>
          <span className="text-white">
            {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'} found
          </span>
        </div>

        {searchResults.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {searchResults.map((book) => (
              <div 
                key={book.id} 
                className="bg-white rounded-lg shadow-sm hover:shadow-yellow-400/50 hover:shadow-lg transition-shadow duration-200 overflow-hidden border-2 border-yellow-400"
                style={{
                  opacity: Math.max(0.7, book.relevance)
                }}
              >
                <div className="p-6">
                  <div className="flex items-start">
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-semibold text-black">
                          {book.title}
                        </h3>
                        {query && (
                          <span className="ml-2 text-xs text-gray-500">
                            {Math.round(book.relevance * 100)}% match
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-gray-600">{book.author}</p>
                      <p className="mt-2 text-sm text-gray-700">{book.description}</p>
                      <div className="mt-3 space-y-3">
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <span className="bg-black text-white px-2 py-1 rounded">
                            {book.category}
                          </span>
                          <span>
                            Added: {book.addedDate}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">
                            Downloads: {book.downloadCount || 0}
                          </span>
                          <DownloadButton 
                            filename={book.filename} 
                            title={book.title} 
                            bookId={book.id}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-white text-lg">
              No books found matching your search. Try different keywords.
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 
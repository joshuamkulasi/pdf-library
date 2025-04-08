import { getBooksByCategory, type Book } from '@/app/data/books';
import BookCard from '@/app/components/BookCard';
import { Metadata } from 'next';

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = decodeURIComponent(params.category);
  return {
    title: `${category} Books - PDF Library`,
    description: `Browse and download PDF books in the ${category} category`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const category = decodeURIComponent(params.category);
  
  try {
    const books: Book[] = await getBooksByCategory(category);

    if (!books || books.length === 0) {
      return (
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">{category} Books</h1>
          <p className="text-gray-600">No books found in this category.</p>
        </div>
      );
    }

    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">{category} Books</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error loading books:', error);
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">{category} Books</h1>
        <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
          <p className="text-red-600">Error loading books. Please try again later.</p>
        </div>
      </div>
    );
  }
}
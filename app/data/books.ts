import { getDownloadCount } from '../lib/storage';

export interface Book {
  id: number;
  title: string;
  author: string;
  filename: string;
  cover: string;
  category: string;
  addedDate: string;
  description: string;
  rating?: number;
  downloadCount?: number;
}

export const books: Book[] = [
  {
    id: 1,
    title: "AS/NZS 5033:2021",
    author: "Joint Technical Committee EL-042, Standards Australia",
    filename: "Joint Technical Committee EL-042, Standards Australia - AS_NZS 5033_2021 - Installation and safety requirements for photovoltaic (PV) arrays (2021, Standards Australia) - libgen.li.pdf",
    cover: "/books/covers/AS_NZS_5033_2021.jpg", // Default cover will be used if not available
    category: "Electrical",
    addedDate: "2025-03-23",
    description: "Installation and safety requirements for photovoltaic (PV) arrays - Australian/New Zealand Standard",
    rating: 4.8
  },
  {
    id: 2,
    title: "AS/NZS 5139:2019",
    author: "Joint Technical Committee EL-042, Standards Australia & Standards New Zealand",
    filename: "Joint Technical Committee EL-042, Standards Australia - AS_NZS 5139_2019 - Electrical installations — Saf...of battery systems for use with power conversion equipment (2019, Standards Australia, Standards New Zealand) - libgen.li.pdf",
    cover: "/books/covers/AS_NZS_5139_2019.jpg",
    category: "Electrical",
    addedDate: "2025-03-22",
    description: "Electrical installations — Safety requirements for battery systems used with power conversion equipment - Australian/New Zealand Standard",
    rating: 4.7
  },
  {
    id: 4,
    title: "PPL Electrical Trade Circular",
    author: "PNG Power Limited",
    filename: "PNG - PPL Electrical Trade Circular 4th Edition.pdf",
    cover: "/books/covers/PPL_Electrical_Trade_Circular.jpg",
    category: "Electrical",
    addedDate: "2025-03-21",
    description: "Fourth Edition of the PNG Power Limited Electrical Trade Circular - Guidelines and standards for electrical installations in Papua New Guinea",
    rating: 4.6
  },
  {
    id: 5,
    title: "AS/NZS 3000:2018",
    author: "Standards Australia",
    filename: "AS 3000-2018_V6.pdf",
    cover: "/books/covers/AS_NZS_3000_2018.jpg",
    category: "Electrical",
    addedDate: "2025-03-20",
    description: "Electrical installations (known as the Australian/New Zealand Wiring Rules) - The essential standard for all electrical installations in Australia and New Zealand",
    rating: 4.9
  }
  // Add more books here
];

export async function getAllBooks(): Promise<Book[]> {
  // Temporarily return static books without download counts
  return books;
}

export async function getBookById(id: number): Promise<Book | undefined> {
  const book = books.find(book => book.id === id);
  if (!book) return undefined;
  
  return book;
}

export async function getBooksByCategory(category: string): Promise<Book[]> {
  const normalizedCategory = category.toLowerCase().trim();
  return books.filter(book => 
    book.category.toLowerCase().trim() === normalizedCategory
  );
}

function calculateSimilarity(str1: string, str2: string): number {
  const s1 = str1.toLowerCase();
  const s2 = str2.toLowerCase();
  
  // Check for exact substring match
  if (s1.includes(s2) || s2.includes(s1)) {
    return 1;
  }
  
  // Calculate word-level similarity
  const words1 = s1.split(/\s+/);
  const words2 = s2.split(/\s+/);
  
  let matchCount = 0;
  for (const word1 of words1) {
    for (const word2 of words2) {
      if (word1.includes(word2) || word2.includes(word1)) {
        matchCount++;
      }
    }
  }
  
  return matchCount / Math.max(words1.length, words2.length);
}

interface SearchResult extends Book {
  relevance: number;
}

export function searchBooks(query: string): SearchResult[] {
  const normalizedQuery = query.toLowerCase().trim();
  
  if (!normalizedQuery) {
    return books.map(book => ({ ...book, relevance: 1 }));
  }

  const results = books.map(book => {
    const titleSimilarity = calculateSimilarity(book.title, normalizedQuery);
    const authorSimilarity = calculateSimilarity(book.author, normalizedQuery);
    const descriptionSimilarity = calculateSimilarity(book.description, normalizedQuery);
    const categorySimilarity = calculateSimilarity(book.category, normalizedQuery);
    
    // Weight different fields differently
    const relevance = Math.max(
      titleSimilarity * 1.0,       // Title matches are most important
      authorSimilarity * 0.8,      // Author matches are next
      categorySimilarity * 0.7,    // Category matches are next
      descriptionSimilarity * 0.5  // Description matches are least important
    );

    return {
      ...book,
      relevance
    };
  });

  // Filter and sort by relevance
  return results
    .filter(result => result.relevance > 0.1) // Only show somewhat relevant results
    .sort((a, b) => b.relevance - a.relevance);
} 
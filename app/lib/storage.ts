// Simple in-memory storage for download counts
const downloadCounts = new Map<number, number>();

export async function getDownloadCount(bookId: number): Promise<number> {
  return downloadCounts.get(bookId) || 0;
}

export async function incrementDownloadCount(bookId: number): Promise<number> {
  const currentCount = downloadCounts.get(bookId) || 0;
  const newCount = currentCount + 1;
  downloadCounts.set(bookId, newCount);
  return newCount;
} 
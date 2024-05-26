export interface Show {
  id: number;
  name: string;
  genres: string[];
  rating: {
    average: number;
  };
  image: {
    medium: string;
    original: string;
  };
  summary: string;
  premiered: string;
  language: string;
}

export interface SearchResult {
  show: Show;
  score: number;
}

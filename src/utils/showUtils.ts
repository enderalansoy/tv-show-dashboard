import { Show } from "../types/show";

export const categorizeAndSortShows = (
  shows: Show[]
): Record<string, Show[]> => {
  const showsByGenre = new Map<string, Show[]>();

  shows.forEach((show) => {
    show.genres.forEach((genre) => {
      const genreShows = showsByGenre.get(genre) || [];
      genreShows.push(show);
      showsByGenre.set(genre, genreShows);
    });
  });

  const sortedShowsByGenre: Record<string, Show[]> = {};
  showsByGenre.forEach((genreShows, genre) => {
    sortedShowsByGenre[genre] = genreShows.sort(
      (a, b) => (b.rating.average || 0) - (a.rating.average || 0)
    );
  });

  return sortedShowsByGenre;
};

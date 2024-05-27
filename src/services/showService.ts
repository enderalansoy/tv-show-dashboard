import axios from 'axios';
import { SearchResult, Show } from '../types/show';
import { useToast } from '../plugins/toast';
import { Episode } from '../types/episode';

const API_BASE_URL = 'https://api.tvmaze.com';
const toast = useToast();

/**
 * Fetches TV shows from the TVMaze API.
 * @param {number} numberOfPages - The number of pages to fetch. Defaults to 1 if not provided.
 * @returns {Promise<Show[]>} - A promise that resolves to an array of shows.
 */
export const fetchShows = async (
  numberOfPages: number = 1
): Promise<Show[]> => {
  const fetchPage = async (page: number): Promise<Show[]> => {
    const response = await axios.get<Show[]>(
      `${API_BASE_URL}/shows?page=${page}`
    );
    return response.data;
  };

  try {
    const promises = [];
    for (let i = 0; i < numberOfPages; i++) {
      promises.push(fetchPage(i));
    }

    const results = await Promise.all(promises);
    toast.show('Shows loaded successfully!', 'success');
    return results.flat();
  } catch (error) {
    toast.show('Failed to fetch shows', 'error');
    throw new Error('Failed to fetch shows');
  }
};

/**
 * Fetches a specific TV show by its ID from the TVMaze API.
 * @param {string} id - The ID of the show.
 * @returns {Promise<Show>} - A promise that resolves to the show details.
 */
export const fetchShowById = async (id: string): Promise<Show> => {
  try {
    const response = await axios.get<Show>(`${API_BASE_URL}/shows/${id}`);
    toast.show('Show loaded successfully!', 'success');
    return response.data;
  } catch (error) {
    toast.show(`Failed to fetch show with id ${id}`, 'error');
    throw new Error(`Failed to fetch show with id ${id}`);
  }
};

/**
 * Fetches episodes of a specific TV show by its ID from the TVMaze API.
 * @param {string} showId - The ID of the show.
 * @returns {Promise<Episode[]>} - A promise that resolves to an array of episodes.
 */
export const fetchEpisodes = async (showId: string): Promise<Episode[]> => {
  try {
    const response = await axios.get<Episode[]>(
      `${API_BASE_URL}/shows/${showId}/episodes`
    );
    toast.show('Episodes loaded successfully!', 'success');
    return response.data;
  } catch (error) {
    toast.show(`Failed to fetch episodes for show with id ${showId}`, 'error');
    throw new Error(`Failed to fetch episodes for show with id ${showId}`);
  }
};

/**
 * Searches for shows on the TV Maze API based on a query.
 *
 * @param query - The search query.
 * @returns A promise that resolves to an array of SearchResult objects.
 * @throws An error if the request fails.
 */
export const searchShows = async (query: string): Promise<SearchResult[]> => {
  try {
    const response = await axios.get<SearchResult[]>(
      `${API_BASE_URL}/search/shows`,
      {
        params: {
          q: query,
        },
      }
    );
    toast.show('Search results loaded successfully!', 'success');
    return response.data;
  } catch (error) {
    toast.show(`Failed to search for shows with query "${query}"`, 'error');
    throw new Error(`Failed to search for shows with query "${query}"`);
  }
};

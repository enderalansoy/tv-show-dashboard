import axios from "axios";
import { SearchResult, Show } from "../types/show";
import { useToast } from "../plugins/toast";

const API_BASE_URL = "http://api.tvmaze.com";
const toast = useToast();

export const fetchShows = async (): Promise<Show[]> => {
  try {
    const response = await axios.get<Show[]>(`${API_BASE_URL}/shows`);
    toast.show("Shows loaded successfully!", "success");
    return response.data;
  } catch (error) {
    toast.show("Failed to fetch shows", "error");
    throw new Error("Failed to fetch shows");
  }
};

export const fetchShowById = async (id: string): Promise<Show> => {
  try {
    const response = await axios.get<Show>(`${API_BASE_URL}/shows/${id}`);
    toast.show("Show loaded successfully!", "success");
    return response.data;
  } catch (error) {
    toast.show(`Failed to fetch show with id ${id}`, "error");
    throw new Error(`Failed to fetch show with id ${id}`);
  }
};

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
    toast.show("Search results loaded successfully!", "success");
    return response.data;
  } catch (error) {
    toast.show(`Failed to search for shows with query "${query}"`, "error");
    throw new Error(`Failed to search for shows with query "${query}"`);
  }
};

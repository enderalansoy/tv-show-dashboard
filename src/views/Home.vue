<template>
  <div class="tv-show-dashboard">
    <h1 class="tv-show-dashboard__title">TV Show Dashboard</h1>
    <TextField
      v-model="searchQuery"
      placeholder="Search for TV shows..."
      :debounce-time="300"
      aria-label="Search for TV shows"
    />
    <Spinner :is-loading="isLoading" />
    <div v-if="!isLoading && !isSearching">
      <ShowList
        v-for="genre in genres"
        :key="genre"
        :title="genre"
        :shows="showsByGenre[genre]"
      />
    </div>
    <div
      v-if="!isLoading && isSearching"
      class="tv-show-dashboard__search-results"
    >
      <ShowList title="Search Results" :shows="searchResults" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from 'vue';
import TextField from '../components/TextField.vue';
import Spinner from '../components/Spinner.vue';
import ShowList from '../components/ShowList.vue';
import { fetchShows, searchShows } from '../services/showService';
import { categorizeAndSortShows } from '../utils/showUtils';
import { Show } from '../types/show';

export default defineComponent({
  name: 'TVShowDashboard',
  components: { TextField, Spinner, ShowList },
  setup() {
    /**
     * Array of genres for TV shows.
     * @type {Ref<string[]>}
     */
    const genres = ref<string[]>([]);

    /**
     * Object containing shows categorized by genre.
     * @type {Ref<Record<string, Show[]>>}
     */
    const showsByGenre = ref<Record<string, Show[]>>({});

    /**
     * The search query entered by the user.
     * @type {Ref<string>}
     */
    const searchQuery = ref<string>('');

    /**
     * Array of shows matching the search query.
     * @type {Ref<Show[]>}
     */
    const searchResults = ref<Show[]>([]);

    /**
     * Indicates whether data is currently loading.
     * @type {Ref<boolean>}
     */
    const isLoading = ref<boolean>(true);

    /**
     * Indicates whether the user is currently searching.
     * @type {Ref<boolean>}
     */
    const isSearching = ref<boolean>(false);

    /**
     * Fetches and categorizes TV shows by genre.
     * @returns {Promise<void>}
     */
    const fetchAndCategorizeShows = async () => {
      try {
        const shows = await fetchShows();
        const sortedShowsByGenre = categorizeAndSortShows(shows);
        showsByGenre.value = sortedShowsByGenre;
        genres.value = Object.keys(sortedShowsByGenre);
      } catch (error) {
        console.error(error);
      } finally {
        isLoading.value = false;
      }
    };

    /**
     * Handles the input event for the search query.
     * @returns {Promise<void>}
     */
    const handleSearchInput = async () => {
      if (searchQuery.value.trim() === '') {
        isSearching.value = false;
        return;
      }

      isLoading.value = true;
      isSearching.value = true;

      try {
        const results = await searchShows(searchQuery.value);
        searchResults.value = results.map(result => result.show);
      } catch (error) {
        console.error(error);
      } finally {
        isLoading.value = false;
      }
    };

    onMounted(() => {
      fetchAndCategorizeShows();
    });

    watch(searchQuery, handleSearchInput);

    return {
      genres,
      showsByGenre,
      searchQuery,
      searchResults,
      isLoading,
      isSearching,
    };
  },
});
</script>

<style scoped>
.tv-show-dashboard {
  margin-bottom: var(--margin-large);
}

.tv-show-dashboard__title {
  font-size: var(--font-size-large);
  margin-bottom: var(--margin-medium);
}

.tv-show-dashboard__search-results {
  margin-top: var(--margin-large);
}
</style>

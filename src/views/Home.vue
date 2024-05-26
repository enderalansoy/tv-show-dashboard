<template>
  <div class="tv-show-dashboard">
    <h1 class="tv-show-dashboard__title">TV Show Dashboard</h1>
    <TextField v-model="searchQuery" placeholder="Search for TV shows..." :debounceTime="300" />
    <Spinner :isLoading="isLoading" />
    <div v-if="!isLoading && !isSearching">
      <ShowList v-for="genre in genres" :key="genre" :title="genre" :shows="showsByGenre[genre]" />
    </div>
    <div v-if="!isLoading && isSearching" class="tv-show-dashboard__search-results">
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
  components: { TextField, Spinner, ShowList },
  setup() {
    const genres = ref<string[]>([]);
    const showsByGenre = ref<Record<string, Show[]>>({});
    const searchQuery = ref<string>('');
    const searchResults = ref<Show[]>([]);
    const isLoading = ref<boolean>(true);
    const isSearching = ref<boolean>(false);

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

    return { genres, showsByGenre, searchQuery, searchResults, isLoading, isSearching };
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

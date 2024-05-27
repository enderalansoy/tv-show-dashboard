<template>
  <div class="episode-list">
    <h2 class="episode-list__title">Episodes</h2>
    <div v-if="episodes.length === 0" class="episode-list__empty">
      No episodes available.
    </div>
    <EpisodeItem
      v-for="episode in episodes"
      :key="episode.id"
      :episode="episode"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Episode } from '../../types/episode';
import EpisodeItem from './EpisodeItem.vue';

export default defineComponent({
  name: 'EpisodeList',
  components: { EpisodeItem },
  props: {
    /**
     * The list of episodes.
     * @type {Episode[]}
     * @required
     */
    episodes: {
      type: Array as PropType<Episode[]>,
      required: true,
    },
  },
});
</script>

<style scoped>
.episode-list {
  margin-top: var(--margin-large);
}

.episode-list__title {
  text-align: center;
  font-size: var(--font-size-large);
  margin-bottom: var(--margin-medium);
}

.episode-list__empty {
  font-size: var(--font-size-small);
  color: var(--color-text-muted);
}
</style>

<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="episode-item">
    <div class="episode-item__header">
      <h3 class="episode-item__title">
        <span class="episode-item__number">
          S{{ episode.season }}E{{ episode.number }}
        </span>
        {{ episode.name }}
      </h3>

      <BaseButton class="episode-item__toggle" @click="toggleSummary">
        {{ isSummaryVisible ? 'Hide Summary' : 'Show Summary' }}
      </BaseButton>
    </div>
    <p
      v-if="isSummaryVisible"
      class="episode-item__summary"
      v-html="episode.summary"
    ></p>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { Episode } from '../../types/episode';
import BaseButton from '../BaseButton.vue';

export default defineComponent({
  name: 'EpisodeItem',
  components: { BaseButton },
  props: {
    /**
     * The episode details.
     * @type {Episode}
     * @required
     */
    episode: {
      type: Object as PropType<Episode>,
      required: true,
    },
  },
  setup() {
    const isSummaryVisible = ref(false);

    /**
     * Toggles the visibility of the episode summary.
     */
    const toggleSummary = () => {
      isSummaryVisible.value = !isSummaryVisible.value;
    };

    return { isSummaryVisible, toggleSummary };
  },
});
</script>

<style scoped>
.episode-item {
  margin-bottom: var(--margin-medium);
  padding: var(--margin-medium);
  border: 1px solid var(--color-secondary);
  border-radius: var(--border-radius);
  background-color: var(--color-background-light);
  transition: background-color var(--transition-duration);
}

.episode-item:hover {
  background-color: var(--color-secondary-light);
}

.episode-item__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.episode-item__title {
  font-size: var(--font-size-medium);
}

.episode-item__number {
  font-size: var(--font-size-small);
  color: var(--color-text-muted);
}

.episode-item__summary {
  font-size: var(--font-size-small);
  margin-top: var(--margin-small);
}
</style>

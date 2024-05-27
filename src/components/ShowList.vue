<template>
  <div class="show-list">
    <h2 v-if="title" class="show-list__title">{{ title }}</h2>
    <div class="show-list__wrapper">
      <BaseButton
        class="show-list__button"
        aria-label="Scroll left"
        @click="scrollTo(-400)"
      >
        <font-awesome-icon icon="chevron-left" />
      </BaseButton>
      <div ref="listContainer" class="show-list__items" role="list">
        <ShowCard
          v-for="show in shows"
          :key="show.id"
          :show="show"
          class="show-list__item"
        />
      </div>
      <BaseButton
        class="show-list__button"
        aria-label="Scroll right"
        @click="scrollTo(400)"
      >
        <font-awesome-icon icon="chevron-right" />
      </BaseButton>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent, ref } from 'vue';
import ShowCard from './ShowCard.vue';
import BaseButton from './BaseButton.vue';
import { Show } from '../types/show';

export default defineComponent({
  name: 'ShowList',
  components: { ShowCard, BaseButton },
  props: {
    /**
     * The title of the show list.
     * @type {string}
     * @default ''
     */
    title: {
      type: String as PropType<string>,
      default: '',
    },
    /**
     * The array of shows to display.
     * @type {Show[]}
     * @required
     */
    shows: {
      type: Array as PropType<Show[]>,
      required: true,
    },
  },
  setup() {
    const listContainer = ref<HTMLDivElement | null>(null);

    /**
     * Scrolls the show list horizontally by a specified value.
     * @param {number} value - The amount to scroll by, in pixels.
     */
    const scrollTo = (value: number) => {
      if (listContainer.value) {
        listContainer.value.scrollBy({ left: value, behavior: 'smooth' });
      }
    };

    return { listContainer, scrollTo };
  },
});
</script>

<style scoped>
.show-list {
  margin-bottom: var(--margin-large);
  position: relative;
}

.show-list__title {
  font-size: var(--font-size-medium);
  margin-bottom: var(--margin-small);
}

.show-list__wrapper {
  display: flex;
  align-items: center;
  margin-left: calc(-3 * var(--margin-medium));
  margin-right: calc(-3 * var(--margin-medium));
  padding-right: var(--margin-medium);
  padding-left: var(--margin-medium);
}

.show-list__items {
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.show-list__items::-webkit-scrollbar {
  display: none;
}

.show-list__item {
  margin-right: var(--margin-medium);
}

.show-list__button {
  font-size: var(--font-size-large);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--margin-small);
  background-color: var(--primary-color);
  color: var(--text-color);
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: background-color var(--transition-duration);
}

.show-list__button:hover {
  background-color: var(--secondary-color);
}
</style>

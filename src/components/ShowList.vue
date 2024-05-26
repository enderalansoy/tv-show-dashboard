<template>
  <div class="show-list">
    <h2 v-if="title" class="show-list__title">{{ title }}</h2>
    <div class="show-list__wrapper">
      <Button class="show-list__button" @click="scrollTo(-500)">
        <font-awesome-icon icon="chevron-left" />
      </Button>
      <div class="show-list__items" ref="listContainer">
        <ShowCard v-for="show in shows" :key="show.id" :show="show" class="show-list__item" />
      </div>
      <Button class="show-list__button" @click="scrollTo(500)">
        <font-awesome-icon icon="chevron-right" />
      </Button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import ShowCard from './ShowCard.vue';
import Button from './Button.vue';
import { Show } from '../types/show';

export default defineComponent({
  name: 'ShowList',
  components: { ShowCard, Button },
  props: {
    title: {
      type: String as PropType<string>,
      default: '',
    },
    shows: {
      type: Array as PropType<Show[]>,
      required: true,
    },
  },
  setup() {
    const listContainer = ref<HTMLDivElement | null>(null);

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

<template>
  <div class="show-card">
    <router-link :to="`/show/${show.id}`" class="show-card__link">
      <img :src="show.image?.medium" :alt="show.name" class="show-card__image" />
      <div class="show-card__rating">{{ show.rating.average || '?' }}</div>
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Show } from '../types/show';

export default defineComponent({
  name: 'ShowCard',
  props: {
    show: {
      type: Object as PropType<Show>,
      required: true,
    },
  },
});
</script>

<style scoped>
.show-card {
  position: relative;
  cursor: pointer;
}

.show-card__link {
  display: block;
  text-decoration: none;
  color: inherit;
}

.show-card__image {
  height: auto;
  display: block;
  transition: filter 0.3s;
  border-radius: var(--border-radius);
}

.show-card:active .show-card__image,
.show-card:hover .show-card__image {
  filter: brightness(0.7);
}

.show-card__rating {
  position: absolute;
  top: var(--margin-small);
  right: var(--margin-small);
  background-color: var(--color-accent);
  color: var(--color-text);
  padding: var(--margin-small) var(--margin-medium);
  border-radius: var(--border-radius);
  font-size: var(--font-size-small);
  font-weight: bold;
}
</style>

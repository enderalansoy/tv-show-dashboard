<template>
  <div class="show-detail-header">
    <BaseButton
      class="show-detail-header__back-button"
      aria-label="Go back"
      @click="$emit('goBack')"
    >
      <font-awesome-icon icon="arrow-left" />
    </BaseButton>
    <h1 class="show-detail-header__title">{{ title }}</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import BaseButton from '../BaseButton.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default defineComponent({
  name: 'DetailHeader',
  components: { BaseButton, FontAwesomeIcon },
  props: {
    /**
     * The title of the detail view.
     * @type {string}
     * @required
     */
    title: {
      type: String as PropType<string>,
      required: true,
    },
  },
  emits: ['goBack'],
});
</script>

<style scoped>
.show-detail-header {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: var(--margin-medium);
}

.show-detail-header__back-button {
  background: none;
  border: none;
  color: var(--color-text);
  cursor: pointer;
  font-size: var(--font-size-large);
  transition: color var(--transition-duration);
}

.show-detail-header__back-button:hover {
  color: var(--color-accent);
}

.show-detail-header__title {
  font-size: var(--font-size-large);
  margin-left: var(--margin-medium);
}
</style>

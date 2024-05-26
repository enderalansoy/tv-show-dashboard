<template>
  <div class="show-detail-header">
    <Button class="show-detail-header__back-button" @click="$emit('goBack')">
      <font-awesome-icon icon="arrow-left" />
    </Button>
    <h1 class="show-detail-header__title">{{ title }}</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Button from '../../components/Button.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default defineComponent({
  name: 'DetailHeader',
  components: { Button, FontAwesomeIcon },
  props: {
    title: {
      type: String as PropType<string>,
      required: true
    }
  }
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

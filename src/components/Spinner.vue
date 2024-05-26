<template>
  <div class="spinner" v-if="isLoading">
    <div class="spinner__circle"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'Spinner',
  props: {
    isLoading: {
      type: Boolean as PropType<boolean>,
      required: true,
    },
  },
});
</script>

<style scoped>
.spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.spinner__circle {
  border: 8px solid rgba(0, 0, 0, 0.1);
  border-left-color: var(--color-accent);
  border-radius: 50%;
  width: 64px;
  height: 64px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>

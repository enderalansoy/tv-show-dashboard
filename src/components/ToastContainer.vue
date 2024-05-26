<template>
  <div class="toast-container">
    <div v-for="toast in toasts" :key="toast.id"
      :class="['toast-container__toast', `toast-container__toast--${toast.type}`]">
      {{ toast.message }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { toastState } from '../plugins/toast';

export default defineComponent({
  name: 'ToastContainer',
  setup() {
    const toasts = toastState.messages;
    return { toasts };
  },
});
</script>

<style scoped>
.toast-container {
  position: fixed;
  top: var(--margin-large);
  right: var(--margin-large);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: var(--margin-small);
}

.toast-container__toast {
  padding: var(--margin-medium);
  border-radius: var(--border-radius);
  text-align: center;
  box-shadow: 0 2px 8px var(--color-shadow);
}

.toast-container__toast--success {
  background-color: var(--toast-success-bg);
  color: var(--toast-success-text);
}

.toast-container__toast--error {
  background-color: var(--toast-error-bg);
  color: var(--toast-error-text);
}
</style>

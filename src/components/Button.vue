<template>
  <button class="button" :class="buttonClasses" @click="handleClick">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'Button',
  props: {
    variant: {
      type: String as PropType<'primary' | 'secondary'>,
      default: 'primary',
    },
    size: {
      type: String as PropType<'small' | 'medium' | 'large'>,
      default: 'medium',
    },
  },
  computed: {
    buttonClasses() {
      return [`button--${this.variant}`, `button--${this.size}`];
    },
  },
  methods: {
    handleClick(event: Event) {
      this.$emit('click', event);
    },
  },
});
</script>

<style scoped>
.button {
  border: none;
  cursor: pointer;
  font-family: inherit;
  border-radius: var(--border-radius);
  transition: background-color var(--transition-duration), color var(--transition-duration);
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.button--primary {
  background-color: var(--primary-color);
  color: var(--text-color);
}

.button--primary:hover {
  background-color: var(--secondary-color);
  color: var(--color-accent);
}

.button--secondary {
  background-color: var(--accent-color);
  color: #000;
}

.button--secondary:hover {
  background-color: darken(var(--accent-color), 10%);
}

.button--small {
  padding: var(--margin-small) var(--margin-medium);
  font-size: var(--font-size-small);
}

.button--medium {
  padding: var(--margin-medium) var(--margin-large);
  font-size: var(--font-size-medium);
}

.button--large {
  padding: var(--margin-large);
  font-size: var(--font-size-large);
}
</style>

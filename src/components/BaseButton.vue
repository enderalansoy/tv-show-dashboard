<template>
  <button
    class="button"
    :class="buttonClasses"
    :aria-label="ariaLabel"
    @click="handleClick"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'BaseButton',
  props: {
    /**
     * The variant of the button.
     * @default 'primary'
     */
    variant: {
      type: String as PropType<'primary' | 'secondary'>,
      default: 'primary',
    },
    /**
     * The size of the button.
     * @default 'medium'
     */
    size: {
      type: String as PropType<'small' | 'medium' | 'large'>,
      default: 'medium',
    },
    /**
     * The aria-label for the button.
     * @type {string}
     */
    ariaLabel: {
      type: String as PropType<string>,
      default: '',
    },
  },
  emits: ['click'],
  computed: {
    /**
     * Computes the CSS classes for the button based on its variant and size.
     * @returns {string[]} The array of CSS classes.
     */
    buttonClasses(): string[] {
      return [`button--${this.variant}`, `button--${this.size}`];
    },
  },
  methods: {
    /**
     * Handles the click event and emits the 'click' event.
     * @param {Event} event - The click event.
     */
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
  transition:
    background-color var(--transition-duration),
    color var(--transition-duration);
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.button--primary {
  background-color: var(--color-primary);
  color: var(--color-text);
}

.button--primary:hover {
  background-color: var(--color-secondary);
  color: var(--color-accent);
}

.button--secondary {
  background-color: var(--color-accent);
  color: var(--color-black);
}

.button--secondary:hover {
  background-color: darken(var(--color-accent), 10%);
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

<template>
  <input
    :value="modelValue"
    :placeholder="placeholder"
    class="text-field"
    aria-label="Text input field"
    @input="handleInput"
  />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { debounce } from '../utils/debounce';

export default defineComponent({
  name: 'TextField',
  props: {
    /**
     * The value of the text input.
     * @type {string}
     * @required
     */
    modelValue: {
      type: String as PropType<string>,
      required: true,
    },
    /**
     * The placeholder text for the input.
     * @type {string}
     * @default ''
     */
    placeholder: {
      type: String as PropType<string>,
      default: '',
    },
    /**
     * The debounce time in milliseconds for the input event.
     * @type {number}
     * @default 0
     */
    debounceTime: {
      type: Number as PropType<number>,
      default: 0,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    /**
     * Handles the input event and emits the updated value.
     * @param {Event} event - The input event.
     */
    const handleInput = debounce((event: Event) => {
      const target = event.target as HTMLInputElement;
      emit('update:modelValue', target.value);
    }, props.debounceTime);

    return { handleInput };
  },
});
</script>

<style scoped>
.text-field {
  padding: var(--margin-medium);
  margin-bottom: var(--margin-medium);
  width: 100%;
  font-size: var(--font-size-medium);
  box-sizing: border-box;
  border: none;
  background-color: var(--color-primary);
  color: var(--color-text);
  border-radius: var(--border-radius);
}
</style>

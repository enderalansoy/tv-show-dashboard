<template>
  <input :value="modelValue" @input="handleInput" :placeholder="placeholder" class="text-field" />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { debounce } from '../utils/debounce';

export default defineComponent({
  name: 'TextField',
  props: {
    modelValue: {
      type: String as PropType<string>,
      required: true,
    },
    placeholder: {
      type: String as PropType<string>,
      default: '',
    },
    debounceTime: {
      type: Number as PropType<number>,
      default: 0,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
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

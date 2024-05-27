<template>
  <div class="show-detail-item">
    <span class="show-detail-item__label">{{ label }}</span>
    <span class="show-detail-item__value">{{ value }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'DetailItem',
  props: {
    /**
     * The label for the detail item.
     * @type {string}
     * @required
     */
    label: {
      type: String as PropType<string>,
      required: true,
    },
    /**
     * The value of the detail item.
     * @type {string | number}
     * @required
     */
    value: {
      type: [String, Number] as PropType<string | number>,
      required: true,
    },
  },
});
</script>

<style scoped>
.show-detail-item {
  margin-bottom: var(--margin-small);
}

.show-detail-item__label {
  font-weight: bold;
  margin-right: var(--margin-small);
}

.show-detail-item__value {
  font-size: var(--font-size-small);
}
</style>

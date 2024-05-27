<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="show-detail-summary" v-html="sanitizedSummary"></div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';
import DOMPurify from 'dompurify';

export default defineComponent({
  name: 'DetailSummary',
  props: {
    /**
     * The HTML summary of the detail.
     * @type {string}
     * @required
     */
    summary: {
      type: String as PropType<string>,
      required: true,
    },
  },
  setup(props) {
    /**
     * Sanitizes the summary HTML to prevent XSS attacks.
     * @returns {string} The sanitized HTML summary.
     */
    const sanitizedSummary = computed(() => {
      return DOMPurify.sanitize(props.summary);
    });

    return { sanitizedSummary };
  },
});
</script>

<style scoped>
.show-detail-summary {
  font-size: var(--font-size-medium);
  line-height: 1.5;
  margin-bottom: var(--margin-medium);
}
</style>

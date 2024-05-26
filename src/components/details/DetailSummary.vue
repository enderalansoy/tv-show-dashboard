<template>
  <div class="show-detail-summary" v-html="summary"></div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'DetailSummary',
  props: {
    summary: {
      type: String as PropType<string>,
      required: true
    }
  }
});
</script>

<style scoped>
.show-detail-summary {
  font-size: var(--font-size-medium);
  line-height: 1.5;
  margin-bottom: var(--margin-medium);
}
</style>

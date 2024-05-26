<template>
  <div class="show-detail">
    <Spinner :isLoading="isLoading" />
    <div v-if="!isLoading && show">
      <DetailHeader :title="show.name" @goBack="goBack" />
      <div class="show-detail__background" :style="{ backgroundImage: `url(${show.image?.original})` }">
        <div class="show-detail__overlay"></div>
      </div>
      <div class="show-detail__content">
        <img :src="show.image?.medium" :alt="show.name" class="show-detail__image" />
        <div class="show-detail__info">
          <DetailItem label="Genre:" :value="show.genres.join(', ')" />
          <DetailItem label="Rating:" :value="show.rating.average" />
          <DetailItem label="Premiered:" :value="show.premiered" />
          <DetailItem label="Language:" :value="show.language" />
          <DetailSummary :summary="show.summary" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Spinner from '../components/Spinner.vue';
import DetailHeader from '../components/details/DetailHeader.vue';
import DetailItem from '../components/details/DetailItem.vue';
import DetailSummary from '../components/details/DetailSummary.vue';
import { fetchShowById } from '../services/showService';
import { Show } from '../types/show';

export default defineComponent({
  components: { Spinner, DetailHeader, DetailItem, DetailSummary },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const show = ref<Show | null>(null);
    const isLoading = ref<boolean>(true);

    const fetchShow = async (id: string) => {
      try {
        show.value = await fetchShowById(id);
      } catch (error) {
        console.error(error);
      } finally {
        isLoading.value = false;
      }
    };

    const goBack = () => {
      router.back();
    };

    onMounted(() => {
      const id = route.params.id as string;
      fetchShow(id);
    });

    return { show, isLoading, goBack };
  },
});
</script>

<style scoped>
.show-detail {
  position: relative;
  color: var(--color-text);
  border-radius: var(--border-radius);
  background-color: var(--color-background);
  padding: var(--margin-large);
}

.show-detail__background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  filter: blur(20px);
  z-index: -1;
}

.show-detail__overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 1));
  z-index: -1;
}

.show-detail__content {
  display: flex;
  align-items: flex-start;
  margin-top: var(--margin-large);
  flex-wrap: wrap;
}

.show-detail__image {
  border-radius: var(--border-radius);
  margin-right: var(--margin-large);
  max-width: 100%;
}

.show-detail__info {
  max-width: 60%;
}

@media (max-width: 768px) {
  .show-detail__content {
    flex-direction: column;
    align-items: center;
  }

  .show-detail__image {
    margin-right: 0;
    margin-bottom: var(--margin-medium);
  }

  .show-detail__info {
    max-width: 100%;
  }

  .show-detail-header {
    justify-content: center;
  }

  .show-detail-header__back-button {
    position: absolute;
    left: var(--margin-medium);
  }
}
</style>

<template>
  <div id="app">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" :key="$route.fullPath"></component>
      </keep-alive>
    </router-view>

    <ToastContainer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import './styles/main.css'
import './styles/theme.css'

export default defineComponent({
  name: 'App',
});
</script>

<style>
#app {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--margin-large);
}
</style>


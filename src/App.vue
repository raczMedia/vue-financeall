<script setup lang="ts">
  import { computed } from "vue";
  import { useRoute } from "vue-router";
  import DefaultLayout from "./pages/_layouts/DefaultLayout.vue";

  const route = useRoute();

  const layout = computed(() => {
    return route.meta.layout || DefaultLayout;
  })
</script>

<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<style src="./css/common.css" />

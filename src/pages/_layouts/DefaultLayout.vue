<script lang="ts" setup>
  import Navigation from '@/components/Navigation.vue';
  import Footer from '@/components/Footer.vue';
</script>

<template>
  <div class="flex justify-center items-center bg-gray-100" aria-label="content">
    <main class="max-w-screen-xl w-full shadow-lg min-h-screen bg-white relative">
      <Navigation />
      <slot />
      <!-- <Footer /> -->
    </main>
  </div>
</template>

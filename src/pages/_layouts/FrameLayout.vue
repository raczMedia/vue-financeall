<script lang="ts" setup>
  import Navigation from '@/components/Navigation.vue';
  import Footer from '@/components/Footer.vue';
</script>

<template>
  <div class="flex justify-center items-center bg-gray-100" aria-label="content" id="app">
    <Suspense>
      <main class="flex flex-col min-h-screen" id="content">
          <slot />
      </main>
    </Suspense>
  </div>
</template>

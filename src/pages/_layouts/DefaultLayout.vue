<script lang="ts" setup>
  import Navigation from '@/components/Navigation.vue';
  import Footer from '@/components/Footer.vue';
</script>

<template>
  <div class="flex justify-center items-center bg-gray-100" aria-label="content" id="app">
    <Suspense>
      <main class="max-w-[1600px] w-full shadow-lg min-h-screen bg-white">
        <Navigation />
        <section class="flex flex-col min-h-screen">
          <slot />
        </section>
        <Footer />
      </main>
    </Suspense>
  </div>
</template>

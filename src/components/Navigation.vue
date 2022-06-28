<script lang="ts" setup>
  import { useOnScroll } from "vue-composable";
  import { useStoryblokState } from '../composables/storyblokComposable';
  import { useRoute } from 'vue-router';
  import { scrollToElement } from '../composables/scrollToElementComposable';

  const route = useRoute();
  const { scrollTop } = useOnScroll();
  const { content, state } = await useStoryblokState('navigation');

  const scrollTo = (identifier: string) => scrollToElement(identifier);
</script>

<template>
  <nav 
    class="fixed top-0 w-full pt-4 max-w-screen-xl transition-all duration-300 z-30" 
    :class="scrollTop ? 'bg-white/95': 'bg-transparent'"
    aria-label="primary"
  >
    <div class="flex items-center px-32">
      <img 
        class="w-[125px]"
        aria-label="Navigation Logo"
        src="https://a.storyblok.com/f/155950/x/0726342c27/financeall-logo.svg" 
      />
      <section class="flex gap-6 ml-8">
        <template v-for="link in content.Links" :key="`link-${link.address}`">
          <template v-if="link.address === 'contact'">
            <div
              v-if="route.name === 'Home'"
              @click="scrollTo('#contact')"
              class="pb-1 link cursor-pointer border-b border-transparent hover:border-fa-secondary-blue transition-all duration-200"
            >
              Contact
            </div>
            <router-link 
              v-else
              to="/?contact=true"
              class="pb-1 link cursor-pointer border-b border-transparent hover:border-fa-secondary-blue transition-all duration-200"
            >
              {{ link.title }}
            </router-link>
          </template>
          <a
            v-else-if="link.title === 'Inventory'"
            :href="link.address"
            target="_blank"
            class="pb-1 link cursor-pointer border-b border-transparent hover:border-fa-secondary-blue transition-all duration-200"
          >
            {{ link.title }}
          </a>
          <router-link 
            v-else
            :to="link.address"
            class="pb-1 link cursor-pointer border-b border-transparent hover:border-fa-secondary-blue transition-all duration-200"
          >
            {{ link.title }}
          </router-link>
        </template>  
      </section>
    </div>
    <div class="h-[1px] bg-gray-400 opacity-30 w-full mt-4"></div>  
  </nav>
</template>

<style>
  .link:not(.router-link-active) {
    @apply text-gray-500 font-medium;
  }
  .router-link-active {
    @apply text-fa-blue font-bold;
  }
</style>

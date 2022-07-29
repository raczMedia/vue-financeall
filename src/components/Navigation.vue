<script lang="ts" setup>
  import { useOnScroll } from "vue-composable";
  import { useStoryblokState } from '../composables/storyblokComposable';
  import { useRoute } from 'vue-router';
  import { computed, ref, onBeforeMount, onUnmounted, onMounted, watch } from 'vue';
  import { scrollToElement } from '../composables/scrollToElementComposable';
  import { useViewport } from '../composables/viewportComposable';

  type Link = {
    address: string,
    title: string
  }
  
  const scrollTo = (identifier: string) => scrollToElement(identifier);
  const { isDesktop, isMobile } = useViewport();
  const menuOpen = ref(false);
  const route = useRoute();
  const { scrollTop } = useOnScroll();
  const { content, state } = await useStoryblokState('navigation');
  const activeLink = computed((): Link => {
    if (! content.value.Links) {
      return { title: "Home", address: "/"};
    }
    
    return content.value.Links.find((link: Link) => `/${link.address}` == route.path || link.address == route.path)
  })
  const resetMenuOpen = () => {
    menuOpen.value = isDesktop.value;
  }

  onBeforeMount(() => {
    window.addEventListener('resize', resetMenuOpen);
  });

  watch(route, (to) => {
    menuOpen.value = isDesktop.value;
  }, {flush: 'pre', immediate: true, deep: true})

  onMounted(() => {
    resetMenuOpen();
  });

  onUnmounted(() => {
    window.removeEventListener('resize', resetMenuOpen);
  });
</script>

<template>
  <nav 
    class="fixed top-0 w-full pt-4 max-w-[1600px] transition-all duration-300 z-30" 
    :class="scrollTop ? 'bg-white/95': 'bg-white lg:bg-transparent'"
    aria-label="primary"
  >
    <div class="flex items-center px-8 lg:px-32 py-2">
      <img 
        class="w-[125px]"
        aria-label="Navigation Logo"
        src="https://a.storyblok.com/f/155950/x/0726342c27/financeall-logo.svg" 
      />
      <div 
        class="flex items-center lg:hidden gap-1 font-semibold flex-grow justify-end cursor-pointer text-lg" 
        @click="menuOpen = !menuOpen"
      >
        <span>{{ activeLink.title }}</span>
        <font-awesome-icon icon="fa-solid fa-chevron-down" />
      </div>
      <section 
        class="
          flex flex-col ml-8 absolute top-16 bg-gray-100 right-8 p-4 text-right rounded-lg gap-3
          lg:flex-row lg:relative lg:bg-transparent lg:right-auto lg:top-auto lg:p-0 lg:text-left lg:gap-6
        "
        :class="{'hidden': !menuOpen}"
      >
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

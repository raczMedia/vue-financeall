<script lang="ts" setup>
    import { useOnScroll } from "vue-composable";
    const { scrollTop } = useOnScroll();

    // const storyapi = useStoryApi();
    // const { data } = await storyapi.get('cdn/stories/navigation', {
    //     version: 'draft',
    // });
    // const state = reactive({
    //     story: data.story,
    // });

    // onMounted(() => {
    //     useStoryBridge(state.story.id, event => {
    //         state.story = event
    //     })
    // });
    
    // const linkList = computed(() => {
    //     return state.story.content.Links;
    // })
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
            <ul class="flex gap-6 ml-8">
                <!-- <router-link
                    v-for="link in linkList" 
                    :key="`link-${link.address}`"
                    :to="link.address" 
                    class="pb-1 nuxtlink cursor-pointer border-b border-transparent hover:border-fa-secondary-blue transition-all duration-200"
                >
                    {{ link.title }}
                </router-link> -->
            </ul>
        </div>
        <div class="h-[1px] bg-gray-400 opacity-30 w-full mt-4"></div>  
    </nav>
</template>

<style>
    .nuxtlink:not(.router-link-active) {
        @apply text-gray-500 font-medium;
    }
    .router-link-active {
        @apply text-fa-blue font-bold;
    }
</style>

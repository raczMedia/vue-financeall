<script lang="ts" setup>
    import { computed, onMounted, ref } from 'vue';
    import { useRoute } from 'vue-router';
    import Header from './partials/Header.vue';
    import Lenders from './partials/Lenders.vue';
    import Bullets from './partials/Bullets.vue';
    import Reviews from './partials/Reviews.vue';
    import Contact from './partials/Contact.vue';
    import { useStoryblokState, useBridge } from '../../composables/storyblokComposable';
    import { scrollToElement } from '../../composables/scrollToElementComposable';
    
    const route = useRoute();
    const content = ref();
    onMounted(async () => {
        const results = await useStoryblokState('home', "draft");
        content.value = results.content.value;

        if (route.query.contact === 'true') {
            setTimeout(() => {
                scrollToElement('#contact')
            }, 200)
        }

        useBridge(results.state);
    });

    

    const contentWrapper = computed(() => {
        let list: {
            Header: any,
            Lenders: any,
            Bullets: any,
            Reviews: any,
            Contact: any,
        } = {
            Header: {},
            Lenders: {},
            Bullets: {},
            Reviews: {},
            Contact: {},
        };

        if (! content.value) {
            return list;
        }

        Object.keys(content.value.body).forEach((key: string, index: number): void => {
            // @ts-ignore
            list[content.value.body[index].component] = content.value.body[index];
        })

        return list;
    })
</script>

<template>
    <section v-if="content" class="relative">
        <Header :content="contentWrapper.Header" />
        <Lenders :content="contentWrapper.Lenders" />
        <div class="relative">
            <Bullets :content="contentWrapper.Bullets" />
            <Reviews :content="contentWrapper.Reviews" />
            <Contact :content="contentWrapper.Contact" />
            <div class="absolute z-10 clip-left-up-right bg-gray-400/10 right-0 top-0 w-1/4 h-full"></div>
            <div class="absolute z-10 clip-left-up-right bg-gray-400/10 right-0 top-0 w-2/5 h-full"></div>
        </div> 
    </section>
</template>

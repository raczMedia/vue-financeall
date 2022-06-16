<script setup>
    import Lenders from './partials/Lenders.vue';
    import Header from './partials/Header.vue';
    import Bullets from './partials/Bullets.vue';
    import Reviews from './partials/Reviews.vue';
    import Contact from './partials/Contact.vue';

    // const storyapi = useStoryApi();
    // const { data } = await storyapi.get('cdn/stories/home', {
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

    // const lenders = computed(() => state.story.content.body.find(content => {
    //     return content.component == 'Lenders'
    // }));

    // const header = computed(() => state.story.content.body.find(content => {
    //     return content.component == 'Header'
    // }));

    // const bullets = computed(() => state.story.content.body.find(content => {
    //     return content.component == 'Bullets'
    // }));

    // const reviews = computed(() => state.story.content.body.find(content => {
    //     return content.component == 'Reviews'
    // }));

    // const contact = computed(() => state.story.content.body.find(content => {
    //     return content.component == 'Contact'
    // }));
</script>

<template>
    <main class="relative">
        home page broham
        <!-- <Header :content="header" />
        <Lenders :content="lenders" />
        <div class="relative">
            <Bullets :content="bullets" />
            <Reviews :content="reviews" />
            <Contact :content="contact" />
            <div class="absolute z-10 clip-left-up-right bg-gray-400/10 right-0 top-0 w-1/4 h-full"></div>
            <div class="absolute z-10 clip-left-up-right bg-gray-400/10 right-0 top-0 w-2/5 h-full"></div>
        </div> -->
    </main>
</template>

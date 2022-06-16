<script lang="ts" setup>
    // const storyapi = useStoryApi();
    // const { data } = await storyapi.get('cdn/stories/footer', {
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
    
    // const content = computed(() => {
    //     return state.story.content;
    // })
</script>

<template>
    <footer class="relative -mt-10 z-10">
        <div class="absolute inset-0 clip-top-up-right bg-fa-blue"></div>
        <div class="relative min-h-64 px-32 pt-32 pb-16 text-white flex justify-between content-stretch">
            <section class="flex flex-col">
                <img :src="content.logo.filename" alt="" class="flex-grow-0 self-start">
                <p class="text-gray-400 flex-grow flex items-end">
                    {{ content.copyright }}
                </p>
            </section>
            <section class="flex flex-col">
                <ul class="flex gap-4 text-gray-300">
                    <li v-for="(link, linkIndex) in content.links" :key="`footer-link-${linkIndex}`">
                        {{ link.title }}
                    </li>
                </ul>
                <div class="flex gap-16 mt-16">
                    <ul>
                        <li 
                            v-for="(social, socialIndex) in content.socials" 
                            :key="`footer-socials-${socialIndex}`"
                            class="flex justify-between gap-4"
                        >
                            <span>
                                {{ social.icon }}
                            </span>
                            <p>
                                {{ social.title }}
                            </p>
                        </li>
                    </ul>
                    <ul>
                        <li 
                            v-for="(contacts, contactsIndex) in content.contacts" 
                            :key="`footer-contactss-${contactsIndex}`"
                            class="flex justify-between gap-4"
                        >
                            <span>
                                {{ contacts.icon }}
                            </span>
                            <p>
                                {{ contacts.title }}
                            </p>
                        </li>
                    </ul>
                </div>
            </section>
        </div>
    </footer>
</template>

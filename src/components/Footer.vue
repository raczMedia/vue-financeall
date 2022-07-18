<script lang="ts" setup>
    import { useStoryblokState, useBridge } from '../composables/storyblokComposable';
    const { content, state } = await useStoryblokState('footer');
</script>

<template>
    <footer class="relative -mt-10 z-10">
        <div class="absolute inset-0 clip-top-up-right bg-fa-blue"></div>
        <div class="
            relative min-h-64 px-8 pt-32 pb-16 text-white flex flex-col justify-between content-stretch
            md:px-32 md:flex-row
        ">
            <section class="
                flex flex-col gap-8 mb-8 
                md:gap-0 md:mb-0
            ">
                <img :src="content?.logo?.filename" alt="" class="flex-grow-0 self-start">
                <p class="text-gray-400 flex-grow flex items-end">
                    {{ content.copyright }}
                </p>
            </section>
            <section class="flex flex-col">
                <ul class="
                    flex flex-col gap-4 text-gray-300
                    md:flex-row
                ">
                    <li 
                        v-for="(link, linkIndex) in content.links" 
                        :key="`footer-link-${linkIndex}`"
                    >
                        {{ link.title }}
                    </li>
                </ul>
                <div class="
                    flex flex-col gap-8 mt-8
                    md:gap-16 md:mt-16 md:flex-row
                ">
                    <ul class="
                        flex flex-col gap-4 
                        md:gap-0"
                    >
                        <li 
                            v-for="(social, socialIndex) in content.socials" 
                            :key="`footer-socials-${socialIndex}`"
                            class="
                                flex gap-4
                                md:justify-between 
                            "
                        >
                            <span>
                                <font-awesome-icon :icon="`fa-brands fa-${social.icon}`" />
                            </span>
                            <p class="text-gray-300">
                                {{ social.title }}
                            </p>
                        </li>
                    </ul>
                    <ul class="
                        flex flex-col gap-4 
                        md:gap-0"
                    >
                        <li 
                            v-for="(contacts, contactsIndex) in content.contacts" 
                            :key="`footer-contacts-${contactsIndex}`"
                            class="
                                flex gap-4
                                md:justify-between 
                            "
                        >
                            <span class="w-4 text-center">
                                <font-awesome-icon :icon="`fa-solid fa-${contacts.icon}`" />
                            </span>
                            <p class="text-gray-300">
                                {{ contacts.title }}
                            </p>
                        </li>
                    </ul>
                </div>
            </section>
        </div>
    </footer>
</template>

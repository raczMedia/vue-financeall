<script lang="ts" setup>
    import { toRefs } from 'vue';
    // type Content = {
    //     header_image: { filename: string }
    //     all_image: { filename: string }
    //     title: string
    //     title_line_2: string
    //     description: string
    //     button_1: string
    //     button_2: string
    // }
    
    const props = defineProps({
        content: Object
    })
</script>

<template>
    <header aria-label="Welcome section" class="px-32 py-32 bg-cover bg-center bg-no-repeat" :style="`background-image: url(${ props.content.header_image.filename })`">
        <div class="mt-32">
            <p class="font-bold text-fa-blue text-5xl">
                {{ props.content.title }}
            </p>
            <div class="flex gap-2 items-center pt-4">
                <img :src="props.content?.all_image.filename" alt="">
                <p class="font-bold text-fa-blue text-5xl">
                    {{ props.content.title_line_2 }}
                </p>
            </div>
        </div>
        <p class="w-1/2 text-gray-400 font-semibold pt-4 text-xl">
            {{ props.content.description }}
        </p>
        <div class="flex gap-4 my-8">
            <button class="bg-fa-blue text-white py-4 px-8 rounded-lg">
                {{ props.content.button_1 }}
            </button>
            <button class="bg-fa-secondary-blue text-white py-4 px-8 rounded-lg">
                {{ props.content.button_2 }}
            </button>
        </div>
    </header>
</template>

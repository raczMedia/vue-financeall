<script lang="ts" setup>
    import { defineProps } from 'vue';

    type Content = {
        header_image: { filename: string }
        all_image: { filename: string }
        title: string
        title_line_2: string
        description: string
        button_1: string
        button_2: string
    }
    interface Props {
        content: Content;
    }
    
    const props = defineProps<Props>();
</script>

<template>
    <header 
        aria-label="Welcome section" 
        class="px-8 lg:px-32 py-32 bg-cover bg-center bg-no-repeat flex flex-col items-center lg:items-baseline" 
        :style="`background-image: url(${ props.content.header_image.filename })`"
    >
        <div class="mt-8 lg:mt-32 text-center lg:text-left">
            <p class="font-bold text-fa-blue text-4xl lg:text-5xl">
                {{ props.content.title }}
            </p>
            <div class="flex gap-2 items-center pt-4">
                <img :src="props.content?.all_image.filename" alt="" class="w-12 lg:w-auto">
                <p class="font-bold text-fa-blue text-3xl lg:text-5xl">
                    {{ props.content.title_line_2 }}
                </p>
            </div>
        </div>
        <p class="
            w-3/4 text-gray-500 font-semibold text-2xl leading-relaxed text-center py-14
            lg:w-1/3 lg:text-gray-400 lg:text-xl lg:text-left lg:pb-0 lg:pt-4
            xl:text-2xl xl:pt-8
        ">
            {{ props.content.description }}
        </p>
        <div class="flex gap-4 my-4 lg:my-8">
            <button class="bg-fa-blue text-white p-4 lg:px-8 rounded-lg">
                {{ props.content.button_1 }}
            </button>
            <button class="bg-fa-secondary-blue text-white py-4 px-4 lg:px-8 rounded-lg">
                {{ props.content.button_2 }}
            </button>
        </div>
    </header>
</template>

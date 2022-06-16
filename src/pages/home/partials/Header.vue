<script lang="ts" setup>
    import { useAttrs } from 'vue'
    const attrs = useAttrs();
    
    interface Content {
        header_image: { filename: string }
        all_image: { filename: string }
        title: string
        title_line_2: string
        description: string
        button_1: string
        button_2: string
    }

    const content = computed((): Content => attrs.content);
</script>

<template>
    <header aria-label="Welcome section" class="px-32 py-32 bg-cover bg-center bg-no-repeat" :style="`background-image: url(${ content.header_image.filename })`">
        <template v-if="content">

        </template>
        <div class="mt-32">
            <p class="font-bold text-fa-blue text-5xl">
                {{ content.title }}
            </p>
            <div class="flex gap-2 items-center pt-4">
                <img :src="content.all_image.filename" alt="">
                <p class="font-bold text-fa-blue text-5xl">
                    {{ content.title_line_2 }}
                </p>
            </div>
        </div>
        <p class="w-1/2 text-gray-400 font-semibold pt-4 text-xl">
            {{ content.description }}
        </p>
        <div class="flex gap-4 my-8">
            <button class="bg-fa-blue text-white py-4 px-8 rounded-lg">
                {{ content.button_1 }}
            </button>
            <button class="bg-fa-secondary-blue text-white py-4 px-8 rounded-lg">
                {{ content.button_2 }}
            </button>
        </div>
    </header>
</template>

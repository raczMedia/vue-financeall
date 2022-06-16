<script lang="ts" setup>
    import { useAttrs } from 'vue'
    const props = useAttrs();


    interface Lender {
        filename: string
    }

    interface Lenders {
        title: string
        items: Lender[]
        slogan: string
        sloganImage: { filename: string }
    }

    const content = computed((): Lenders => props.content);
</script>

<template>
    <section 
        aria-label="Lenders section" 
        class="relative text-white min-h-64 pt-24 pb-12 px-32 flex flex-col -mt-12"
    >
        <div class="absolute z-0 inset-0 clip-top-up-right bg-fa-blue overflow-hidden">
            <div class="absolute z-0 clip-right-up-right bg-gray-400/5 left-0 top-0 w-2/3 h-full"></div>
            <div class="absolute z-0 clip-right-up-right bg-gray-400/5 left-0 top-0 w-2/4 h-full"></div>
        </div>

        <p class="z-10 text-center text-lg font-bold">
            {{ content.title }}
        </p>
        
        <section class="z-10 flex gap-4 justify-between mt-4">
            <template v-if="content">
                <article v-for="(item, index) in content.items" :key="`lender-${index}`">
                    <img :src="item.filename" alt="rbc">
                </article>
            </template>
        </section>

        <div class="relative flex justify-between mt-32 items-start w-full z-10">
            <article class="border-l-4 border-white pl-3 mt-8 w-1/5 text-4xl leading-[48px]">
                {{ content.slogan }}
            </article>
            <img :src="content.sloganImage.filename" alt="rbc" class="absolute right-0 -top-8 w-4/5">
        </div>
    </section>
</template>

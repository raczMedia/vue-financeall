<script lang="ts" setup>
    import { toRefs } from 'vue';
    
    interface Lender {
        filename: string
    }
    
    type Content = {
        title: string
        items: Lender[]
        slogan: string
        sloganImage: { filename: string }
    }

    interface Props {
        content: Content;
    }

    const props = defineProps<Props>();
</script>

<template>
    <section 
        aria-label="Lenders section" 
        class="relative text-white min-h-64 pt-24 pb-12 px-8 lg:px-32 flex flex-col -mt-12"
    >
        <div class="absolute z-0 inset-0 -top-12 lg:top-0 clip-top-up-right bg-fa-blue overflow-hidden">
            <div class="absolute z-0 clip-right-up-right bg-gray-400/5 left-0 top-0 w-2/3 h-full"></div>
            <div class="absolute z-0 clip-right-up-right bg-gray-400/5 left-0 top-0 w-2/4 h-full"></div>
        </div>

        <p class="z-10 text-center text-2xl font-bold">
            {{ props.content.title }}
        </p>
        
        <section class="z-10 flex justify-between mt-4 flex-wrap lg:flex-nowrap">
            <template v-if="content">
                <article v-for="(item, index) in props.content.items" :key="`lender-${index}`" class="lg:w-auto w-1/2">
                    <img :src="item.filename" alt="rbc" class="w-full">
                </article>
            </template>
        </section>

        <div class="relative flex flex-col lg:flex-row lg:justify-between mt-8 lg:mt-32 items-start w-full z-10 lg:px-auto px-4">
            <article class="lg:border-l-4 border-white lg:pl-3 mt-8 lg:w-1/5 pb-48 lg:pb-0 text-5xl lg:text-4xl text-center lg:text-left leading-normal font-semibold lg:font-normal lg:leading-[48px]">
                {{ props.content.slogan }}
            </article>
            <img :src="props.content.sloganImage.filename" alt="rbc" class="hidden lg:block absolute right-0 -top-8 w-4/5">
            <img :src="props.content.sloganImageSmall.filename" alt="rbc" class="lg:hidden block absolute right-0 -bottom-64 w-full">
        </div>
    </section>
</template>

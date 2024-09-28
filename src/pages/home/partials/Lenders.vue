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
        sloganImageSmall: { filename: string }
    }

    interface Props {
        content: Content;
    }

    const props = defineProps<Props>();
</script>

<template>
    <section 
        aria-label="Lenders section" 
        class="
            relative text-white min-h-64 pt-24 pb-12 px-8 flex flex-col -mt-12
            lg:px-32
        "
    >
        <div class="
            absolute z-0 inset-0 -top-12 clip-top-up-right bg-fa-blue overflow-hidden
            lg:top-0
        ">
            <div class="absolute z-0 clip-right-up-right bg-gray-400/5 left-0 top-0 w-2/3 h-full"></div>
            <div class="absolute z-0 clip-right-up-right bg-gray-400/5 left-0 top-0 w-2/4 h-full"></div>
        </div>
        <div class="my-8 mb-16 px-0 md:px-32">
            <div class="AskAva-cta rounded-lg overflow-hidden shadow-lg" data-product="creditTool" data-type="banner"></div>
        </div>

        <p class="z-10 px-0 md:px-32 text-center text-2xl font-bold">
            {{ props.content.title }}
        </p>
        
        <section 
            class="
                z-10 flex justify-between mt-4 flex-wrap 
                lg:flex-nowrap
            "
        >
            <template v-if="content">
                <article 
                    v-for="(item, index) in props.content.items" 
                    :key="`lender-${index}`" 
                    class="
                        w-1/2
                        lg:w-auto
                        flex-grow
                    "
                >
                    <img :src="item.filename" class="w-full">
                </article>
            </template>
        </section>

        <div class="
            relative flex flex-col mt-8 items-start w-full z-10 px-4
            lg:flex-row lg:justify-between lg:mt-32 lg:px-auto md:items-center
        ">
            <article class="
                border-white pb-48 text-5xl text-center leading-normal font-semibold mt-8
                lg:pb-0 lg:text-left lg:border-l-4 lg:pl-3 lg:w-1/5 lg:text-4xl lg:font-normal lg:leading-[48px]
                xl:w-2/5 xl:mt-32 xl:text-5xl xl:leading-[64px] xl:pl-6
            ">
                {{ props.content.slogan }}
            </article>
            <img 
                :src="props.content.sloganImage.filename" 
                class="
                    hidden absolute right-0 -top-8 w-4/5
                    lg:block xl:w-3/5
                "
            />
            <img 
                :src="props.content.sloganImageSmall.filename" 
                class="
                    block absolute right-0 -bottom-64 w-full 
                    lg:hidden md:w-3/5 md:-bottom-[22rem] md:self-center md:right-auto
                "
            />
        </div>
    </section>
</template>

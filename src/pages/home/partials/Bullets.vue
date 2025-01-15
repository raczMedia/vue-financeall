<script lang="ts" setup>
    import { toRefs } from 'vue';

    interface Bullets {
        Items: { info: string }[]
    }

    type Content = {
        Items: { info: string }[]
    }

    interface Props {
        content: Content;
    }

    const props = defineProps<Props>();
</script>

<template>
    <section 
        aria-label="Promises section" 
        class="
            min-h-64 pt-[8rem] pb-48 px-8 flex flex-col bg-fa-light-blue
            md:px-32 gap-14
        "
    >   
        <section 
            aria-label="title" 
            class="
                flex flex-col items-center text-center
                md:text-left
            "
        >
            <p class="text-4xl font-medium xl:text-5xl text-fa-blue">
                Why work with us
            </p>
            <p class="
                text-xl font-light text-fa-blue/80 pt-2 
                xl:text-2xl xl:pt-4
            ">
                Solutions for every credit need, and a vehicle for any situation
            </p>
        </section>

        <ul class="
            flex gap-4 relative z-20 flex-wrap 
            lg:flex-nowrap
        ">
        <template v-for="(bullet, index) in props.content.Items" :key="`bullet-${index}`">
            <li 
                class="lg:text-lg xl:text-xl"
            >
                <!-- <div class="rounded-full w-3 h-3 mt-2 bg-gray-300 flex-shrink-0"></div> -->
                
                {{ bullet.info }}
            </li>
            <div class="w-3 bg-gray-300" v-if="index != props.content.Items.length -1"></div>
        </template>
        </ul>
    </section>
</template>

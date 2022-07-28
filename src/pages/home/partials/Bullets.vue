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
            min-h-64 pt-[20rem] pb-48 px-8 flex flex-col bg-fa-light-blue
            md:px-32 
            xl:pt-[24rem]
        "
    >   
        <ul class="
            flex justify-between gap-8 relative z-20 flex-wrap 
            lg:flex-nowrap
        ">
            <li 
                v-for="(bullet, index) in props.content.Items" 
                :key="`bullet-${index}`" 
                class="flex gap-4 lg:text-lg xl:text-xl"
            >
                <div class="rounded-full w-6 h-6 bg-gray-300 flex-shrink-0"></div>
                {{ bullet.info }}
            </li>
        </ul>
    </section>
</template>

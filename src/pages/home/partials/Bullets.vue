<script lang="ts" setup>
    interface Bullets {
        Items: { info: string }[]
    }

    const props = defineProps({
        content: Object
    })
</script>

<template>
    <section 
        aria-label="Promises section" 
        class="min-h-64 pt-[24rem] pb-48 px-32 flex flex-col bg-fa-light-blue"
    >   
        <ul class="flex justify-between gap-8 relative z-20">
            <li 
                v-for="(bullet, index) in props.content.Items" 
                :key="`bullet-${index}`" 
                class="flex gap-4"
            >
                <div class="rounded-full w-6 h-6 bg-gray-300 flex-shrink-0"></div>
                {{ bullet.info }}
            </li>
        </ul>
    </section>
</template>

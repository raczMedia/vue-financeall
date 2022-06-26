<script lang="ts" setup>
    interface Data {
        bg: {filename: string},
        title: string,
        subtitle: string,
        reviewsList: { 
            uuid: string,
            avatar: {filename: string},
            comment: string,
            name: string,
            occupation: string
        }[]
    }

    const props = defineProps({
        content: Object
    })
</script>

<template>
    <section 
        aria-label="Reviews section" 
        class="relative -mt-12"
    >
        <div class="absolute inset-0 clip-top-down-right bg-fa-blue">
            <div class="absolute left-0 top-12 -z-10">
                <img :src="props.content.bg.filename" alt="background">
            </div>
        </div>
        <div class="relative z-20 flex flex-col py-[8rem] px-32 min-h-64 overflow-x-auto no-scrollbar">
            <section aria-label="title" class="sticky left-0 flex flex-col items-center text-white">
                <p class="text-4xl font-medium">
                    {{ props.content.title }}
                </p>
                <p class="text-xl font-light text-gray-300 pt-2">
                    {{ props.content.subtitle }}
                </p>
            </section>
            <section 
                aria-label="Reviews List" 
                class="flex gap-4 items-stretch mt-16"
            >
                <article 
                    v-for="review in props.content.reviewsList" 
                    :key="`review-${review.uuid}`" 
                    aria-label="Review" 
                    class="flex flex-col w-5/12 flex-shrink-0"
                >
                    <section class="flex mb-4 gap-4" aria-label="Review Header">
                        <img 
                            :src="review.avatar.filename" 
                            class="rounded-full"
                            alt="avatar"
                        />
                        <div>
                            <p class="text-white">{{ review.name }}</p>
                            <p class="text-gray-400">{{ review.occupation }}</p>
                        </div>
                    </section>
                    <section 
                        class="flex flex-grow p-8 bg-white rounded-xl" 
                        aria-label="Review Comment"
                    >
                        <span class="text-6xl pr-2 relative -top-2">
                            ‟
                        </span>
                        <p class="text-lg">
                            {{ review.comment }}
                        </p>
                    </section>
                </article>
            </section>
        </div>
    </section>
</template>

<style>
    /* Chrome, Safari and Opera */
    .no-scrollbar::-webkit-scrollbar {
      display: none;
    }

    .no-scrollbar {
      -ms-overflow-style: none; /* IE and Edge */
      scrollbar-width: none; /* Firefox */
    }
</style>

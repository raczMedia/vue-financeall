<script lang="ts" setup>
    import { defineComponent } from 'vue';

    type Content = {
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

    interface Props {
        content: Content;
    }

    const props = defineProps<Props>();
</script>

<template>
    <section 
        aria-label="Reviews section" 
        class="relative -mt-12"
    >
        <div class="absolute inset-0 clip-top-down-right bg-fa-blue">
            <div class="absolute left-0 top-12 -z-10">
                <img 
                    :src="props.content.bg.filename" 
                    alt="background"
                    class="w-1/2 md:w-auto"
                >
            </div>
        </div>

        <div class="
            relative z-20 flex flex-col py-[8rem] px-8 min-h-64 overflow-x-auto no-scrollbar
            lg:px-32
        ">           
            <section 
                aria-label="title" 
                class="
                    sticky left-0 flex flex-col items-center text-white text-center pt-4
                    md:text-left
                "
            >
                <p class="text-4xl font-medium xl:text-5xl">
                    {{ props.content.title }}
                </p>
                <p class="
                    text-xl font-light text-gray-300 pt-2 
                    xl:text-2xl xl:pt-4
                ">
                    {{ props.content.subtitle }}
                </p>
            </section>
            <section 
                aria-label="Reviews List" 
                class="
                    flex flex-col gap-16 mt-16
                    md:items-stretch md:flex-row md:gap-4
                "
            >
                <article 
                    v-for="(review, index) in props.content.reviewsList" 
                    :key="`review-${review.uuid}`" 
                    aria-label="Review" 
                    class="flex flex-col flex-shrink-0
                        md:w-5/12
                    "
                >
                    <section
                        class="flex mb-4 gap-4 items-center"
                        :class="{'flex-row-reverse md:flex-row': index % 2}"
                        aria-label="Review Header"
                    >
                        <img 
                            :src="review.avatar.filename" 
                            class="rounded-full"
                            alt="avatar"
                        />
                        <div :class="{'text-right md:text-left': index % 2}">
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
                        <p class="text-lg xl:text-xl xl:pt-4">
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

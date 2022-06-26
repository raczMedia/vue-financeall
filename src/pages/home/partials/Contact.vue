<script lang="ts" setup>
    interface Data {
        title: string,
        subtitie: string,
        map: { filename: string },
        fields: { label: string, size: string }[]
    }

    const props = defineProps({
        content: Object
    })
</script>

<template>
    <section 
        id="contact"
        aria-label="Contact section" 
        class="min-h-64 py-[8rem] px-32 -mt-12 bg-gray-100"
    >
        <div class="relative z-20 flex content-between">
            <section aria-label="Contact Form">
                <h3 class="text-4xl font-bold">
                    {{ props.content.title }}
                </h3>
                <p class="text-gray-400">
                    {{ props.content.subtitle }}
                </p>
                <div class="flex flex-wrap mt-8 gap-y-4">
                    <label 
                        v-for="(field, index) in props.content.fields" 
                        :key="`contact-field-${index}`"
                        class="flex flex-col pr-8"
                        :class="field.size === 'half' ? 'w-1/2' : 'w-full'"
                    >
                        <span class="pb-2">
                            {{ field.label }}
                        </span>
                        <textarea 
                            v-if="field.size == 'textarea'" 
                            class="w-full px-8 py-4" 
                            rows="4"
                        />
                        <input 
                            v-else 
                            type="text" 
                            class="px-8 py-4"
                        />
                    </label>
                </div>
                <div class="flex justify-end pr-8 pt-2">
                    <button class="bg-fa-blue text-white px-4 py-2 rounded mt-4">{{ props.content.buttonText }}</button>
                </div>
            </section>
            <section aria-label="Location Map" class="w-2/4 flex-shrink-0">
                <img :src="props.content.map.filename" alt="">
            </section>
        </div>
    </section>
</template>

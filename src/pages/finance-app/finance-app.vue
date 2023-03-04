<script lang="ts" setup>
    import { ref, computed } from 'vue';
    import { getComponent, answers, initAnswers, setValue, getValue } from './fields/utils';
    import Form from './steps.json';

    initAnswers(Form);

    const previousStep = computed(() => Form.steps[currentStepCount.value - 1]);;
    const currentStepCount = ref(0);
    const currentStep = computed(() => Form.steps[currentStepCount.value]);
    const hasNextStep = computed(() => Form.steps[currentStepCount.value + 1] ? true : false);
    const hasPreviousStep = computed(() => Form.steps[currentStepCount.value - 1] ? true : false);
    const stepProgress = computed(() => {
        return ((currentStepCount.value + 1) / Form.steps.length * 100).toFixed(2);
    });
    const direction = ref('left');
</script>

<template>
    <div class="px-8 lg:px-32 py-32 relative">
        <div class="absolute clip-right-up-right bg-gray-300/20 left-0 top-0 w-3/5 h-full"></div>
        <div class="absolute clip-right-up-right bg-gray-300/20 left-0 top-0 w-4/5 h-full"></div>
        <section aria-label="application-header relative">
            <div class="relative pb-8">
                <div class="absolute bg-gray-300 h-1.5 w-full"></div>
                <div class="absolute bg-fa-blue h-1.5 transition-all duration-300" :style="`width: ${stepProgress}%`"></div>
            </div>
            <h1 class="text-4xl font-semibold py-4">Finance Application</h1>
            <div class="text-sm font-medium text-gray-400">This should only take 5 minutes. Rest assured your data is secure and encrypted.</div>
        </section>
        <section aria-label="form-content" class="mt-12 relative">
            <button 
                :disable="! hasPreviousStep" 
                class="text-gray-400 font-medium hover:text-fa-blue hover:font-bold" 
                :class="{'opacity-0': ! hasPreviousStep}"
                @click=" currentStepCount -= 1; direction = 'right'"
            >
                <font-awesome-icon icon="fa-solid fa-arrow-left" size="xs" />
                <span v-if="previousStep" class="pl-1 text-sm">Back to {{ previousStep.title }}</span>
            </button>
            <div class="flex gap-4 relative overflow-hidden min-h-[400px]">
                <transition-group :name="direction === 'right' ? 'slide-fade-right' : 'slide-fade-left'">
                    <section 
                        v-for="section in currentStep.sections" 
                        :key="`step-${section.title}`"
                        class="transiiton-all duration-500 flex-shrink-0 flex-grow-0"
                        :class="section.size === 'full' ? 'w-full' : 'w-1/2'"
                    >
                        <h2 class="text-xl font-bold text-fa-blue mb-8 select-none">{{ section.title }}</h2>
                        <div class="flex flex-wrap gap-4" >
                            <template v-for="(field, fieldIndex) in section.fields" :key="`${section.title}-field-${fieldIndex}`">
                                <div class="flex flex-col">
                                    <label v-if="field.label">{{ field.label }}</label>
                                    <component 
                                        :is="getComponent(field.type)" 
                                        :field="field" 
                                        :currentStep="currentStep" 
                                        :value="getValue(currentStep, field)" 
                                        @input="setValue(currentStep, field, $event)" 
                                    />
                                </div>
                            </template>
                        </div>
                    </section>
                </transition-group>
            </div>
        </section>
        <button 
            v-if="hasNextStep" 
            class="bg-fa-blue text-white rounded-lg px-4 py-2 select-none relative" 
            @click=" currentStepCount += 1; direction = 'left'"
        >
            <font-awesome-icon icon="fa-solid fa-arrow-right" size="xs" />
            Next
        </button>
    </div>
</template>

<style scoped>
    .slide-fade-left-enter-active,
    .slide-fade-right-enter-active{
        position: absolute;
    }
    .slide-fade-left-leave-active ,
    .slide-fade-right-leave-active{
        transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
    }

    .slide-fade-right-enter-from {
        transform: translateX(-10%);
        opacity: 0;
    }
    .slide-fade-left-enter-from {
        transform: translateX(10%);
        opacity: 0;
    }
    .slide-fade-right-leave-to {
        transform: translateX(10%);
        opacity: 0;
    }
    .slide-fade-left-leave-to {
        transform: translateX(-10%);
        opacity: 0;
    }
</style>

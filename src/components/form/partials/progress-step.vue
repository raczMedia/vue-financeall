<script lang='ts' setup>
  import { Step } from '@/components/form/utils/formTypes';
  import Field from '@/components/form/fields/field.vue';
  import SlideTransition from '@/components/form/partials/slideTransition.vue';
  
  interface Props {
    currentStep: Step,
    slideDirection: string
  }

  const props = defineProps<Props>();
  defineEmits(['nextStep'])
</script>

<template>
  <div class="w-full">
    <SlideTransition :slideDirection="slideDirection">
      <section 
        v-for="section in currentStep.sections" 
        :key="`step-${section.title}`" 
        class="transiiton-all duration-500 flex-shrink-0"
        :class="currentStep.sections.length === 2 ? 'w-1/2' : 'w-full'"
      >
        <h2 class="text-xl font-bold text-fa-blue mb-8 select-none">{{ section.title }}</h2>
        <div class="flex flex-wrap gap-4">
          <Field 
            v-for="(field, fieldIndex) in section.fields" 
            :key="`${section.title}-field-${fieldIndex}`"
            :field="field" 
            :currentStep="currentStep"
            @nextStep="$emit('nextStep')"
          />
        </div>
      </section>
    </SlideTransition>
  </div>
</template>

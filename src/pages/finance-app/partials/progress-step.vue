<script lang='ts' setup>
  import { Section, Step } from '../utils/formTypes';
  import Field from '../fields/field.vue';
  
  interface Props {
    currentStep: Step,
    section: Section,
  }

  const props = defineProps<Props>();
</script>

<template>
  <section 
    class="transiiton-all duration-500 flex-shrink-0 flex-grow-0"
  >
    <h2 class="text-xl font-bold text-fa-blue mb-8 select-none">{{ section.title }}</h2>
    <div class="flex flex-wrap gap-4">
      <Field 
        v-for="(field, fieldIndex) in section.fields" 
        :key="`${section.title}-field-${fieldIndex}`"
        :field="field" 
        :currentStep="currentStep"
      />
    </div>
  </section>
</template>

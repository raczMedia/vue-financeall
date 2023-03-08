<script lang='ts' setup>
  import { computed } from 'vue';
  import FieldWrapper from '../fields/field-wrapper.vue';
  import { Section, Step } from '../formTypes';
  import { 
    getFieldComponent,
    getAnswer,
    getSizing,
    setAnswer,
  } from '../fields/utils';

  interface Props {
    currentStep: Step,
    section: Section,
  }

  defineProps<Props>();
</script>

<template>
  <section 
    class="transiiton-all duration-500 flex-shrink-0 flex-grow-0"
    :class="[
        `section-${sectionIndex}`,
        section.size === 'full' ? 'w-full' : 'w-1/2'
    ]"
  >
    <h2 class="text-xl font-bold text-fa-blue mb-8 pt-4 select-none">{{ section.title }}</h2>
    <div class="flex flex-wrap gap-4">
      <template v-for="(field, fieldIndex) in section.fields" :key="`${section.title}-field-${fieldIndex}`">
        <FieldWrapper :field="field">
          <component 
            :is="getFieldComponent(field.type)" 
            :field="field" 
            :currentStep="currentStep" 
            :value="getAnswer(currentStep, field)" 
            :class="getSizing(field)"
            @input="setAnswer(currentStep, field, $event)" 
          />
        </FieldWrapper>
      </template>
    </div>
  </section>
</template>

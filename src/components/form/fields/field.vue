<script lang='ts' setup>
  import { computed } from 'vue'; 
  import { Field, Step } from '../utils/formTypes';
  import { setAnswer, getAnswer, getFieldSizing, getFieldComponent } from '../utils/FormComposable';
  import FieldWrapper from './field-wrapper.vue';

  interface Props {
    currentStep: Step,
    field: Field,
  }

  const props = defineProps<Props>();
  const emits = defineEmits(['update:isValidated', 'nextStep']);

  const answer = computed(() => getAnswer(props.currentStep, props.field))

  const getClass = (field: Field) => field.type === 'row' || field.type === 'batch'
    ? undefined
    : getFieldSizing(field);
</script>
<template>
  <FieldWrapper :field="field" :value="answer" :currentStep="currentStep">
    <component 
      :is="getFieldComponent(field.type)" 
      :field="field" 
      :currentStep="currentStep" 
      :value="answer" 
      :class="getClass(field)"
      @input="setAnswer(props.currentStep, props.field, $event)" 
      @nextStep="$emit('nextStep')"
    />
  </FieldWrapper>
</template>

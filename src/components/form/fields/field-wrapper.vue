<script lang="ts" setup>
  import { Field, Step } from '../utils/formTypes';
  import { getFieldSizing, simpleValidate, getValidationStatus, evaluateRequirement } from '../utils/FormComposable';
  import { computed } from 'vue';

  interface Props {
    field: Field,
    currentStep: Step,
    value: string | boolean | number | null
  }

  const props = defineProps<Props>();
  const validationStatus = computed(getValidationStatus);
  const errorrStatus = computed(() => {
    return validationStatus.value === 'Error' && !simpleValidate(props.value, props.field, props.currentStep)
  })
</script>

<template>
  <div class="flex flex-col rounded-lg p-1" :class="[
    {'w-full p-0': field.type === 'row'},
    {'p-0': field.type === 'batch'},
    field.type !== 'row' && field.type !== 'batch' ? getFieldSizing(field) : '',
    errorrStatus ? 'bg-red-100' : 'border-transparent'
  ]">
    <label 
      v-if="field.showLabel" 
      class="font-medium" 
      :class="[
        getFieldSizing(field),
        {'pt-1 -mb-1': field.type === 'batch'},
        {'pl-1': field.type === 'row' || field.type === 'batch'},
      ]"
    >
      {{ field.label }}
      <span v-if="evaluateRequirement(field, currentStep)" class="text-red-400">*</span>
    </label>
    <div v-if="field.type === 'row' || field.type === 'batch'" class="gap-4 inline-flex">
      <slot />
    </div>
    <slot v-else />
  </div>
</template>

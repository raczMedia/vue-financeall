<script lang="ts" setup>
  import { Step, Field as FieldType } from '../utils/formTypes';
  import Field from './field.vue';

  interface Props {
    field: FieldType,
    currentStep: Step,
    value: string | null,
    class: string
  }

  defineProps<Props>();
  defineEmits(['input'])
</script>

<template>
  <div 
    v-for="(item, itemIndex) in field.items" 
    :key="`${field.name}-${itemIndex}`" 
    class="flex flex-col"
  >
    <Field 
      :field="item"
      :currentStep="currentStep"
    />
  </div>
</template>

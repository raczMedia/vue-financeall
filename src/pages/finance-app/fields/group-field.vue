<script lang="ts" setup>
  import { Field, Step } from '../formTypes';
  import {
    getFieldComponent,
    getAnswer,
    setAnswer,
    getSizing
  } from '../fields/utils';

  interface Props {
    field: Field,
    currentStep: Step,
    value: string | null
  }

  defineProps<Props>();
  defineEmits(['input'])
</script>

<template>
  <template v-for="(item, itemIndex) in field.items" :key="`${field.name}-${itemIndex}`">
    <div class="flex flex-col">
      <label v-if="item.label" class="font-medium" :class="getSizing(item)">{{ item.label }}</label>
      <component 
        :is="getFieldComponent(item.type)" 
        :field="item" 
        :currentStep="currentStep" 
        :value="getAnswer(currentStep, item)" 
        :class="getSizing(item)"
        @input="setAnswer(currentStep, item, $event)" 
      />
    </div>
  </template>
</template>

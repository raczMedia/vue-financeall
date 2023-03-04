<script lang="ts" setup>
  import { Field, Step } from '../formTypes';
  import { getComponent, getValue, setValue } from './utils';

  interface Props {
    field: Field,
    currentStep: Step,
    value: string | null
  }

  defineProps<Props>();
</script>

<template>
  <div class="inline-flex gap-4">
    <template v-for="(item, itemIndex) in field.items" :key="`${field.name}-group-${itemIndex}`">
      <div class="flex flex-col">
        <label v-if="item.label">{{ item.label }}</label>
        {{ item.placeholder }}
        <component 
          :is="getComponent(item.type)" 
          :field="item" 
          :currentStep="currentStep" 
          :value="getValue(currentStep, item)" 
          @input="setValue(currentStep, item, $event)" 
        />
      </div>
    </template>
  </div>
</template>

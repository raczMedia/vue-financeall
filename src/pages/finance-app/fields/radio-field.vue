<script lang="ts" setup>
  import { computed } from 'vue';
  import { Field, Step } from '../formTypes';

  interface Props {
    field: Field,
    currentStep: Step,
    value: string | null
  }
  const props = defineProps<Props>();
  
  defineEmits(['input'])
</script>

<template>
  <div class="flex flex-wrap gap-x-6 mt-2">
    <label 
      v-for="option in field.options" 
      :key="`${field.name}-option-${option.value}`" 
      class="flex items-center mb-4 group cursor-pointer border border-transparent py-1 px-2 rounded-full hover:bg-white hover:shadow-md hover:border-gray-200"
      :class="{'bg-white shadow-md border-gray-200': option.value === value}"
    >
      <input 
        :id="`${field.name}-option-${option.value}`" 
        type="radio" 
        :value="option.value" 
        :name="field.name" 
        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
        :checked="option.value === value"
        @change="e => $emit('input', {value: option.value})"
      />
      <span 
        class="ml-2 text-sm font-medium text-gray-600 group-hover:text-fa-blue"
      >
        {{ option.title }}
      </span>
    </label>
  </div>
</template>

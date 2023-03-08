<script lang="ts" setup>
  import { computed } from 'vue';
  import { Field, Step } from '../formTypes';

  interface Props {
    field: Field,
    currentStep: Step,
    value: boolean | null
  }
  const props = defineProps<Props>();
  defineEmits(['input'])

  const selectedOption = computed(() => {
    if (! props.field.options) {
      return null;
    }

    if (props.value === null) {
      return props.field.options[1].title;
    }

    return props.value ? props.field.options[0].title : props.field.options[1].title 
  })
</script>

<template>
  <label class="relative flex items-center cursor-pointer py-1.5 mt-2">
    <input 
      type="checkbox" 
      class="sr-only peer" 
      :checked="value ? true : false" 
      @change="e => $emit('input', {value: e.target?.checked})"
    />
    <div class="
      w-11 h-6 
      rounded-full 

      bg-gray-400
      peer-checked:bg-fa-blue

      peer peer-checked:after:translate-x-full peer-checked:after:border-white 
      after:content-[''] after:absolute after:top-2 after:left-[2px] 
      after:bg-white after:border-gray-300 after:border 
      after:rounded-full 
      after:h-5 after:w-5 
      after:transition-all
    "
    ></div>
    <span class="ml-3 text-sm text-gray-900">{{ selectedOption }}</span>
  </label>
</template>

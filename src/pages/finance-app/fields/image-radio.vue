<script lang="ts" setup>
  import { Field, Step, Option } from '../utils/formTypes';
  import { simpleValidate } from '../utils/FormComposable';

  interface Props {
    field: Field,
    currentStep: Step,
    value: string | null
  }

  const props = defineProps<Props>();
  const emit = defineEmits(['input']);
  const selectOption = (option: Option) => emit(
    'input', 
    {value: option.value, validated: simpleValidate(option.value as string, props.field, props.currentStep)}
  );
</script>

<template>
  <div class="grid grid-cols-5 gap-2 select-none">
    <div 
      v-for="option in field.options"
      :key="`image-${option.value}`"
      class="
        flex flex-col items-center justify-center
        p-3 overflow-hidden rounded-lg 
        cursor-pointer
        transition-all duration-300
      "
      :class="[
        {'shadow-lg bg-fa-blue/30 font-bold': value === option.value},
        {'bg-fa-blue/10 hover:bg-fa-blue/20 font-medium': value !== option.value},
      ]"
      @click="selectOption(option)"
    >
    <!-- :src="`../../src/assets/${option.asset}`"  -->
      <img 
        :src="`${option.asset}`" 
        class="w-4/5 transition-all duration-500 ease-in-out" 
      />
      <p class="-mt-2 transition-all delay-600 duration-500">{{ option.title }}</p>
    </div>
  </div>
</template>

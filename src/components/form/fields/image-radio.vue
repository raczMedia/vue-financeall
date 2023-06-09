<script lang="ts" setup>
  import { Field, Step, Option } from '../utils/formTypes';
  import { simpleValidate } from '../utils/FormComposable';
import { ref } from 'vue';

  interface Props {
    field: Field,
    currentStep: Step,
    value: string | null
  }

  const selected = ref(false);
  const props = defineProps<Props>();
  const emit = defineEmits(['input', 'nextStep']);
  const selectOption = (option: Option) => {
    emit('input', {
      value: option.value, 
      validated: simpleValidate(option.value as string, props.field, props.currentStep)
    });
    console.log(
      props.field,
      props.field.required,
      props.field.progressOnSelect
    )

    if (props.field.progressOnSelect) {
      console.log('happened')
      setTimeout(() => emit('nextStep'), 400)
      selected.value = true;
    }
  }
</script>

<template>
  <div class="grid sm:grid-cols-2 md:grid-cols-4 grid-cols-1 w-full gap-4 select-none">
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
        {'shadow-lg bg-fa-blue text-white font-bold': value === option.value},
        {'bg-fa-blue/10 hover:bg-fa-blue/20 font-medium': value !== option.value},
        {'transform -translate-x-10 opacity-0': selected && value !== option.value},
        {'delay-300 -translate-x-10 opacity-0': selected && value === option.value},
      ]"
      @click="selectOption(option)"
    >
      <img 
        :src="`${option.asset?.filename}`" 
        class="w-4/5 transition-all duration-500 ease-in-out" 
      />
      <p>{{ option.title }}</p>
    </div>
  </div>
</template>

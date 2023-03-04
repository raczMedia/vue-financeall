<script lang="ts" setup>
    import { nextTick, onMounted, onUnmounted, ref } from 'vue';
    import { Field, Step, Option } from '../formTypes';

    interface Props {
      field: Field,
      currentStep: Step,
      value: string | null
    }

    defineProps<Props>();

    const emit = defineEmits(['input'])
    const selectOption = (option: Option) => emit('input', {value: option.value});
</script>

<template>
  <div class="grid grid-cols-5 gap-2 select-none">
    <div 
      v-for="option in field.options"
      :key="option.value"
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
      <img 
        :src="`../../src/assets/${option.asset}`" 
        class="w-4/5 transition-all duration-500 ease-in-out" 
      />
      <p class="-mt-2 transition-all delay-600 duration-500">{{ option.title }}</p>
    </div>
  </div>
</template>

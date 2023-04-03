<script lang="ts" setup>
  import { Field, Step } from '../utils/formTypes';
  import { vMaska } from "maska";
  import { useDebounceFn } from '@vueuse/core';
  import { maskOptions, simpleValidate, tokenOptions } from '../utils/FormComposable';

  interface PropsType {
    field: Field,
    currentStep: Step,
    value: string | null
  }

  const props = defineProps<PropsType>();
  const emit = defineEmits(['input']);

  const getMask = () => props.field.mask 
    || maskOptions[props.field.type as keyof typeof maskOptions] 
    || '';
  const getToken = () => tokenOptions[props.field.type as keyof typeof tokenOptions] || '';
  const getPattern = () => {
    return { 'email': '.+@globex\.com' }[props.field.type] || ''
  };
  const debounceEmit = useDebounceFn((event: Event) => {
    const target = event.target as HTMLInputElement;
    emit('input', { 
      value: target.value, 
      validated: simpleValidate(target.value, props.field, props.currentStep) 
    })
  }, 400);

  // const getValidation = () => {
  //   return { 
  //     'email': /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ 
  //   }[props.field.type]
  // };
</script>

<template>
  <div class="flex flex-col">
    <label class="flex items-center bg-white border-gray-300 rounded overflow-hidden border mt-2 focus-within:border-fa-blue/70">
      <div v-if="field.before" class="px-2 text-gray-400 flex-shrink-0">{{ field.before }}</div>
      <input 
        v-maska
        :data-maska="getMask()"
        :data-maska-tokens="getToken()"
        :type="field.type === 'email' ? 'email' : 'text'" 
        class="py-2 w-full outline-none"
        :class="field.before ? 'pr-4' : 'px-4'"
        :value="value"
        :placeholder="field.placeholder"
        :pattern="getPattern()"
        :required="field.required ?? false"
        @input="debounceEmit($event)"
      />
      <div v-if="field.after" class="pr-2 text-gray-400 flex-shrink-0">{{ field.after }}</div>
    </label>
    <small v-if="field.helper" class="text-gray-500">{{ field.helper }}</small>
  </div>
</template>

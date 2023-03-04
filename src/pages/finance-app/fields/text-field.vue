<script lang="ts" setup>
  import { Field, Step } from '../formTypes';
  import { vMaska } from "maska"
  import { ref } from 'vue';

  interface PropsType {
    field: Field,
    currentStep: Step,
    value: string | null
  }

  const props = defineProps<PropsType>();
  defineEmits(['input']);

  const maskOptions = ref({ 
    tel: '(###) ###-####', 
    number: 'Z.##', 
    money: '$Z.##',
    postal: '@#@-#@#'
  });
  const getMask = () => props.field.mask 
    || maskOptions.value[props.field.type as keyof typeof maskOptions.value] 
    || '';

  const tokenOptions = ref({ 
    number: 'Z:[0-9]:multiple', 
    money: 'Z:[0-9]:multiple'
  });
  const getToken = () => tokenOptions.value[props.field.type as keyof typeof tokenOptions.value] || ''
</script>

<template>
  <input 
    v-maska
    :data-maska="getMask()"
    :data-maska-tokens="getToken()"
    type="text" 
    class="border-gray-300 bg-white rounded border px-4 py-2 mt-2"
    :value="value"
    :placeholder="field.placeholder"
    @input="(e) => $emit('input', {value: e.target?.value})"
  />
</template>

<script lang="ts" setup>
  import { Field, Step } from '../formTypes';
  import { vMaska } from "maska"
  import { computed, ref } from 'vue';

  import { useDebounceFn } from '@vueuse/core'

  interface PropsType {
    field: Field,
    currentStep: Step,
    value: string | null
  }

  const props = defineProps<PropsType>();
  const emit = defineEmits(['input', 'validated']);

  const maskOptions = ref({ 
    tel: '(###) ###-####', 
    number: 'Z.##', 
    postal: '@#@-#@#',
    years: '##',
    months: '##'
  });
  const getMask = () => props.field.mask 
    || maskOptions.value[props.field.type as keyof typeof maskOptions.value] 
    || '';

  const tokenOptions = ref({ 
    number: 'Z:[0-9]:multiple',
  });
  const getToken = () => tokenOptions.value[props.field.type as keyof typeof tokenOptions.value] || '';
  const getPattern = () => {
    return { 'email': '.+@globex\.com' }[props.field.type] || ''
  };
  const getValidation = () => {
    return { 
      'email': /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ 
    }[props.field.type]
  };
  const forceValue = (value: string | number) => {
    return {
      "months": Number(value) > 11 ? "11" : value
    }[props.field.type] || value;
  }

  const debounceEmit = useDebounceFn((value) => {
    emit('input', { value })
    // emit('validated', validated(value))
  }, 400);

  const validated = (value: string) => {
    // const regexString = getValidation();

    // return regexString
    //   ? regexString.test(value)
    //   : true;
  }
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
        @input="(e) => debounceEmit(e.target?.value)"
      />
      <div v-if="field.after" class="pr-2 text-gray-400 flex-shrink-0">{{ field.after }}</div>
    </label>
    <small v-if="field.helper" class="text-gray-500">{{ field.helper }}</small>
  </div>
</template>

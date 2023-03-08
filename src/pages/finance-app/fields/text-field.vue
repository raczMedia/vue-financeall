<script lang="ts" setup>
  import { Field, Step } from '../formTypes';
  import { vMaska } from "maska"
  import { computed, ref } from 'vue';

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

</script>

<template>
  <div class="flex flex-col">
    <label class="flex items-center bg-white border-gray-300 rounded overflow-hidden border mt-2 focus-within:border-fa-blue/70">
      <div v-if="field.before" class="px-2 text-gray-400 flex-shrink-0">{{ field.before }}</div>
      <input 
        v-maska
        :data-maska="getMask()"
        :data-maska-tokens="getToken()"
        type="text" 
        class="py-2 w-full outline-none"
        :class="field.before ? 'pr-4' : 'px-4'"
        :value="value"
        :placeholder="field.placeholder"
        @input="(e) => $emit('input', {value: e.target?.value})"
      />
      <div v-if="field.after" class="pr-2 text-gray-400 flex-shrink-0">{{ field.after }}</div>
    </label>
    <small v-if="field.helper" class="text-gray-500">{{ field.helper }}</small>
  </div>
</template>

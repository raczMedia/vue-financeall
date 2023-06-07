<script lang="ts" setup>
  import { computed, onMounted } from 'vue';
  import { Field, Step } from '../utils/formTypes';
  import { simpleValidate } from '../utils/FormComposable';

  interface Props {
    field: Field,
    currentStep: Step,
    value: boolean | string | number | null
  }
  const props = defineProps<Props>();
  const emit = defineEmits(['input'])

  const selectedOption = computed(() => {
    if (! props.field.options) {
      return {title: "", value: "", asset: ""};
    }

    return props.value
      ? props.field.options.find((option) => option.value === props.value) ?? props.field.options[1]
      : props.field.options[1] 
  });
  const booleanValue = computed(() => selectedOption.value === props.field.options![0] ? true : false);

  const onChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const newValue = props.field.options![Number(! target.checked)].value;
    emit('input', {
      value: newValue,
      validated: simpleValidate(newValue, props.field, props.currentStep)
    })
  }

  onMounted(() => {
    emit('input', {
      value: selectedOption.value.value,
      validated: simpleValidate(selectedOption.value.value, props.field, props.currentStep)
    })
  })
</script>

<template>
  <label class="relative flex items-center cursor-pointer py-1.5 mt-2">
    <input 
      type="checkbox"
      class="sr-only peer" 
      :checked="booleanValue" 
      @change="onChange($event)"
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
    <span class="ml-3 text-sm text-gray-900">{{ selectedOption.title }}</span>
  </label>
</template>

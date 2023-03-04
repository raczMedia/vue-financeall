<script lang="ts" setup>
  import { ref } from 'vue';
  import { Field, Step } from '../formTypes';
  import { onClickOutside } from '@vueuse/core'

  interface Props {
    field: Field,
    currentStep: Step,
    value: string | null
  }
  defineProps<Props>();
  

  const dropdown = ref(null)
  const isOpen = ref(false);

  const emit = defineEmits(['input'])
  const selectItem = (value: string) => {
    isOpen.value = false;
    emit('input', { value })
  }

  onClickOutside(dropdown, () => isOpen.value = false);
</script>

<template>
  <div class="border-gray-300 bg-white rounded border mt-2 cursor-pointer" ref="dropdown">
    <div class="flex items-center" @click="isOpen = !isOpen">
      <input type="text" class="px-4 py-2 w-24 outline-none cursor-pointer" :value="value" readonly />
      <font-awesome-icon icon="fa-solid fa-chevron-down" size="xs" class="px-4" />
    </div>
    <div class="relative">
      <div 
        v-if="isOpen" 
        class="
          absolute top-0 left-0 
          bg-gray-100 shadow-lg animate-growDown
          w-full flex flex-col rounded-b overflow-y-auto
          max-h-[150px]
        "
        style="transform-origin: top center;"
      >
        <div 
          v-for="option in field.options"
          :key="`${field.name}-option-${option.value}`"
          class="py-2 px-4 hover:bg-fa-blue/10" @click="selectItem(option.value)"
        >
          {{ option.title }}
        </div>
      </div>
    </div>
  </div>
</template>

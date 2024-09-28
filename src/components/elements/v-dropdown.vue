<script lang="ts" setup>
  import { nextTick, onMounted, ref } from 'vue'
  import { onClickOutside } from '@vueuse/core'

  const open = ref(true)
  const optionsContainer = ref()
  const dropdown = ref()
  const width = ref(0)

  const props = defineProps<{
    options: {value: string, title: string}[],
    modelValue: {value: string, title: string},
    buttonClass?: string
  }>()
  const emit = defineEmits(['update:modelValue'])

  const selectOption = (option) => {
    emit('update:modelValue', option)
    open.value = !open.value
  }
  const toggleOpen = async () => {
    open.value = !open.value
    if (! width.value) {
      await nextTick()
      width.value = optionsContainer?.value?.clientWidth
    }
  }

  onMounted(toggleOpen)
  onClickOutside(dropdown, () => open.value = false)
</script>

<template>
  <div class="relative" ref="dropdown">
    <slot name="toggle" :toggleOpen="toggleOpen">
      <button 
        class="
          flex justify-start items-center px-4 py-2 z-20 
          transition-all duration-800
          text-white rounded focus:outline-none select-none
        " 
        :class="open ? 'bg-blue-600' : 'bg-blue-500'"
        @click="toggleOpen()"
      >
        <span class="text-left" :style="{'min-width': `${width || 0}px`}">
          {{ modelValue.title }}
        </span>
        <font-awesome-icon icon="fa-solid fa-chevron-down" class="w-3 ml-2 transform transition-transform duration-200" :class="{'rotate-90': open}" />
      </button>
    </slot>
    <div 
      ref="optionsContainer"
      class="
        absolute z-10 left-0
        shadow-lg border rounded-lg mt-1 bg-white 
        transition-all duration-200 ease-in-out
      "
      :class="{
        'top-0 scale-y-0 opacity-0': !open,
        'top-full scale-y-100 opacity-100': open,
        'min-w-full': width
      }"
    >
      <template v-for="option in props.options">
        <div 
          class="cursor-pointer py-1 px-2 hover:bg-blue-100 whitespace-nowrap" 
          @click="selectOption(option)"
        >
          {{ option.title }}
        </div>
      </template>
    </div>
  </div>
</template>

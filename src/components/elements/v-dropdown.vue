<script lang="ts" setup>
  import { nextTick, onMounted, ref, computed } from 'vue'
  import { onClickOutside } from '@vueuse/core'
  import { OptionType } from './elements'

  const open = ref(true)
  const optionsContainer = ref()
  const dropdown = ref()
  const width = ref(0)

  const props = withDefaults(defineProps<{
    options: OptionType[],
    modelValue: OptionType,
    buttonClass?: string,
    direction: 'left' | 'right' | 'down'
  }>(), {
    direction: 'down',
  });
  const emit = defineEmits(['update:modelValue'])

  const toggleOpen = async () => {
    open.value = !open.value

    if (! width.value) {
      await nextTick()
      width.value = optionsContainer?.value?.clientWidth
    }
  }
  const selectOption = (option: OptionType) => {
    emit('update:modelValue', option)
    toggleOpen()
  }

  onMounted(toggleOpen)
  onClickOutside(dropdown, () => open.value = false)

  const baseClasses = computed(() => [
    'absolute z-10',
    'shadow-xl border border-gray-300 overflow-hidden rounded-lg mt-1 bg-white',
    'transition-all duration-200 ease-in-out'
  ])

  const directionClasses = computed(() => ({
    'origin-top': props.direction === 'down',
    'origin-right': props.direction === 'right',
    'origin-left': props.direction === 'left',
    'top-0 right-2': props.direction === 'right',
    'top-0 left-6': props.direction === 'left',
    'top-full right-0': props.direction === 'down'
  }))

  const animationClasses = computed(() => {
    const isHorizontal = props.direction === 'left' || props.direction === 'right';
    const value = !open.value ? 0 : 100;
    return [
      `scale-${isHorizontal ? 'x' : 'y'}-${value}`,
      `opacity-${value}`,
      `min-w-${width.value ? 'full' : '0'}`
    ];
  })
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
      v-show="open"
      ref="optionsContainer"
      :class="[
        ...baseClasses,
        directionClasses,
        animationClasses
      ]"
    >
      <template v-for="option in props.options" >
        <template v-if="option.isHeading">
          <div class="p-2 whitespace-nowrap bg-gray-100 text-gray-400 italic select-none">
            {{ option.title }}
          </div>
        </template>
        <div v-else 
          class="cursor-pointer border-b border-gray-200 px-4 p-2 hover:bg-blue-100 whitespace-nowrap select-none" 
          @click="selectOption(option)"
        >
          {{ option.title }}
        </div>
      </template>
    </div>
  </div>
</template>

<script lang='ts' setup>
  import { computed } from 'vue';
  
  interface Props {
    slideDirection: string
  }

  const props = defineProps<Props>();

  const enterFrom = computed(() => {
    return props.slideDirection === 'right' 
        ? 'opacity-0 transform -translate-x-10'
        : 'opacity-0 transform translate-x-10'
  })
  const leaveTo = computed(() => {
    return props.slideDirection === 'right' 
        ? 'opacity-0 transform translate-x-10'
        : 'opacity-0 transform -translate-x-10'
  })
</script>
<template>
  <transition-group 
    leave-active-class="absolute"
    :enter-from-class="enterFrom"
    :leave-to-class="leaveTo"
  >
    <slot />
  </transition-group>
</template>

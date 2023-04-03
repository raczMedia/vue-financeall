<script lang='ts' setup>
  interface Props {
    color: string,
    progress: string,
  }

  defineProps<Props>();
</script>
<template>
  <div class="relative">
    <div class="absolute bg-gray-300 h-1.5 w-full"></div>
    <div 
      class="absolute h-1.5 transition-all duration-300" 
      :class="color"
      :style="`width: ${progress}%`"    
    ></div>
  </div>
</template>

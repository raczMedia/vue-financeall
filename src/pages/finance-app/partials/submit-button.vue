<script lang="ts" setup>
  interface SubmitProps {
    icon?: string,
    iconSize?: string,
    text: string
  }

  defineProps<SubmitProps>();
</script>

<template>
  <button class="
    px-4 py-2
    bg-fa-blue text-white 
    rounded-lg select-none
  ">
      <font-awesome-icon v-if="icon" :icon="icon" :size="iconSize ?? 'md'" />
      {{ text }}
  </button>
</template>

<script lang="ts" setup>
  import { Field } from '../formTypes';
  import { getSizing } from './utils';

  interface Props {
    field: Field,
  }

  defineProps<Props>();
</script>

<template>
  <div v-if="field.type !== 'group' && field.type !== 'row'" class="flex flex-col">
    <label v-if="field.label" class="font-medium" :class="getSizing(field)">{{ field.label }}</label>
    <slot />
  </div>
  <div v-else-if="field.label || field.type === 'row'" class="flex flex-col" :class="{'w-full': field.type === 'row'}">
    <label class="font-medium" :class="getSizing(field)">
      {{ field.label }}
    </label>
    <div class="gap-4 inline-flex">
      <slot />
    </div>
  </div>
  <slot v-else />
</template>

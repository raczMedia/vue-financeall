<script lang="ts" setup>
  import { Field } from '../formTypes';
  import { getSizing } from './utils';

  interface Props {
    field: Field,
  }

  defineProps<Props>();
</script>

<template>
  <div class="flex flex-col" :class="{'w-full': field.type === 'row'}">
    <label v-if="field.label" class="font-medium" :class="getSizing(field)">
      {{ field.label }}
    </label>
    <div v-if="field.type === 'row' || field.type === 'batch'" class="gap-4 inline-flex">
      <slot />
    </div>
    <slot v-else />
  </div>
</template>

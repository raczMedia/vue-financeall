<script lang="ts" setup>
  import { Field, Step } from '../formTypes';

  interface Props {
    field: Field,
    currentStep: Step,
    value: string | null
  }

  defineProps<Props>();

</script>

<template>
  <div>Radio</div>
</template>

<script lang='ts' setup>
  import Form from '@/components/form/form.vue';
  import { useBridge, useStoryblokState } from '@/composables/storyblokComposable';

  const { state, content } = await useStoryblokState("car-loan-application", 'draft');
  useBridge(state);
</script>
<template>
  <Form :content="content" />
</template>

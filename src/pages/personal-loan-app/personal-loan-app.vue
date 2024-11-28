<script lang='ts' setup>
  import { useBridge, useStoryblokState } from '@/composables/storyblok/storyblokComposable';
  import { StoryblokStateType } from '@/composables/storyblok/storyblok.types';
  import FinanceApplication from '@/components/FinanceApplication.vue';

  const { state, content }: StoryblokStateType = await useStoryblokState("personal-loan-application");
  useBridge(state);
</script>

<template>
  <FinanceApplication :content="content" class="lg:px-32 py-32 relative" />
</template>

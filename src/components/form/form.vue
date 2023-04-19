<script lang="ts" setup>
  import { ref, ShallowReactive, ComputedRef } from 'vue';
  import { useRoute } from "vue-router";
  import { useForm } from './utils/FormComposable';

  import SubmitButton from './partials/submit-button.vue';
  import ProgressStep from './partials/progress-step.vue';
  import SubmittedStep from './partials/submitted-step.vue';
  import VerificationStep from './partials/verification-step.vue';
  import ProgressBar from './partials/progress-bar.vue';
  
  import { FormPageType } from './utils/formTypes';
  import { useBridge, useStoryblokState } from '@/composables/storyblokComposable';
  import { LooseObject } from '@/composables/jsUtils';

  const props = defineProps<{ application: string }>();
  const route = useRoute();  

  // interface StoryblokStateType {
  //   content: ComputedRef<FormPageType>
  //   state: ShallowReactive<{story: LooseObject}>
  // }
  const { state, content } = await useStoryblokState(props.application, 'draft');
  useBridge(state);

  // const formComposable = await useForm(state.story.content);
  // const slideDirection = ref('left');

  // const goToNextStep = async () => {
  //   slideDirection.value = 'left';
  //   formComposable.toNextStep();
  // }
  // const goToPreviousStep = () => {
  //   slideDirection.value = 'right';
  //   formComposable.toPreviousStep()
  // }
</script>

<template>
  <div class="flex-grow px-8 lg:px-32 py-32 relative">
    <div>Hi There</div>
    <div>{{ content.Title }}</div>
  </div>
</template>

<style scoped>
    .section-0,
    .section-1 {
        transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
    }
    .slide-fade-left-enter-active.section-1,
    .slide-fade-right-enter-active.section-1{
        position: absolute;
        left: 50%;
    }
    /* .slide-fade-left-enter-active + .section{
        position: relative;
        background-color: green
    } */

    .slide-fade-left-leave-active ,
    .slide-fade-right-leave-active{
        position: absolute;
        
    }

    .slide-fade-right-enter-from {
        transform: translateX(-10%);
        opacity: 0;
    }
    .slide-fade-left-enter-from {
        transform: translateX(10%);
        opacity: 0;
    }
    .slide-fade-right-leave-to {
        transform: translateX(10%);
        opacity: 0;
    }
    .slide-fade-left-leave-to {
        transform: translateX(-10%);
        opacity: 0;
    }
</style>

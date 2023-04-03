<script lang="ts" setup>
  import { ref, computed, watch } from 'vue';
  import { useRoute } from "vue-router";
  import { 
    useForm, 
    getStatus, 
    getValidationStatus,
    previousStep,
    currentStep,
    hasPreviousStep,
    stepProgress,
    toNextStep,
    toPreviousStep,
    goToStep
  } from './utils/FormComposable';

  import SubmitButton from './partials/submit-button.vue';
  import ProgressStep from './partials/progress-step.vue';
  import SubmittedStep from './partials/submitted-step.vue';
  import VerificationStep from './partials/verification-step.vue';
  import ProgressBar from './partials/progress-bar.vue';
  import { FormTypes } from './utils/formTypes';

  const route = useRoute();
  watch(() => route.name, (name) => {
    useForm(route.name as FormTypes)
  }, { immediate: true });

  const slideDirection = ref('left');

  const goToNextStep = async () => {
    slideDirection.value = 'left';
    toNextStep();
  }
  const goToPreviousStep = () => {
    slideDirection.value = 'right';
    toPreviousStep()
  }

  const validationStatus = computed(getValidationStatus);
  const formStatus = computed(getStatus);
</script>

<template>
  <div class="flex-grow px-8 lg:px-32 py-32 relative">
    <!-- Background shapes -->
    <div class="absolute clip-right-up-right bg-gray-300/20 left-0 top-0 w-4/5 h-full"></div>
    <div class="absolute clip-right-up-right bg-gray-300/20 left-0 top-0 w-full h-full"></div>
    
    <!-- Header -->
    <section aria-label="application-header relative">
      <ProgressBar 
        class="pb-8"
        :color="formStatus === 'Submitted' ? 'bg-green-600' : 'bg-fa-blue'"
        :progress="stepProgress"
      />
      <h1 class="text-4xl font-semibold py-4 relative w-full">
        {{ route.name }}
        <img v-if="formStatus === 'Submitted'" src="https://a.storyblok.com/f/155950/1054x1054/2540a341ef/submitted-2x.png" alt="" class="absolute right-0 top-0">
      </h1>
      <div class="text-sm font-medium text-gray-400">
        This should only take 5 minutes. Rest assured your data is secure and encrypted.
      </div>
    </section>

    <!-- Body -->
    <section aria-label="form-content" class="mt-12 relative">
      <!-- hide when formStatus === 'Submitted'"  -->
      <button 
        class="text-gray-400 font-medium hover:text-fa-blue hover:font-bold" 
        :class="{'opacity-0': ! hasPreviousStep}"
        :disable="! hasPreviousStep" 
        @click=" goToPreviousStep()"
      >
        <font-awesome-icon icon="fa-solid fa-arrow-left" size="xs" />
        <span v-if="previousStep" class="pl-1 text-sm">Back to {{ previousStep.title }}</span>
      </button>

      <div class="flex gap-4 relative overflow-x-hidden pb-12 min-h-[500px]">
        <transition-group
            :name="slideDirection === 'right' ? 'slide-fade-right' : 'slide-fade-left'"
        >
          <template v-if="formStatus === 'Progress'">
            <ProgressStep 
              v-for="section in currentStep.sections" 
              :key="`step-${section.title}`" 
              :currentStep="currentStep" 
              :section="section" 
              :class="currentStep.sections.length === 2 ? 'w-1/2' : 'w-full'"
            />          
          </template>
          <VerificationStep v-else-if="formStatus === 'Verification'" @goTo="index => goToStep(index)" />          
          <SubmittedStep v-else-if="formStatus === 'Submitted'" />
        </transition-group>
      </div>
    </section>
    
    <div class="flex items-center gap-4">
      <SubmitButton 
        v-if="formStatus !== 'Submitted'"
        :text="formStatus === 'Verification' ? 'Submit' : 'Next'"
        :icon="formStatus === 'Verification' ? 'fa-envelope' : 'fa-arrow-right'"
        icon-size="xs"
        class="relative"
        @click="goToNextStep()"
      />
      <small class="text-red-800" v-if="validationStatus === 'Error'">
        <font-awesome-icon icon="fa-solid fa-info-circle" size="xs" />
        Please fix the following fields before continuing
      </small>
    </div>
    
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

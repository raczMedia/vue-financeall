<script lang="ts" setup>
  import { ref, computed, Ref } from 'vue';
  import { getFieldComponent, initForm, setAnswer, getAnswer, getSizing, getStatus, setStatus, getAnswers } from './fields/utils';
  import { Status } from './formTypes';

  import Form from './steps.json';
  import SubmitButton from './partials/submit-button.vue';
  import ProgressStep from './partials/progress-step.vue';
  import SubmittedStep from './partials/submitted-step.vue';
  import VerificationStep from './partials/verification-step.vue';
  import ProgressBar from './partials/progress-bar.vue';

  initForm(Form);

  const currentStepCount = ref(0);
  const previousStep = computed(() => Form.steps[currentStepCount.value - 1]);;
  const currentStep = computed(() => Form.steps[currentStepCount.value]);
  const hasNextStep = computed(() => Form.steps[currentStepCount.value + 1] ? true : false);
  const hasPreviousStep = computed(() => Form.steps[currentStepCount.value - 1] ? true : false);
  const stepProgress = computed(() => {
      return ((currentStepCount.value) / Form.steps.length * 100).toFixed(2);
  });
  const slideDirection = ref('left');

  const goToNextStep = () => {
    slideDirection.value = 'left';
    const status = getStatus();

    if (hasNextStep.value) {
      return currentStepCount.value += 1; 
    }

    if (status === 'Progress') {
      currentStepCount.value += 1; 
      return setStatus('Verification');
    }

    if (status === 'Verification') {
      return setStatus('Submitted');
    }
    // TODO: submit form
  }

  const goToPreviousStep = () => {
    slideDirection.value = 'right';
    const status = getStatus();

    if (status === 'Submitted') {
      return setStatus('Verification');
    }

    if (status === 'Verification') {
      currentStepCount.value -= 1; 
      return setStatus('Progress');
    }

    if (hasPreviousStep.value) {
      return currentStepCount.value -= 1; 
    }
  }

  const goToStep = (index: number) => {
    setStatus('Progress');
    currentStepCount.value = index;
  }

  const answers = getAnswers();
</script>

<template>
  <div class="px-8 lg:px-32 py-32 relative">
    <!-- Background shapes -->
    <div class="absolute clip-right-up-right bg-gray-300/20 left-0 top-0 w-4/5 h-screen"></div>
    <div class="absolute clip-right-up-right bg-gray-300/20 left-0 top-0 w-full h-screen"></div>
    
    <!-- Neader -->
    <section aria-label="application-header relative">
      <ProgressBar 
        class="pb-8"
        :color="getStatus() === 'Submitted' ? 'bg-green-600' : 'bg-fa-blue'"
        :progress="stepProgress"
      />
      <h1 class="text-4xl font-semibold py-4 relative w-full">
        Finance Application
        <img v-if="getStatus() === 'Submitted'" src="@/assets/submitted.png" alt="" class="absolute right-0 top-0">
      </h1>
      <div class="text-sm font-medium text-gray-400">This should only take 5 minutes. Rest assured your data is secure and encrypted.</div>
    </section>

    <!-- Body -->
    <section aria-label="form-content" class="mt-12 relative">
      <!-- hide when getStatus() === 'Submitted'"  -->
      <button 
      :disable="! hasPreviousStep" 
        class="text-gray-400 font-medium hover:text-fa-blue hover:font-bold" 
        :class="{'opacity-0': ! hasPreviousStep}"
        @click=" goToPreviousStep()"
      >
        <font-awesome-icon icon="fa-solid fa-arrow-left" size="xs" />
        <span v-if="previousStep" class="pl-1 text-sm">Back to {{ previousStep.title }}</span>
      </button>

      <div class="flex gap-4 relative overflow-x-hidden pb-12 min-h-[500px]">
        <transition-group
            :name="slideDirection === 'right' ? 'slide-fade-right' : 'slide-fade-left'"
        >
          <template v-if="getStatus() === 'Progress'">
            <ProgressStep 
              v-for="section in currentStep.sections" 
              :key="`step-${section.title}`" 
              :currentStep="currentStep" 
              :section="section" 
            />          
          </template>
          <VerificationStep v-else-if="getStatus() === 'Verification'" @goTo="index => goToStep(index)" />          
          <SubmittedStep v-else-if="getStatus() === 'Submitted'" />
        </transition-group>
      </div>
    </section>
    
    <SubmitButton 
      v-if="getStatus() !== 'Submitted'"
      :text="getStatus() === 'Verification' ? 'Submit' : 'Next'"
      :icon="getStatus() === 'Verification' ? 'fa-envelope' : 'fa-arrow-right'"
      icon-size="xs"
      class="relative"
      @click="goToNextStep()"
    />
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

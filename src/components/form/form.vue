<script lang="ts" setup>
  import { ref } from 'vue';
  import { useForm } from './utils/FormComposable';
  import { FormPageType } from './utils/formTypes';

  import ProgressStep from '@/components/form/partials/progress-step.vue';
  import SubmittedStep from '@/components/form/partials/submitted-step.vue';
  import VerificationStep from '@/components/form/partials/verification-step.vue';
  import SlideTransition from '@/components/form/partials/slideTransition.vue';
  
  const props = defineProps<{ content: FormPageType }>();
  const form = useForm(props.content);
  
  const slideDirection = ref('left');
  const goToNextStep = () => {
    slideDirection.value = 'left';
    form.toNextStep();
  }
  const goToPreviousStep = () => {
    slideDirection.value = 'right';
    form.toPreviousStep()
  }
</script>

<template>
  <div>
    <slot name="before" :form="form" />

    <section aria-label="form-content" :class="$attrs['content-class']">
      <!-- hide when formStatus === 'Submitted'"  -->
      <button 
        class="text-gray-400 font-medium hover:text-fa-blue hover:font-bold" 
        :class="{'opacity-0': ! form.hasPreviousStep.value}"
        :disable="! form.hasPreviousStep.value" 
        @click=" goToPreviousStep()"
      >
        <font-awesome-icon icon="fa-solid fa-arrow-left" size="xs" />
        <span v-if="form.previousStep.value" class="pl-1 text-sm">Back to {{ form.previousStep.value?.title }}</span>
      </button>

      <div
        class="flex gap-4 relative overflow-x-hidden pb-12" 
      >
        <SlideTransition :slideDirection="slideDirection">
          <VerificationStep 
            v-if="form.status.value === 'Verification'" 
            @goTo="index => form.goToStep(index)" 
          />          
          <SubmittedStep 
            v-if="form.status.value === 'Submitted'" 
          />
          <ProgressStep 
            v-if="form.status.value === 'Progress' && form.currentStep.value"
            :currentStep="form.currentStep.value"
            :slideDirection="slideDirection"
            @nextStep="goToNextStep"
          />          
        </SlideTransition>
      </div>
    </section>
    
    <slot name="after" :form="form" :goToNextStep="goToNextStep" />
  </div>
</template>

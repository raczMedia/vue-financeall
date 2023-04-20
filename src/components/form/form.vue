<script lang="ts" setup>
  import { ref } from 'vue';
  import { useForm } from './utils/FormComposable';
  
  import ProgressStep from './partials/progress-step.vue';
  import SubmittedStep from './partials/submitted-step.vue';
  import VerificationStep from './partials/verification-step.vue';
  
  import { FormPageType } from './utils/formTypes';

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

      <div class="flex gap-4 relative overflow-x-hidden pb-12 min-h-[500px]" v-if="form.currentStep.value">
        <transition-group :name="slideDirection === 'right' ? 'slide-fade-right' : 'slide-fade-left'">
          <VerificationStep 
            v-if="form.status.value === 'Verification'" 
            @goTo="index => form.goToStep(index)" 
          />          
          
          <SubmittedStep 
            v-if="form.status.value === 'Submitted'" 
          />
          
          <template v-if="form.status.value === 'Submitted'">
            <ProgressStep 
              v-for="section in form.currentStep.value.sections" 
              :key="`step-${section.title}`" 
              :currentStep="form.currentStep.value" 
              :section="section" 
              :class="form.currentStep.value.sections.length === 2 ? 'w-1/2' : 'w-full'"
            />          
          </template>
        </transition-group>
      </div>
    </section>
    
    <slot name="after" :form="form" :goToNextStep="goToNextStep" />
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

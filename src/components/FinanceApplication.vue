<script lang='ts' setup>
  import Form from '@/components/form/form.vue';
  import SubmitButton from '@/components/form/partials/submit-button.vue';
  import ProgressBar from '@/components/form/partials/progress-bar.vue';
  import { FormPageType } from '@/components/form/utils/formTypes';
  
  defineProps<{ content: FormPageType }>();
</script>

<template>
  <Form :content="content" class="flex-grow px-8 lg:px-32 py-32 relative" content-class="relative">
    <template #before="{ form }">
      <div class="absolute clip-right-up-right bg-gray-300/20 left-0 top-0 w-4/5 h-full"></div>
      <div class="absolute clip-right-up-right bg-gray-300/20 left-0 top-0 w-full h-full"></div>
      
      <section aria-label="application-header" class="relative mb-12">
        <ProgressBar 
          class="pb-8"
          :color="form.status.value === 'Submitted' ? 'bg-green-600' : 'bg-fa-blue'"
          :progress="form.stepProgress.value"
        />
        <h1 class="text-4xl font-semibold py-4 relative w-full">
          {{ content.Title }}
          <img 
            v-if="form.status.value === 'Submitted'" 
            src="https://a.storyblok.com/f/155950/1054x1054/2540a341ef/submitted-2x.png" 
            alt="success badge" 
            class="absolute right-0 top-0"
          />
        </h1>
        <div class="text-sm font-medium text-gray-400">
          This should only take 5 minutes. Rest assured your data is secure and encrypted.
        </div>
      </section>
    </template>

    <template #after="{ form, goToNextStep }">
      <div class="flex items-center gap-4">
        <SubmitButton 
          v-if="form.status.value !== 'Submitted'"
          :text="form.status.value === 'Verification' ? 'Submit' : 'Next'"
          :icon="form.status.value === 'Verification' ? 'fa-envelope' : 'fa-arrow-right'"
          icon-size="xs"
          class="relative"
          @click="goToNextStep()"
        />
        <small class="text-red-800" v-if="form.validationStatus.value === 'Error'">
          <font-awesome-icon icon="fa-solid fa-info-circle" size="xs" />
          Please fix the following fields before continuing
        </small>
      </div>
    </template>
  </Form>
</template>

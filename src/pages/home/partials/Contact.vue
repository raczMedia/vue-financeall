<script lang="ts" setup>
  import { Ref, ref } from 'vue';
  import { LooseObject } from '@/composables/jsUtils';
  import axios from 'axios';

  const props = defineProps<{content: LooseObject}>()

  const answers = ref(props.content!.fields);
  type Formstatus = "Standby" | "Sending" | "Sent";
  const formStatus: Ref<Formstatus> = ref('Standby')

  const submitContactForm = async () => {
    if (formStatus.value === 'Sending') {
      return false;
    }

    const data = new FormData();

    data.append('Form', "Home Page Contact");
    answers.value.forEach((answer: LooseObject) => {
      console.log('adding', answer.label, answer.value);

      data.append(answer.label, answer.value);
    });
    formStatus.value = "Sending";
    
    // prod: b568ab20cad8  
    // dev: de50c81a9d27
    axios.post('https://usebasin.com/f/b568ab20cad8', data) 
      .then(response => {
        if (response.status === 200) {
          console.log("success", {response});
        } else {
          console.log("Failed at Basin", {response});
        }
      })
      .catch(error => {
        console.log("Failed to make it to Basin", {error});
      })
      .finally(() => {
        setTimeout(() => {
          formStatus.value = "Sent";
          answers.value = answers.value.map((answer: LooseObject) => ({...answer, value: null}))

          setTimeout(() => {
            formStatus.value = "Standby";
          }, 1000)
        }, 1000)
      });
    }
</script>

<template>
  <section 
    v-if="props.content"
    id="contact"
    aria-label="Contact section" 
    class="min-h-64 py-[8rem] px-8 lg:px-32 -mt-12 bg-gray-100"
  >
    <div class="relative z-20 flex content-between">
      <section aria-label="Contact Form">
        <h3 class="text-4xl font-bold">
          {{ props.content.title }}
        </h3>
        <p class="text-gray-400">
          {{ props.content.subtitle }}
        </p>
        <div class="flex flex-wrap mt-8 gap-y-4">
          <label 
            v-for="(field, index) in props.content.fields" 
            :key="`contact-field-${index}`"
            class="flex flex-col w-full lg:pr-8"
            :class="{'lg:w-1/2': field.size === 'half'}"
          >
            <span class="pb-2">
              {{ field.label }}
            </span>
            <textarea 
              v-if="field.size == 'textarea'" 
              class="w-full px-8 py-4" 
              rows="4"
              v-model="answers[index].value"
            />
            <input 
              v-else 
              type="text" 
              class="px-8 py-4"
              v-model="answers[index].value"
            />
          </label>
        </div>
        <div class="flex justify-end lg:pr-8 pt-2">
          <button 
            class="text-white px-4 py-2 rounded mt-4 transition-all duration-300"
            :class="formStatus === 'Sent' ? 'bg-green-500' : 'bg-fa-blue'"
            @click="submitContactForm"
          >
            <template v-if="formStatus === 'Standby'">{{ props.content.buttonText }}</template>
            <template v-else-if="formStatus === 'Sending'">Sending</template>
            <template v-else-if="formStatus === 'Sent'">Sent</template>
          </button>
        </div>
      </section>
      <section aria-label="Location Map" class="hidden lg:flex w-2/4 flex-shrink-0">
        <img :src="props.content.map.filename" alt="">
      </section>
    </div>
  </section>
</template>

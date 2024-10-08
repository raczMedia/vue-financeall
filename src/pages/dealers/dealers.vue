<script lang='ts' setup>
  import { computed, ref } from 'vue';
  import { Ref } from "vue";
  import { useBridge, useStoryblokState } from '@/composables/storyblok/storyblokComposable';
  import { LooseObject } from '@/composables/jsUtils';
  import axios from 'axios';
  import { vMaska } from "maska";
  import Modal from '@/components/Modal.vue'
  import { StoryblokStateType } from '@/composables/storyblok/storyblok.types';
  import FinanceApplication from '@/components/FinanceApplication.vue';
  

  // form setup
  type Formstatus = "Standby" | "Sending" | "Sent";
  const formStatus: Ref<Formstatus> = ref('Standby')
  const answers = ref();

  // data from storyblok
  const { state: appState, content: appContent } = await useStoryblokState("car-loan-application");
  const { content, state } = await useStoryblokState('dealers');
  useBridge(state);

  // data filtering
  const bullets = computed(() => {
    return content.value?.body.find((section: LooseObject) => section.component === "Bullets")
  });
  const contact = computed(() => {
    const results = content.value?.body.find((section: LooseObject) => section.component === "Contact");
    answers.value = results?.fields ?? null;

    return results;
  });

  // submission
  const submitContactForm = async () => {
    if (formStatus.value === 'Sending') {
      return false;
    }

    formStatus.value = "Sending";

    const data = new FormData();
    data.append('Form', "Dealers Contact");
    answers.value.forEach((answer: LooseObject) => {
      data.append(answer.label, answer.value);
    });

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

  // field masking TODO: swap this with one from form utls
  const getMask = (field: LooseObject) => {
    if (field.type === "tel") {
      return '(###) ###-####';
    }
  }
</script>
<template>
  <section class="flex-grow px-8 lg:px-32 py-32 relative">
    <!-- Background shapes -->
    <div class="absolute clip-right-up-right bg-gray-300/20 left-0 top-0 w-4/5 h-full"></div>
    <div class="absolute clip-right-up-right bg-gray-300/20 left-0 top-0 w-full h-full"></div>

    <section aria-label="Intro" class="relative">
      <h3 class="text-3xl font-bold mb-8">
        {{ content?.Title }}
      </h3>

      <template v-if="bullets?.Items">
        <template v-for="bullet in bullets.Items" :key="bullet._uid">
          <h4 class="text-fa-blue text-xl font-bold mt-4">
            {{ bullet.title }}
          </h4>
          <template v-if="bullet.component === 'Bullet'">
            <p class="text-xl mt-4 pl-4">
              {{ bullet.info }}
            </p>
          </template>
          <template v-else-if="bullet.component === 'List'">
            <ul class="text-xl mt-4 pl-4">
              <li v-for="item in bullet.items" :key="item._uid" class="flex gap-2 items-center">
                <div class="rounded-full w-2 h-2 bg-fa-blue flex-shrink-0"></div>
                {{ item.title }}
              </li>
            </ul>      
          </template>
        </template>
      </template>
    </section>

    <section v-if="contact" class="flex gap-4 mt-8">
      <Modal 
        size="md" 
        title="Join Our Team" 
        class="bg-fa-blue text-white px-4 py-2 rounded-lg"
      >
        <template #body>
          <section aria-label="Dealer Form" class="relative">
            <h3 class="text-3xl font-bold">
              {{ contact.title }}
            </h3>
            <p class="text-gray-500 mt-2 mb-4">
              {{ contact.subtitle }}
            </p>
            <div class="flex flex-wrap mt-8 gap-y-4">
              <label 
                v-for="(field, index) in contact.fields" 
                :key="field._uid"
                class="flex flex-col px-2"
                :class="field.size === 'half' ? 'w-1/2' : 'w-full'"
                
              >
                <span class="pb-2 font-semibold text-fa-blue">{{ field.label }}</span>
                <textarea 
                    v-if="field.size == 'textarea'" 
                    class="px-8 py-4" 
                    rows="4"
                    v-model="answers[index].value"
                />
                <input 
                    v-else 
                    v-maska
                    :data-maska="getMask(field)"
                    type="text" 
                    class="px-8 py-4"
                    v-model="answers[index].value"
                />
              </label>
            </div>
          </section>
        </template>
        <template #footer>
          <button 
            class="text-white px-4 py-2 rounded transition-all duration-300"
            :class="formStatus === 'Sent' ? 'bg-green-500' : 'bg-fa-blue'"
            @click="submitContactForm"
          >
            <template v-if="formStatus === 'Standby'">Send</template>
            <template v-else-if="formStatus === 'Sending'">Sending</template>
            <template v-else-if="formStatus === 'Sent'">Sent</template>
          </button>
        </template>
      </Modal>

      <Modal 
        size="lg" 
        title="Dealer Car Loan Application"
        class="bg-fa-blue text-white px-4 py-2 rounded-lg"
      >
        <template #body>
          <FinanceApplication :content="appContent" />
        </template>
      </Modal>
    </section>
    
  </section>
</template>


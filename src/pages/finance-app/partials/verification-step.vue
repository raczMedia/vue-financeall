<script lang='ts' setup>
  import { computed } from 'vue';
  import { getAnswers } from '../utils/FormComposable';
  import { Answer, AnswerStep } from '../utils/formTypes';
  
  const answerLists = computed((): [AnswerStep[], AnswerStep[]] => {
    const list: AnswerStep[] = Object.values(getAnswers());
    const half = Math.ceil(list.length / 2);
    
    list.sort((a,b) => a.order - b.order);

    return [list.slice(0, half), list.slice(half)]
  });

  const chainValues = (field: Answer) => {
    return [
      field.answerBefore 
        ? field.answerBefore + " " 
        : undefined, 
      field.before, 
      field.value, 
      field.after 
        ? " " + field.after  
        : undefined, 
      field.answerAfter 
        ? " " + field.answerAfter
        : undefined
    ].join("")
  }

  const getValuesFromAnswer = (answer: AnswerStep) => Object
    .values(answer.fields)
    .map(field => Array.isArray(field) 
      ? field.map(item => chainValues(item)).join(" ")
      : chainValues(field)
    )

  defineEmits(['goTo']);
</script>
<template>
  <div class="w-full">
    <h2 class="text-xl font-bold text-fa-blue mb-8 select-none">Verification</h2>
    <div class="grid grid-cols-2 gap-4 w-full">
      <div v-for="(list, listIndex) in answerLists" :key="`list-column-${listIndex}`" class="flex flex-col gap-y-4">
        <div v-for="answer in list" :key="`step-${answer.order}`" class="flex flex-col items-start">
          <h3 
            class="font-bold hover:text-fa-blue cursor-pointer group" 
            @click="$emit('goTo', answer.order - 1)"
          >
            <span>{{ answer.title }}</span>
            <font-awesome-icon 
              icon="fa-solid fa-pencil" 
              class="text-fa-blue px-2 group-hover:scale-110" 
              size="xs" 
            />
          </h3>
          <div class="w-full flex flex-wrap gap-x-4 items-center">
            <template v-for="(value, index) in getValuesFromAnswer(answer)" :key="`answer-${answer.title}-${index}`">
              <div v-if="index !== 0" class="w-1 h-1 rounded-full bg-black"></div>
              <span>{{ value }}</span>
            </template>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-8">
      <h2 class="text-xl font-bold text-fa-blue mb-4 select-none">Authorization</h2>
      <label class="flex items-start px-2 py-4 bg-gray-50 border border-gray-300 rounded-lg">
        <input type="checkbox" class="mt-1.5 mx-2">
        <p>
          I permit <strong>FinanceAll/That Car Place</strong> and their partners to store and process my personal data. I/WE warrant and confirm that the information given in this application form is true and correct and I/we understand that it is being used to determine my credit responsibility and to evaluate and respond to my/our request for financing, you are authorized to obtain any information you may require for these purposes from other sources, including for example credit bureaus and each source is hereby authorized to provide you with such information. I/we also understand, acknowledge and agree that the information given in this application as well as other information you obtain in relation to my credit history will be disclosed to potential lenders, insurers, and other service providers, organizations providing technological or other support services required in relation to this application and other parties whom I/we propose to have a financial relationship. I/we further acknowledge and agree that each potential lender, insurer, or service provider to whom you provide the application and/or my/our personal information is permitted to receive such application and information and maintain records relating to me/us, including my/our social insurance number if I/we provide it, and disclose personal information about me/us, you and from third persons, including credit bureaus, credit reporting agencies, collection agencies, financial institutions, past or present employers, creditors, and landlords. I/we specifically consent to the release and disclosure of personal information.
        </p>
      </label>
    </div>
  </div>
</template>

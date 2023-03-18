<script lang='ts' setup>
  import { computed } from 'vue';
  import { getAnswers } from '../fields/utils';
  import { Answer, AnswerStep } from '../formTypes';
  
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
        <div v-for="answer in list" :key="`step-${answer.order}`" class="flex flex-col">
          <h3 class="font-bold">
            <span>{{ answer.title }}</span>
            <font-awesome-icon 
              icon="fa-solid fa-pencil" 
              class="text-fa-blue px-2 cursor-pointer hover:scale-110" 
              size="xs" 
              @click="$emit('goTo', answer.order - 1)" 
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
      <h2 class="text-xl font-bold text-fa-blue mb-8 select-none">Authorization</h2>
      <label class="flex items-start">
        <input type="checkbox" class="mt-1 mr-2">
        I certify that each of the statements made and answers given in this credit application are tru and correct and is made for the purpose of inducing and financing of the purchase of a motor vehicle. I authorize the obtaining of a consumer report to be used in evaluating this application and the obtaining and exchanging of credit information from and with other creditors and consumer reporting agencies.
      </label>
    </div>
  </div>
</template>

<script lang='ts' setup>
  import { computed } from 'vue';
  import { getAnswers } from '../fields/utils';
  import { StepAnswer } from '../formTypes';
  
  const answers = computed((): StepAnswer[] => {
    const list: StepAnswer[] = Object.values(getAnswers());

    return list.sort((a: StepAnswer,b) => a.order - b.order);
  });

  const getValuesFromAnswer = (answer: StepAnswer) => Object
    .values(answer.fields)
    .map(field => Array.isArray(field) 
      ? field.map(item => [item.before, item.value, item.after ? ` ${item.after}` : undefined].join("")).join(" ")
      : [field.before, field.value, field.after ? ` ${field.after}` : undefined].join("")
    )
</script>
<template>
  <div class="w-full">
    <h2 class="text-xl font-bold text-fa-blue mb-8 select-none">Verification</h2>
    <div class="grid grid-cols-2 gap-4 w-full">
      <div v-for="answer in answers" :key="`step-${answer.order}`" class="flex flex-col">
        <h3 class="font-medium">
          <span class="pr-2">{{ answer.title }}</span>
          <font-awesome-icon icon="fa-solid fa-pencil" class="text-fa-blue" size="xs" />
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
</template>

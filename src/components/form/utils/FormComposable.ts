import { ref, computed, ComputedRef, ShallowReactive } from 'vue';
import ImageRadio from '../fields/image-radio.vue';
import TextField from '../fields/text-field.vue';
import GroupField from '../fields/group-field.vue';
import DropdownField from '../fields/dropdown-field.vue';
import RadioField from '../fields/radio-field.vue';
import ToggleField from '../fields/toggle-field.vue';
import { Answer, AnswerStep, Field, FormPageType, Status, Step, ValidationStatus } from './formTypes';
import axios from 'axios';
import { toSnakeCase } from '@/composables/jsUtils';

import CarLoanForm from '@/components/form/car_loan_steps.json';
import PersonalLoanForm from '@/components/form/personal_loan_steps.json';

const url = ref<string | null>(null);
const applicationType = ref<string>("Your Form");
const answers = ref();
const validationStatus = ref<ValidationStatus>('Standby');


// options
export const sizeOptions = {
  xs: "w-16",
  sm: "w-24",
  md: "w-32",
  lg: "w-48",
  xl: "w-64",
  '2xl': "w-96",
  querter: "w-1/4",
  third: "w-1/3",
  half: "w-1/2",
  full: "w-full",
  "": ""
}
export const componentOptions = {
  'text': TextField,
  'tel': TextField,
  'email': TextField,
  'number': TextField,
  'money': TextField,
  'postal': TextField,
  'phone': TextField,
  'years': TextField,
  'months': TextField,

  'batch': GroupField,
  'row': GroupField,

  'image-radio': ImageRadio,
  'dropdown': DropdownField,
  'radio': RadioField,
  'toggle': ToggleField,
}
export const maskOptions = { 
  tel: '(###) ###-####', 
  number: 'Z.##', 
  postal: '@#@-#@#',
  years: '##',
  months: '##'
};
export const tokenOptions = { 
  number: 'Z:[0-9]:multiple',
};

export const useForm = async (content: FormPageType) => {
  const status = ref<Status>('Progress');
  const currentStepCount = ref(0);

  const previousStep = computed(() => {
    if (! content) {
      return null;
    }

    return content.body[0].steps[currentStepCount.value - 1]
  });
  const currentStep = computed(() => {
    if (! content.body[0]) {
      return null;
    }

    return content.body[0].steps[currentStepCount.value]
  });
  const hasNextStep = computed(() => {
    if (! content.body[0]) {
      return false;
    }

    return content.body[0].steps[currentStepCount.value + 1] ? true : false
  });
  const hasPreviousStep = computed(() => {
    if (! content.body[0]) {
      return false;
    }
    
    return content.body[0].steps[currentStepCount.value - 1] ? true : false
  });
  const stepProgress = computed(() => {
      if (! content.body[0]) {
        return '0';
      }

      return ((currentStepCount.value) / content.body[0].steps.length * 100).toFixed(2);
  });
  
  const stepIsValidated = () => {
    if (status.value === 'Verification' || ! currentStep.value) {
      return true;
    }
  
    return checkStepValidation(currentStep.value);
  }
  const toNextStep = async () => {
    if (! stepIsValidated()) {
      return setValidationStatus('Error');
    }
  
    if (hasNextStep.value) {
      return currentStepCount.value += 1; 
    }
  
    if (status.value === 'Progress') {
      currentStepCount.value += 1; 
      return setStatus('Verification');
    }
  
    if (status.value === 'Verification') {
      await submitApplication();
  
      return setStatus('Submitted');
    }
  }
  const toPreviousStep = () => {
    if (status.value === 'Submitted') {
      return setStatus('Verification');
    }
  
    if (status.value === 'Verification') {
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
  const setStatus = (newVal: Status) => status.value = newVal;

  applicationType.value = content.body[0].name;
  
  url.value = content.body[0].location;
  currentStepCount.value = 0;
  status.value = "Progress";
  validationStatus.value = "Standby";
    
  initAnswers(content.body[0].steps);

  return {
    currentStepCount,
    previousStep,
    currentStep,
    hasNextStep,
    hasPreviousStep,
    stepProgress,
    status,
    validationStatus,
    setStatus,
    toNextStep,
    toPreviousStep,
    goToStep,
  }
}


// Form status

// groups
const getGroupName = (field: Required<Field>) => field.group.split("[")[0];
const getGroupIndex = (field: Required<Field>) => Number(field.group.split("[")[1].replace(/\D/g,''));

// answers
const initAnswers = (stepsList: Step[]) => {
  answers.value = stepsList.reduce((acc, step, stepIndex) => {
    acc[step.name] = {
        title: step.title,
        fields: {},
        order: stepIndex + 1
    }
  
    return acc;
  }, {
    [stepsList[0].name]: {}
  });
}
export const getAnswers = (step: null | string = null) => step ? answers.value[step] : answers.value;
export const getAnswerFields = (step: string): Answer[] | null => {
  if (!answers?.value[step]) {
    return null;
  }

  const fields: Answer[] = Object.values(answers.value[step].fields);

  return !fields
    ? null
    : fields.flatMap((field: Answer) => field);
};
export const getAnswer = (
  step: Step, 
  field: Field
) => {
  if (! answers.value || ! Object.keys(answers.value[step.name].fields).length) {
    return null
  }

  if (field.group) {
    const groupName = getGroupName(field as Required<Field>);
    const groupPosition = getGroupIndex(field as Required<Field>);

    if (
      ! answers.value[step.name]?.fields[groupName]
      || ! answers.value[step.name].fields[groupName][groupPosition]
    ) {
      return null;
    }

    return answers.value[step.name].fields[groupName][groupPosition].value ?? null
  }

  return answers.value[step.name]?.fields[toSnakeCase(field.label)]?.value ?? null
}

export const setAnswer = (
  step: Step, 
  field: Field, 
  answer: { value: string, validated: boolean }
) => {
  setValidationStatus('Standby');

  const results = {
    ...field,
    name: toSnakeCase(field.label),
    value: answer.value,
    validated: answer.validated
  };

  if (field.group) {
    const groupName = getGroupName(field as Required<Field>);
    const groupPosition = getGroupIndex(field as Required<Field>);

    if (! answers.value[step.name].fields[groupName]) {
      answers.value[step.name].fields[groupName] = []
    }
    
    return answers.value[step.name].fields[groupName][groupPosition] = results;
  }

  answers.value[step.name].fields[toSnakeCase(field.label)] = results;
}

// fields
export const getFieldComponent = (type: string) => (componentOptions[type as keyof typeof componentOptions]);
export const getFieldSizing = (field: Field) => (sizeOptions[field.size as keyof typeof sizeOptions]);
export const getAllFieldsForStep = (step: Step) => {
  const results: Field[] = [];

  step.sections.forEach(section => {
    section.fields.forEach(field => {
      if (field.items) {
        field.items.forEach(item => results.push(item));
      } else {
        results.push(field);
      }
    })
  });

  return results;
}

// validation
export const checkStepValidation = (step: Step) => {
  const answerFields = getAnswerFields(step.name);
  const allFieldsForStep = getAllFieldsForStep(step);
  const requiredFields = allFieldsForStep.filter(field => evaluateRequirement(field, step));
  const hasInvalidAnswers = answerFields!.some((field: Answer) => field.validated === false);
  
  return hasInvalidAnswers || requiredFields.some(field => !answerFields?.find(item => item.name === toSnakeCase(field.label)))
    ? false
    : true
}
export const simpleValidate = (value: string | number | boolean | null, field: Field, step: Step): boolean => {
  const required = evaluateRequirement(field, step);

  if (! required) {
    return true;
  }

  return value ? true : false;
}
export const evaluateRequirement = (field: Field, step: Step): boolean => {
  if (field.required === 'false') {
    return false;
  }

  if (field.required === 'true') {
    return true;
  }

  if (field.required === "required-when") {
    const dependantFieldName = field.requiredDetail!.split(":")[0];
    const dependantFieldValue = field.requiredDetail!.split(":")[1];

    const fields = getAnswerFields(step.name);
    const dependantField = fields?.find((f) => toSnakeCase(f.label) === dependantFieldName);
    
    if (! dependantField) {
      return false;
    }

    return dependantFieldValue.split("|").some(val => dependantField.value === val);
  }

  return false;
}
export const getValidationStatus = () => validationStatus.value;
export const setValidationStatus = (status: ValidationStatus) => validationStatus.value = status;



// submission
export const submitApplication = () => {
  console.log('submit hit');

  const data = new FormData();
  const answersList: AnswerStep[] = getAnswers();

  data.append('Application', applicationType.value);

  Object.values(answersList).forEach((step: AnswerStep) => {
    Object.values(step.fields).flatMap(answer => answer).forEach((answer: Answer) => {
      data.append(capitalize(answer.name.replaceAll('_', ' ')), String(answer.value));
    });
  });

  // test de50c81a9d27
  // prod 58cc6f22c23c
  axios.post(url.value as string, data)
    .then(response => {
      if (response.status === 200) {
        console.log("success", {response});
      } else {
        console.log("fail", {response});
      }
    })
    .catch(error => {
      console.log({error});
      // Handle error response
    });
}


// to move later
function capitalize(word: string) {
  const lower = word.toLowerCase();
  return word.charAt(0).toUpperCase() + lower.slice(1);
}

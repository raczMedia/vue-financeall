import { ref } from 'vue';
import ImageRadio from '../fields/image-radio.vue';
import TextField from '../fields/text-field.vue';
import GroupField from '../fields/group-field.vue';
import DropdownField from '../fields/dropdown-field.vue';
import RadioField from '../fields/radio-field.vue';
import ToggleField from '../fields/toggle-field.vue';
import { Answer, Field, Status, Step, ValidationStatus } from './formTypes';

const form = ref<{steps: Step[]} | null>(null);
const answers = ref();
const status = ref<Status>('Progress');
const validationStatus = ref<ValidationStatus>('Standby');

export const useForm = (formRequest: {steps: Step[]}) => {
  form.value = formRequest;
  initAnswers(form.value.steps);
}

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

// Form status
export const getStatus = () => status.value;
export const setStatus = (newVal: Status) => status.value = newVal;

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

  return answers.value[step.name]?.fields[field.name]?.value ?? null
}
export const setAnswer = (
  step: Step, 
  field: Field, 
  answer: { value: string, validated: boolean }
) => {
  setValidationStatus('Standby');

  const results = {
    ...field,
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

  answers.value[step.name].fields[field.name] = results;
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
  
  return hasInvalidAnswers || requiredFields.some(field => !answerFields?.find(item => item.name === field.name))
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
  if (! field.required) {
    return false;
  }

  if (typeof field.required === "boolean") {
    return true;
  }

  const dependantFieldName = field.required.split(":")[0];
  const dependantFieldValue = field.required.split(":")[1];

  const fields = getAnswerFields(step.name);
  const dependantField = fields?.find((f) => f.name === dependantFieldName);
  
  if (! dependantField) {
    return false;
  }

  return dependantFieldValue.split("|").some(val => dependantField.value === val);
}
export const getValidationStatus = () => validationStatus.value;
export const setValidationStatus = (status: ValidationStatus) => validationStatus.value = status;

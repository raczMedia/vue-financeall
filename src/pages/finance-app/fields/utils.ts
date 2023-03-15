import { ref } from 'vue';
import ImageRadio from './image-radio.vue';
import TextField from './text-field.vue';
import GroupField from './group-field.vue';
import DropdownField from './dropdown-field.vue';
import RadioField from './radio-field.vue';
import ToggleField from './toggle-field.vue';
import { Field, Section, Status, Step } from '../formTypes';

const sizeOptions = {
  xs: "w-16",
  sm: "w-24",
  md: "w-32",
  lg: "w-48",
  xl: "w-64",
  '2xl': "w-96",
  full: "w-full",
  "": ""
};
const componentOptions = {
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

const form = ref<{steps: Step[]} | null>(null);
const answers = ref();
const status = ref<Status>('Progress');

const initAnswers = (stepsList: Step[]) => {
  const initialFields = { [stepsList[0].sections[0].fields[0].name]: null} 

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
export const initForm = (formRequest: {steps: Step[]}) => {
  form.value = formRequest;
  initAnswers(form.value.steps);
}

export const getStatus = () => status.value;
export const setStatus = (newVal: Status) => status.value = newVal;

export const getFieldComponent = (type: string) => (componentOptions[type as keyof typeof componentOptions]);
export const getSizing = (field: Field) => (sizeOptions[field.size as keyof typeof sizeOptions]);

const getGroupName = (field: Required<Field>) => field.group.split("[")[0];
const getGroupIndex = (field: Required<Field>) => Number(field.group.split("[")[1].replace(/\D/g,''));
export const getAnswers = () => answers.value;
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
  answer: { value: string }
) => {
  const results = {
    value: answer.value,
    label: field.label,
    name: field.name,
    group: field.group,
    answerBefore: field.answerBefore,
    answerAfter: field.answerAfter,
    before: field.before,
    after: field.after,
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

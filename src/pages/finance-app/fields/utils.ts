import { ref } from 'vue';
import ImageRadio from './image-radio.vue';
import TextField from './text-field.vue';
import GroupField from './group-field.vue';
import DropdownField from './dropdown-field.vue';
import RadioField from './radio-field.vue';
import ToggleField from './toggle-field.vue';
import { Field, Section, Status, Step } from '../formTypes';

const initAnswers = (stepsList: Step[]) => {
  const initialFields = { [stepsList[0].sections[0].fields[0].name]: null} 

  answers.value = stepsList.reduce((acc, step) => {
    acc[step.name] = {
        title: step.title,
        fields: step.sections.reduce((sectionAcc, section: Section, index) => {
            section.fields.forEach((field: Field) => {
                sectionAcc[field.name] = null;
            })
  
            return sectionAcc;
        }, initialFields)
    }
  
    return acc;
  }, {
    [stepsList[0].name]: { 
      title: stepsList[0].title, 
      fields: initialFields
    }
  });
}

const form = ref<{steps: Step[]} | null>(null);
const answers = ref();
const status = ref<Status>('Progress');
const currentStepCount = ref(0);

export const initForm = (formRequest: {steps: Step[]}) => {
  form.value = formRequest;
  initAnswers(form.value.steps);
  console.log('happened')
}

export const getStatus = () => status.value;
export const setStatus = (newVal: Status) => status.value = newVal;

export const getFieldComponent = (type: string) => ({
  'image-radio': ImageRadio,
  'text': TextField,
  'tel': TextField,
  'number': TextField,
  'money': TextField,
  'postal': TextField,
  'phone': TextField,
  'years': TextField,
  'months': TextField,
  'group': GroupField,
  'row': GroupField,
  'dropdown': DropdownField,
  'radio': RadioField,
  'toggle': ToggleField,
}[type]);

export const getSizing = (field: Field) => {
  if (field.type === 'group' || ! field.size) {
    return "";
  }

  return {
    xs: "w-16",
    sm: "w-24",
    md: "w-36",
    lg: "w-48",
    xl: "w-64",
    '2xl': "w-96",
    full: "w-full",
  }[field.size];
}

export const setAnswer = (
  step: Step, 
  field: Field, 
  answer: { value: string 
}) => {
  answers.value[step.name].fields[field.name] = answer.value;
}

export const getAnswer = (step: Step, field: Field) => {
  if (! step || ! field) {
      return null;
  } 

  const value = answers.value[step.name].fields[field.name];

  return value || null;
}

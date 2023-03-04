import { ref } from 'vue';
import ImageRadio from './image-radio.vue';
import TextField from './text-field.vue';
import GroupField from './group-field.vue';
import DropdownField from './dropdown-field.vue';
import RadioField from './radio-field.vue';
import { Field, Section, Step } from '../formTypes';

export const getComponent = (type: string) => ({
  'image-radio': ImageRadio,
  'text': TextField,
  'tel': TextField,
  'number': TextField,
  'money': TextField,
  'postal': TextField,
  'phone': TextField,
  'group': GroupField,
  'dropdown': DropdownField,
  'radio': RadioField,
}[type]);

export const answers = ref({});

export const initAnswers = (form: {steps: Step[]}) => {
  answers.value = form.steps.reduce((acc, step) => {
    acc[step.name] = {
        title: step.title,
        fields: step.sections.reduce((sectionAcc, section: Section, index) => {
            section.fields.forEach((field: Field) => {
                sectionAcc[field.name] = null;
            })
  
            return sectionAcc;
        }, {})
    }
  
    return acc;
  }, {});
}

export const setValue = (step, field, event) => {
  answers.value[step.name].fields[field.name] = event.value;
}

export const getValue = (step, field) => {
  if (! step || ! field) {
      return null;
  } 

  const value = answers.value[step.name].fields[field.name];

  return value || null;
}

import { LooseObject } from "@/composables/jsUtils";

export interface Option {
  value: string | boolean,
  title: string,
  asset?: {
    filename: string,
    id: number,
    name: string,
    title: string
  },
}
export interface Field {
  type: string,
  label: string,
  name: string,
  showLabel: boolean,
  placeholder?: string,
  size?: string,
  helper?: string,
  before?: string,
  after?: string,
  mask?: string,
  group?: string,
  answerBefore?: string,
  answerAfter?: string,
  options?: Option[],
  items?: Field[],
  required: boolean | string,
  requiredDetail?: string,
  meta?: LooseObject
}
export interface Section {
  size: string, 
  title: string, 
  fields: Field[]
}
export interface Step {
  title: string, 
  name: string, 
  sections: Section[]
}

export type Status = 'Progress' | 'Verification' | 'Submitted';
export type ValidationStatus = 'Standby' | 'Error';
export type FormTypes = 'Car Loan Application' | 'Personal Loan Application';

export interface Answer extends Field {
  value: string | number | boolean
  validated: boolean
}
export interface AnswerStep {
  title: string,
  order: number,
  fields: {string: Answer | Answer[]}
}

export interface FormPageType {
  Title: string,
  component: string,
  body: {
    steps: Step[],
    component: string,
    location: string,
    name: string
  }[]
}

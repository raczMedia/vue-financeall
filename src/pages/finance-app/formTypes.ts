export interface Option {
  value: string | boolean,
  title: string,
  asset?: string,
}
export interface Field {
  type: string,
  name: string,
  label?: string,
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
  items?: Field[]
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

export interface Answer extends Field {
  value: string | number | boolean
}
export interface AnswerStep {
  title: string,
  order: number,
  fields: {string: Answer | Answer[]}
}

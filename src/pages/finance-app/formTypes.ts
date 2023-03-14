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

export interface AnswerField {
  group: string | undefined, 
  label: string, 
  value: string | number | boolean, 
  name: string,
  before: string | undefined, 
  after: string | undefined,
}
export interface StepAnswer {
  title: string,
  order: number,
  fields: {string: AnswerField | AnswerField[]}
}

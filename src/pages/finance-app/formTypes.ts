export interface Option {
  value: string | boolean,
  title: string,
  asset?: string,
}
export interface Field {
  type: string,
  label?: string,
  name: string,
  options?: Option[],
  size?: string,
  placeholder?: string,
  helper?: string,
  after?: string,
  before?: string,
  items?: Field[],
  mask?: string
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

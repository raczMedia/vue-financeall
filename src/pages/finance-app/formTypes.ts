export interface Option {
  value: string,
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

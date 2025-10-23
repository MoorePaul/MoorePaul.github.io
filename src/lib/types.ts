
export type FormControl = {
  name: string;
  label?: string;
  info?: string;
};

export type FormSection = {
  title?: string;
  description?: string;

  questions: (SelectData | InputData)[];
};

export type DynForm = {
  title?: string;
  action: string;
  sections: FormSection[];
};

export type Option = {
  label: string;
  value: string;
  image?: string;
  price?: string;
};

export type GroupedOption = {
  name: string;
  options: Option[];
};

export type SelectData = {
  type: 'select';
  name: string;
  label?: string;
  info?: string;
  discount?: number;
  options: GroupedOption[] | Option[];
};

export type InputData = {
  type: 'input';
  name: string;
  inputType: 'text' | 'hidden' | 'submit'
  label?: string;
  info?: string;
  rows?: number;
  value?: string;
};

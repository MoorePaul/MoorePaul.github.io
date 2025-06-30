
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

export type SelectData = FormControl & {
  discount?: number;
  options: GroupedOption[];
};

export type InputData = FormControl & {
  rows?: number;
};

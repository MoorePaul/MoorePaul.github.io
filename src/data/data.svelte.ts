import type { DynForm, Option } from "$lib/types";
import { fmdata as formData, sampleHtml } from "./sample-data";

const data: { html?: string } = {
};
// const fdata: { form?: DynForm, options: { [qId: string]: Option } } = { options: {} };

export const appData = $state(data);
export const fmdata = $state({ form: formData, options: {} as { [qId: string]: Option | undefined } });
// export const fmdata = $state({ form: formData });
export const mbhtml = $state<string>(sampleHtml);

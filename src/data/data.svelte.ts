import type { DynForm } from "$lib/types";
import { fmdata as formData } from "./sample-data";

const data: { html?: string } = {
};
const fdata: { form?: DynForm } = {};

export const appData = $state(data);
export const fmdata = $state({ form: formData });
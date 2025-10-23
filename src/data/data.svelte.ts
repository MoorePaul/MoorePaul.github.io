import type { Option, SelectData } from "$lib/types";
import { fmdata as formData, sampleHtml } from "./sample-data";

const data: { html?: string } = {};

export const updateOptionsTotal = () => {
  const optionsTotal = Reflect.ownKeys(fmdata.options).reduce((tot, qId) => {
    const priceStr = fmdata.options[String(qId)]?.option.price;
    if (priceStr) {
      const matches = priceStr.replace(/,/g, '').match(/(\d+)円/);
      if (matches?.length) {
        tot += Number(matches[1]);
      }
    }
    return tot;
  }, 0);

  fmdata.optionsTotal = optionsTotal;
};

const selectedOptions = $state<Record<number, { question: SelectData; option: Option }>>({});

export const appData = $state(data);
export const fmdata = $state({ form: formData, options: {} as Record<string, { question: SelectData; option: Option } | undefined>, optionsTotal: 0 });
export const mbhtml = $state<string>(sampleHtml);

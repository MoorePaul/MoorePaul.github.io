<script lang="ts">
	import type { DynForm, FormSection, GroupedOption, Option, SelectData } from '$lib/types';
	import '../app.css';
	import { fmdata } from '../data/data.svelte';

	let { children } = $props();
	let mbhtml = $state(`<div id='test'>Just some text</div>`);
	let mbdiv = $state<HTMLDivElement>();
	const handleMessage = (event: MessageEvent<string>) => {
		console.log('got message in html1', event);
		if (event.data === 'parent ready') {
			console.log('Sending to parent 2');
			window.parent.postMessage('To parent', '*');
		} else if (event.data) {
			console.log(`event.data`, event.data);
			if (event.data.startsWith('JSON:')) {
				console.log(`HTML Component received a message: ${event.data}`);
				fmdata.form = JSON.parse(event.data.substring(5));
			} else {
				// Handle passing HTML
				console.log(`HTML Message`);
				mbhtml = event.data;
			}
		}
	};

	const htmlLoaded: (ev: Event & { currentTarget: EventTarget & Element }) => void = (ev) => {
		console.log(`htmlLoaded`, ev);
	};

	const addSelectOptions = (htmlOptions: HTMLCollectionOf<HTMLOptionElement>, options: Option[]) => {
		for (const htmlOpt of htmlOptions) {
      const [label, price] = (() => {
        const labelSpan = htmlOpt.querySelector('.city-text');
        const priceSpan = htmlOpt.querySelector('.city-small');
        if (labelSpan) return [labelSpan.textContent, priceSpan?.textContent];

        const matches = htmlOpt.textContent.match(/^([^:：]+)(?:(?::|：)([,\d]+円))?$/);
        if (matches?.length) return [matches[1], matches[2]];

        return [htmlOpt.textContent, undefined];
      })();
			const imgs = htmlOpt.getElementsByTagName('img');
			const imgSrc = imgs.length === 1 ? imgs[0].src : undefined;
			options.push({
				label: label,
				value: htmlOpt.value,
        price: price,
				image: imgSrc
			});
		}
	};

	const processChildren = (el: Element, currentSection: FormSection) => {
		let currentQuestion: FormSection['questions'][number];
		for (const ch of el.children) {
			switch (ch.tagName) {
				case 'SELECT':
					const label = ch.previousElementSibling;
          const info = ch.nextElementSibling;
					let opts: SelectData['options'];
          const htmlOptGrps = ch.getElementsByTagName('optgroup');
          if (htmlOptGrps.length) {
            opts = [] as GroupedOption[];
            for (const htmlOptGrp of htmlOptGrps) {
              const grpOpts: Option[] = [];
              opts.push({options: grpOpts, name: htmlOptGrp.label});
              const htmlOptions = htmlOptGrp.getElementsByTagName('option');
              addSelectOptions(htmlOptions, grpOpts);
            }
          } else {
            const htmlOptions = ch.getElementsByTagName('option');
            opts = [] as Option[];
            addSelectOptions(htmlOptions, opts);
          }
					currentQuestion = {
						name: label?.textContent ?? 'No name',
						type: 'select',
						label: label?.textContent ?? 'No label',
						options: opts,
            info: info?.tagName === 'P' ? info.textContent : undefined
					};
					currentSection.questions.push(currentQuestion);
					break;
				default:
					processChildren(ch, currentSection);
					break;
			}
		}
	};

	$effect(() => {
		if (mbdiv == null) return;
		// Need to read mbhtml so this effect will run when it changes because mbdiv.childNodes is not tracked
		console.log(`mbhtml reset`, mbhtml?.[0]);
		console.log(mbdiv.childNodes);
		const formDiv = mbdiv.getElementsByTagName('form').item(0);
		if (formDiv == null) return;
		const form: DynForm = { action: '', sections: [] };
		let currentSection: FormSection | undefined = undefined;
		const sectionElememts = formDiv.getElementsByTagName('section');
		if (sectionElememts.length) {
			for (const sectionElem of sectionElememts) {
				currentSection = { questions: [] };
				form.sections.push(currentSection);
				processChildren(sectionElem, currentSection);
			}
		} else {
			currentSection = { questions: [] };
			form.sections.push(currentSection);
			processChildren(formDiv, currentSection);
		}
    console.log(`setting fmdata`);
		fmdata.form = form;
    console.log(`fmdata has been set`);
	});

  $effect(() => {
    const optionTotals = Reflect.ownKeys(fmdata.options).reduce((tot, qId) => {
      const priceStr = fmdata.options[String(qId)]?.price;
      if (priceStr) {
        const matches = priceStr.replace(/,/g, '').match(/(\d+)円/);
        if (matches?.length) {
          tot += Number(matches[1]);
        }
      }
      return tot;
    }, 0);

    window.parent.postMessage(`priceUpdated: ${optionTotals}`, "*");
    console.log(`Sent price update: ${optionTotals}`);
  });
</script>

<svelte:window onmessage={handleMessage} />
<div style="display: none" onload={htmlLoaded} bind:this={mbdiv}>{@html mbhtml}</div>
{@render children()}

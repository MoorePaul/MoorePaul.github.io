<script lang="ts">
	import SimpleSelect from '$lib/mb-components/simple-select.svelte';
	import ImageSelect from '$lib/mb-components/image-select.svelte';
	import { fmdata } from '../data/data.svelte';
	import type { GroupedOption, Option } from '$lib/types';
	import { isGrouped } from '$lib/utils';
	import FormInput from '$lib/mb-components/form-input.svelte';

	const hasImages = (options: GroupedOption[] | Option[]) => {
		return isGrouped(options)
			? options.some((optGrp) => optGrp.options.some((opt) => opt.image != null))
			: options.some((opt) => opt.image != null);
	};
</script>

<div class="p-4 flex flex-col gap-4">
	{#each fmdata.form.sections as section}
		{#each section.questions as question}
			{#if question.type === 'select'}
				{#if hasImages(question.options)}
					<ImageSelect label={question.label} items={question.options} />
				{:else}
					<SimpleSelect label={question.label} items={question.options} />
				{/if}
			{:else if question.type === 'input'}
				<FormInput label={question.label} />
			{/if}
		{/each}
	{/each}
</div>

<script lang="ts">
	import type { GroupedOption, Option, SelectData } from '$lib/types';
	import * as Select from '$lib/components/ui/select';
	import { isGrouped } from '$lib/utils';
	import { Label } from '$lib/components/ui/label';
	import { fmdata, updateOptionsTotal } from '../../data/data.svelte';

	type Props = { id?: string; question: SelectData};
	const { id, question }: Props = $props();
	const {options: items, label, name, info } = question;

	let sel1Val = $state('');
	
	const sel1Content = $derived(isGrouped(items)
    ? items.flatMap(gp => gp.options).find(i => i.value === sel1Val)
    : items.find(i => i.value === sel1Val));

	const onValueChange = (val: string) => {
		const selItem = isGrouped(items)
			? items.flatMap(gp => gp.options).find(opt => opt.value === val)
			: items.find(i => i.value === sel1Val);

		console.log(`option changed`);
		if (id != null && selItem != null) {
			fmdata.options[id] = {question, option: selItem};
			updateOptionsTotal();
		}
	};
</script>

{#snippet optionContent(item?: Option)}
	{#if item}
		<div class="grid grid-cols-[1fr_auto] w-full">
			<div class="text-left">{item.label}</div>
			{#if item.price != null}<div>{item.price}</div>{/if}
		</div>
	{:else}
		Choose one
	{/if}
{/snippet}

<div class="flex flex-col gap-1">
	{#if label}
		<Label>{label}</Label>
	{/if}
	<Select.Root type="single" {name} bind:value={sel1Val} {onValueChange}>
		<Select.Trigger class="w-full">{@render optionContent(sel1Content)}</Select.Trigger>
		<Select.Content class="Content">
			{#if isGrouped(items)}
				{#each items as item}
					<Select.Group>
						<Select.Label>{item.name}</Select.Label>
						{#each item.options as option}
							<Select.Item value={option.value} label={option.label}>{option.label}{#if option.price}:{option.price}{/if}</Select.Item>
						{/each}
					</Select.Group>
				{/each}
			{:else}
				{#each items as option}
					<Select.Item value={option.value} label={option.label}>{@render optionContent(option)}</Select.Item>
				{/each}
			{/if}
		</Select.Content>
	</Select.Root>
	{#if info}
		<div class="text-xs text-gray-500">{info}</div>
	{/if}
</div>

<script lang="ts">
	import Label from '$lib/components/ui/label/label.svelte';
	import * as Select from '$lib/components/ui/select/index.js';
	import type { GroupedOption, Option } from '$lib/types';
	import { isGrouped } from '$lib/utils';
	import { fmdata } from '../../data/data.svelte';

	type Props = { id?: string; items: GroupedOption[] | Option[]; label?: string; info?: string };
	const { id, items, label, info }: Props = $props();

	let sel1Val = $state('');

	const sel1Content = $derived((isGrouped(items)
    ? items.flatMap((gp) => gp.options).find((opt) => opt.value === sel1Val)?.label
    : items[0].label) ?? 'Choose one');

	const onValueChange = (val: string) => {
		const selItem = isGrouped(items)
			? items.flatMap((gp) => gp.options).find((opt) => opt.value === val)
			: items[0];

		console.log(`option changed`);
		if (id != null) fmdata.options[id] = selItem;
	};
</script>

<div class="flex flex-col gap-1">
	{#if label}
		<Label>{label}</Label>
	{/if}
	<div style="display: none" data-select-viewport>test</div>
	<Select.Root type="single" name="sel1" bind:value={sel1Val} {onValueChange}>
		<Select.Trigger class="w-full">{sel1Content}</Select.Trigger>
		<Select.Content class="Content two-col">
			{#if isGrouped(items)}
				{#each items as item}
					<Select.Group class="w-[calc(100cqw-64px)] md:w-[calc(50cqw-32px)]">
						<Select.GroupHeading class="pt-4 text-pink-700 font-bold text-lg">{item.name}</Select.GroupHeading>
						{#each item.options as option}
							<Select.Item value={option.value} label={option.label} class="w-full">
								<div>
									{option.label}
									{#if option.image != null}<img src={option.image} alt="" width="100%" height="auto" />{/if}
									{#if option.price != null}{option.price}{/if}
								</div>
							</Select.Item>
						{/each}
					</Select.Group>
				{/each}
			{/if}
		</Select.Content>
	</Select.Root>
	{#if info}
		<div class="text-xs text-gray-500">{info}</div>
	{/if}
</div>

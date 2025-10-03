<script lang="ts">
	import type { GroupedOption, Option } from '$lib/types';
	import * as Select from '$lib/components/ui/select';
	import { isGrouped } from '$lib/utils';
	import { Label } from '$lib/components/ui/label';
	import { fmdata } from '../../data/data.svelte';

	type Props = { id?: string; items: GroupedOption[] | Option[]; label?: string };
	const { id, items, label }: Props = $props();

	let sel1Val = $state('');
	const sel1Content = $derived((isGrouped(items)
    ? items[0].options.find((i) => i.value === sel1Val)?.label
    : items.find((i) => i.value === sel1Val)?.label) ?? 'Choose one');

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
	<Select.Root type="single" name="sel1" bind:value={sel1Val} {onValueChange}>
		<Select.Trigger class="w-full">{sel1Content}</Select.Trigger>
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
					<Select.Item value={option.value} label={option.label}>{option.label}{#if option.price}:{option.price}{/if}</Select.Item>
				{/each}
			{/if}
		</Select.Content>
	</Select.Root>
</div>

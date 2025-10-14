<script lang="ts">
	import Label from '$lib/components/ui/label/label.svelte';
	import * as Select from '$lib/components/ui/select/index.js';
	import type { GroupedOption, Option } from '$lib/types';
	import { isGrouped } from '$lib/utils';
	import { fmdata } from '../../data/data.svelte';

	type Props = { id?: string; name: string; items: GroupedOption[] | Option[]; label?: string; info?: string };
	const { id, items, label, info, name }: Props = $props();

	let sel1Val = $state('');

	const sel1Content = $derived((isGrouped(items)
    ? items.flatMap((gp) => gp.options).find((opt) => opt.value === sel1Val)
    : items.find(opt => opt.value === sel1Val)));

	const onValueChange = (val: string) => {
		const selItem = isGrouped(items)
			? items.flatMap((gp) => gp.options).find((opt) => opt.value === val)
			: items.find(opt => opt.value === sel1Val);

		console.log(`option changed`);
		if (id != null) fmdata.options[id] = selItem;
	};
</script>

{#snippet triggerContent(item?: Option)}
	{#if item}
		{#if item.image}
			<div class="grid">
				<div class="text-red-400">{item.label}</div>
				{#if item.image != null}<div class="px-4"><img src={item.image} alt="" width="100%" height="auto" /></div>{/if}
				{#if item.price != null}<div>{item.price}</div>{/if}
			</div>
		{:else}
			<div class="grid grid-cols-[1fr_auto] w-full">
				<div class="text-left">{item.label}</div>
				{#if item.price != null}<div>{item.price}</div>{/if}
			</div>
		{/if}
	{:else}
		Choose one
	{/if}
{/snippet}

<div class="grid grid-cols-1 gap-1">
	{#if label}
		<Label>{label}</Label>
	{/if}
	<Select.Root type="single" {name} bind:value={sel1Val} {onValueChange}>
		<Select.Trigger class="w-full h-auto data-[size=sm]:h-auto data-[size=default]:h-auto">{@render triggerContent(sel1Content)}</Select.Trigger>
		<Select.Content class="Content two-col">
			{#if isGrouped(items)}
				{#each items as item}
					<Select.Group>
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
			{:else}
				{#each items as option}
					<Select.Item value={option.value} label={option.label} class="w-full">
						<div>
							{option.label}
							{#if option.image != null}<img src={option.image} alt="" width="100%" height="auto" />{/if}
							{#if option.price != null}{option.price}{/if}
						</div>
					</Select.Item>
				{/each}
			{/if}
		</Select.Content>
	</Select.Root>
	{#if info}
		<div class="text-xs text-gray-500">{info}</div>
	{/if}
</div>

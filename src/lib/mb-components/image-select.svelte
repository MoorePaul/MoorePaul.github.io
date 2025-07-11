<script lang="ts">
	import type { GroupedOption, Option } from '$lib/types';
  import * as Select from "$lib/components/ui/select/index.js";
	import Label from '$lib/components/ui/label/label.svelte';
	import { isGrouped } from '$lib/utils';

	type Props = { items: GroupedOption[] | Option[]; label?: string };
	const { items, label }: Props = $props();

  let sel1Val = $state("");
  const sel1Content = $derived((isGrouped(items) ? items[0].options.find(i => i.value === sel1Val)?.label : items[0].label) ?? 'Choose one');
</script>

<div class="flex flex-col gap-1">
{#if label}
  <Label>{label}</Label>
{/if}
<div style="display: none" data-select-viewport>test</div>
<Select.Root type="single" name="sel1" bind:value={sel1Val}>
  <Select.Trigger class="w-full">
    {sel1Content}
  </Select.Trigger>
  <Select.Content class="Content two-col">
    {#if isGrouped(items)}
      {#each items as item}
        <Select.Group class="w-[calc(100cqw-64px)] md:w-[calc(50cqw-32px)]">
          <Select.GroupHeading class="pt-4 text-pink-700 font-bold text-lg">{item.name}</Select.GroupHeading>
          {#each item.options as option}
          <Select.Item value={option.value} label={option.label} class="w-full">
            <div>
              {option.label}
              {#if option.image != null}
                <img src={option.image} alt="" width="100%" height="auto"/>
              {/if}
              {#if option.price != null}
                {option.price}
              {/if}
            </div>
          </Select.Item>
          {/each}
        </Select.Group>
      {/each}
    {/if}
  </Select.Content>
</Select.Root>
</div>
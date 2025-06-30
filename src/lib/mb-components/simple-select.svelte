<script lang="ts">
	import type { GroupedOption } from '$lib/types';
  import * as Select from "$lib/components/ui/select/index.js";

	type Props = { items: GroupedOption[] };
	const { items }: Props = $props();

  let sel1Val = $state("");
  const sel1Content = $derived(items[0].options.find(i => i.value === sel1Val)?.label ?? 'Choose one');
</script>

<Select.Root type="single" name="sel1" bind:value={sel1Val}>
  <Select.Trigger class="w-[180px]">
    {sel1Content}
  </Select.Trigger>
  <Select.Content class="Content">
    {#each items as item}
      <Select.Group>
        <Select.Label>{item.name}</Select.Label>
        {#each item.options as option}
        <Select.Item value={option.value} label={option.label}>{option.label}:{option.price}</Select.Item>
        {/each}
      </Select.Group>
    {/each}
  </Select.Content>
</Select.Root>

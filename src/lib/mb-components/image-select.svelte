<script lang="ts">
	import type { GroupedOption } from '$lib/types';
  import * as Select from "$lib/components/ui/select/index.js";
	import Label from '$lib/components/ui/label/label.svelte';

	type Props = { items: GroupedOption[]; label?: string };
	const { items, label }: Props = $props();

  let sel1Val = $state("");
  const sel1Content = $derived(items[0].options.find(i => i.value === sel1Val)?.label ?? 'Choose one');
</script>

{#if label}
  <Label class="mt-4">{label}</Label>
{/if}
<Select.Root type="single" name="sel1" bind:value={sel1Val}>
  <Select.Trigger class="w-[400px]">
    {sel1Content}
  </Select.Trigger>
  <Select.Content class="Content">
    {#each items as item}
      <Select.Group>
        <Select.Label class="pt-4 text-pink-700 font-bold text-lg">{item.name}</Select.Label>
        {#each item.options as option}
        <Select.Item value={option.value} label={option.label}>
          <div class="flex flex-col w-[300px]">
            {option.label}
            {#if option.image != null}
              <img src={option.image} alt="" width="100%" height="auto"/>
            {/if}
          </div></Select.Item>
        {/each}
      </Select.Group>
    {/each}
  </Select.Content>
</Select.Root>

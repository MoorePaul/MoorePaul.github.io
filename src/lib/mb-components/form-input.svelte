<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

	type Props = { label?: string };
	const { label }: Props = $props();
</script>

<div class="flex flex-col gap-1">
  {#if label}<Label>{label}</Label>{/if}
  <Input />
</div>

<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';

	type Props = { label?: string };
	const { label }: Props = $props();
</script>

{#if label}<Form.Label>{label}</Form.Label>{/if}
<Input />

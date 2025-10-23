<script lang="ts">
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';

  type Props = { id?: string; name: string; label?: string; type: 'text' | 'hidden' | 'submit'; value?: string };
  const { id, label, type, value }: Props = $props();
</script>

<div class={['flex', 'flex-col', 'gap-1', type === 'hidden' ? 'absolute' : undefined]}>
  {#if label && type === 'text'}<Label>{label}</Label>{/if}
  <Input {type} {value} />
</div>

<script lang="ts">
  import SimpleSelect from '$lib/mb-components/simple-select.svelte';
	import ImageSelect from "$lib/mb-components/image-select.svelte";
	import { items, secondItems } from "../data/sample-data";
</script>
 
<div class="p-4">
  <SimpleSelect items={items} />
  <ImageSelect label='シャフト' items={secondItems} />
</div>
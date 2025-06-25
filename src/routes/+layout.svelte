<script lang="ts">
	import '../app.css';
	import { appData } from '../data/data.svelte';

	let { children } = $props();
  const handleMessage = (event: MessageEvent) => {
    console.log('got message in html1', event);
      if (event.data === 'parent ready') {
        console.log('Sending to parent 2');
        window.parent.postMessage("To parent", "*");
      }

      else if (event.data) {
        console.log(`HTML Component received a message: ${event.data}`);
        //document.getElementById("form").innerHTML = event.data;
        appData.html = event.data;
      }
  }
</script>

<svelte:window onmessage={handleMessage} />
{@render children()}
{#if appData.html != null}
{@html appData.html}
{:else}
No html yet
{/if}
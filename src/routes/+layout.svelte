<script lang="ts">
	import '../app.css';
	import { fmdata } from '../data/data.svelte';

	let { children } = $props();
	const handleMessage = (event: MessageEvent) => {
		console.log('got message in html1', event);
		if (event.data === 'parent ready') {
			console.log('Sending to parent 2');
			window.parent.postMessage('To parent', '*');
		} else if (event.data) {
			console.log(`HTML Component received a message: ${event.data}`);
			fmdata.form = JSON.parse(event.data);
		}
	};
</script>

<svelte:window onmessage={handleMessage} />
{@render children()}

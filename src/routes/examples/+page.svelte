<script>
	import SeoOptions from '$lib/common/SeoOptions.svelte';
	import { resolve } from '$app/paths';
</script>

<SeoOptions title="Examples of Smartphone Adventures" />

<ul>
	<li><a href={resolve('/examples/room-changes')}>Simple Room change with one interaction</a></li>
	<li>
		<a href={resolve('/examples/test-game')}
			>Just a quick ChatGPT generated exploration of the initial idea</a
		>
	</li>
	<li><a href={resolve('/examples/tal-der-einhoerner')}>Tal der Einhörner (exploration)</a></li>
</ul>

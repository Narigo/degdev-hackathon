<script lang="ts">
	import SeoOptions from '$lib/common/SeoOptions.svelte';
	import { resolve } from '$app/paths';
</script>

<SeoOptions title="Smartphone Adventures" />

<h1>Welcome to Smartphone Adventures</h1>
<p>There are three parts:</p>

<ol>
	<li><a href={resolve('/examples')}>Examples</a></li>
	<li><a href={resolve('/editor')}>Editor for custom games</a></li>
</ol>

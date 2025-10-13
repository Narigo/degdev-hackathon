<script lang="ts">
	import GameRenderer from '$lib/smad/components/GameRenderer.svelte';
	import { loadGame } from '$lib/smad/smad';
	import { game } from '../../../lib/games/tal-der-einhoerner/game';

	const loadingGame = loadGame(game);
</script>

<main class="grid place-items-center">
	{#await loadingGame}
		<section class="border p-4">Loading game...</section>
	{:then game}
		<GameRenderer {game} />
	{/await}
</main>

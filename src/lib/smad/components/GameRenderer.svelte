<script lang="ts">
	import type { Game } from '../definitions';
	import GameConfigError from './GameConfigError.svelte';
	import RoomRenderer from './RoomRenderer.svelte';

	interface Props {
		game: Game;
	}

	let { game }: Props = $props();

	let gameState = game.state;
	console.log({ gameState: $gameState, rooms: game.rooms });
	let currentRoom = $derived(game.rooms[$gameState.currentRoom]);
</script>

{#if currentRoom}
	<section class="max-h-full max-w-full p-4">
		<RoomRenderer room={currentRoom} {game} />
	</section>
{:else}
	<GameConfigError message="Room {$gameState.currentRoom} does not exist!" />
{/if}

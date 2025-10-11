<script lang="ts">
	import { derived, get } from 'svelte/store';
	import type { Game, Room } from '../definitions';
	import { doAction, isVisible } from '../smad';
	import AssetRenderer from './AssetRenderer.svelte';
	import { onMount } from 'svelte';

	interface Props {
		room: Room;
		game: Game;
	}

	let { room, game }: Props = $props();
	let backgroundElement: HTMLDivElement;

	let states = derived(
		[game.state, game.inventoryState, room.state],
		([gameState, inventoryState, roomState]) => {
			return { game: gameState, inventory: inventoryState, room: roomState };
		}
	);
	let userActions = $derived(
		room.roomUserActions.filter((action) => {
			if (!action.visibleIf) {
				return true;
			}
			return isVisible(
				{ game: $states.game, room: $states.room, inventory: $states.inventory },
				action.visibleIf
			);
		})
	);

	let scaleFactor = $state(1);
	onMount(() => {
		function calculateScaleFactor() {
			scaleFactor = backgroundElement.clientWidth / game.style.size.width;
		}
		window.addEventListener('resize', calculateScaleFactor);
		setTimeout(calculateScaleFactor, 200);
		return () => {
			window.removeEventListener('resize', calculateScaleFactor);
		};
	});
</script>

<section class="grid place-items-center">
	<div class="relative">
		<div bind:this={backgroundElement}>
			<AssetRenderer asset={room.background} {game} />
		</div>
		{#if room.layout === 'interactive-description-actions'}
			{#each room.objects as interactionObject}
				{#if !interactionObject.visibleIf || isVisible({ game: $states.game, inventory: $states.inventory, room: $states.room }, interactionObject.visibleIf)}
					<div
						class="absolute"
						style="left:{scaleFactor * interactionObject.position.x}px;top:{scaleFactor *
							interactionObject.position.y}px;scale:{scaleFactor}"
					>
						<AssetRenderer asset={interactionObject.asset} {game} />
					</div>
				{/if}
			{/each}
		{/if}
	</div>
	{#if room.layout === 'background-description-actions' || room.layout === 'interactive-description-actions'}
		<div>{room.description}</div>
	{/if}
	<div class="grid auto-cols-fr">
		{#each userActions as { action, label }}
			<button
				class="p-4 hover:bg-sky-50"
				onclick={() => {
					doAction({ room, game }, action);
				}}>{label.text}</button
			>
		{/each}
	</div>
</section>

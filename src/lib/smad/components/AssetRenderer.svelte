<script lang="ts">
	import { asset as assetPath } from '$app/paths';
	import type { Background, Game } from '../definitions';

	interface Props {
		asset: Background;
		game: Game;
	}
	let { asset, game }: Props = $props();

	function srcToPath(path: string): string {
		if (path.match(/^https?:\/\//)) {
			return path;
		}
		return assetPath(`/games/${game.id}${path}`);
	}
</script>

{#if asset.type === 'image'}
	<img src={srcToPath(asset.src)} alt={typeof asset.alt === 'string' ? asset.alt : asset.alt.t} />
{/if}

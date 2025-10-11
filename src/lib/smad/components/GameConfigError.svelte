<script lang="ts">
	interface Props {
		message: string;
	}
	let { message }: Props = $props();
</script>

<div class="grid gap-4 rounded border-red-500 bg-red-200 p-4">
	<h2>🤖⚡️ Error!</h2>
	<p>There is an error in the game configuration!</p>
	<p>{message}</p>
</div>

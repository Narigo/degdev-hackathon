<script lang="ts">
	import { gameDefinitionSchema } from '$lib/smad/validations';
	let textAreaElement: HTMLTextAreaElement;
	let lastResult = $state<{ success: boolean; message: string } | undefined>();
</script>

<section
	class="grid min-h-svh max-w-2xl min-w-full grid-rows-[max-content_1fr_max-content_max-content] gap-4 p-4"
>
	<form action="#">
		<h2>Validation</h2>
		<textarea class="p4 justify-self-stretch border" bind:this={textAreaElement}></textarea>
		<button
			onclick={(event) => {
				event.preventDefault();
				console.log(textAreaElement.value);
				const result = gameDefinitionSchema.safeParse(textAreaElement.value);

				if (result.success) {
					lastResult = { success: true, message: 'success!' };
				} else {
					lastResult = { success: false, message: result.error.message };
				}
			}}
		>
			Validate
		</button>
		{#if lastResult?.success}
			<div>
				<h3>Success!</h3>
				<div>{lastResult.message}</div>
			</div>
		{:else if lastResult?.success === false}
			<div class="border-left-2 border-red-400 bg-red-100">
				<h3>Failed!</h3>
				<div>{lastResult.message}</div>
			</div>
		{/if}
	</form>
</section>

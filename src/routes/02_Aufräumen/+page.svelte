<script lang="ts">
	import { projekt } from './projekt_store';

	let projekt_name = 'Projekt A';
</script>

<div class="space-y-4">
	<div>
		<input type="text" class="p-2 border" bind:value={projekt_name} />
		<button on:click={() => projekt.laden(projekt_name)} class="border-2 p-2 bg-blue-100">
			Daten laden
		</button>
	</div>

	<div>
		<div class="font-semibold">Projekt Name</div>
		<div>{$projekt?.name ?? '-'}</div>
	</div>

	{#if $projekt}
		<div>
			<div class="font-semibold">Aufgaben</div>
			{#each $projekt.aufgaben as aufgabe}
				<div>{aufgabe.name}</div>
			{:else}
				<div>Keine Aufgaben</div>
			{/each}
		</div>
	{/if}
</div>

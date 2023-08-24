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
		<div>{$projekt.value?.name ?? '-'}</div>
	</div>

	{#if $projekt.error}
		<div class="bg-red-400 p-2">{$projekt.error}</div>
	{/if}

	{#if $projekt.value}
		<div>
			<div class="font-semibold">Aufgaben</div>
			{#each $projekt.value.aufgaben as aufgabe}
				<div>{aufgabe.name}</div>
			{:else}
				<div>Keine Aufgaben</div>
			{/each}
		</div>
	{/if}
</div>

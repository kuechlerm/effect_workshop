<script lang="ts">
	import { projekt_service } from '$lib/test_service';

	let projekt_name = 'Projekt A';
	let projekt: any;
	let aufgaben: any[] = [];

	async function daten_laden() {
		const projekt_json = await projekt_service.get_projekt_json(projekt_name);
		projekt = JSON.parse(projekt_json);

		const alle_aufgaben = await projekt_service.get_aufgaben_json(projekt.id);

		for (const aufgabe of JSON.parse(alle_aufgaben)) {
			if (aufgabe.done) continue;

			aufgaben.push(aufgabe);
			aufgaben = aufgaben.sort((a, b) => b.id - a.id);
		}
	}
</script>

<div class="space-y-4">
	<div>
		<input type="text" class="p-2 border" bind:value={projekt_name} />
		<button on:click={daten_laden} class="border-2 p-2 bg-blue-100">Daten laden</button>
	</div>

	<div>
		<div class="font-semibold">Projekt Name</div>
		<div>{projekt?.name ?? '-'}</div>
	</div>

	<div>
		<div class="font-semibold">Aufgaben</div>
		{#each aufgaben as aufgabe}
			<div>{aufgabe.name}</div>
		{:else}
			<div>Keine Aufgaben</div>
		{/each}
	</div>
</div>

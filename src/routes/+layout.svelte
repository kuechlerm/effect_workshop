<script lang="ts">
	import '../app.postcss';
	import { projekt_service } from '$lib/test_service';
</script>

<main class="container mx-auto space-y-4 p-8">
	<div class="bg-blue-300 p-4 flex gap-4 items-center">
		<div>
			<a href="/" class="font-semibold">START</a>
		</div>

		<div>|</div>

		<div class="font-semibold">Service-Zustände</div>
		<label class="bg-blue-100 p-2 rounded-xl">
			<input type="checkbox" bind:checked={$projekt_service.projekte_offline} />
			Projekt API Offline
		</label>

		<label class="bg-blue-100 p-2 rounded-xl">
			<input type="checkbox" bind:checked={$projekt_service.aufgaben_offline} />
			Aufgaben API Offline
		</label>
	</div>

	<div>
		<slot />
	</div>
</main>

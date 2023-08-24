import { projekt_service } from '$lib/test_service';
import { writable } from 'svelte/store';

export type Aufgabe = {
	id: number;
	name: string;
	done?: boolean;
};

export type Projekt = {
	id: number;
	name: string;
	aufgaben: Aufgabe[];
};

function create_projekt_store() {
	const store = writable<Projekt | null>(null);

	async function laden(projekt_name: string) {
		const projekt = await projekt_laden(projekt_name);

		const aufgaben = await aufgaben_laden(projekt.id);
		const aufgaben_aufbereitet = aufgaben_aufbereiten(aufgaben);

		projekt.aufgaben = aufgaben_aufbereitet;

		store.set(projekt);
	}

	async function projekt_laden(projekt_name: string) {
		const projekt_json = await projekt_service.get_projekt_json(projekt_name);
		const projekt: Projekt = { ...JSON.parse(projekt_json), aufgaben: [] };
		return projekt;
	}

	async function aufgaben_laden(projekt_id: number) {
		const aufgaben_json = await projekt_service.get_aufgaben_json(projekt_id);
		const aufgaben = JSON.parse(aufgaben_json);
		return aufgaben;
	}

	function aufgaben_aufbereiten(aufgaben: Aufgabe[]) {
		return aufgaben
			.filter((aufgabe) => !aufgabe.done) //
			.sort((a, b) => a.name.localeCompare(b.name));
	}

	return {
		...store,
		laden
	};
}

export const projekt = create_projekt_store();

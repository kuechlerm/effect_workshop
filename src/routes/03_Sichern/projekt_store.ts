import { projekt_service } from '$lib/test_service';
import { writable } from 'svelte/store';

export type StoreState = {
	value: Projekt | null;
	error: string;
};

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
	const store = writable<StoreState>({ value: null, error: '' });

	async function laden(projekt_name: string) {
		try {
			const projekt = await projekt_laden(projekt_name);

			const aufgaben = await aufgaben_laden(projekt.id);
			const aufgaben_aufbereitet = aufgaben_aufbereiten(aufgaben);

			projekt.aufgaben = aufgaben_aufbereitet;

			store.set({ value: projekt, error: '' });
		} catch (error: unknown) {
			console.log('laden Fehler', error);

			if (error instanceof Error) {
				store.set({ value: null, error: error.message });
			} else {
				store.set({ value: null, error: 'Unbekannter Fehler' });
			}
		}
	}

	async function projekt_laden(projekt_name: string) {
		let projekt_json: string;
		try {
			projekt_json = await projekt_service.get_projekt_json(projekt_name);
		} catch (error) {
			console.log('projekt_laden Fehler', error);
			throw new Error('Projekte können aktuell nicht abgerufen werden');
		}

		let projekt: Projekt;
		try {
			projekt = { ...JSON.parse(projekt_json), aufgaben: [] };
		} catch (error) {
			console.log('projekt_laden Fehler', error);
			throw new Error('Projekt konnte nicht verarbeitet werden');
		}

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		if ((projekt as any).error) throw new Error('Projekt nicht gefunden');

		return projekt;
	}

	async function aufgaben_laden(projekt_id: number) {
		let aufgaben_json;
		try {
			aufgaben_json = await projekt_service.get_aufgaben_json(projekt_id);
		} catch (error) {
			console.log('aufgaben_laden Fehler', error);

			throw new Error('Aufgaben können aktuell nicht abgerufen werden');
		}

		let aufgaben: Aufgabe[];
		try {
			aufgaben = JSON.parse(aufgaben_json);
		} catch (error) {
			console.log('aufgaben_laden Fehler', error);
			throw new Error('Aufgaben konnten nicht verarbeitet werden');
		}

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		if ((aufgaben as any).error) throw new Error('Keine Aufgaben zu Projekt gefunden');

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

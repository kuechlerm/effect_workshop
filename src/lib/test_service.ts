/** Diese Datei nicht verändern - die Services dienen als Basis für die Übungen in routes  */

import { get, writable } from 'svelte/store';

function create_projekt_service() {
	const store = writable({ projekte_offline: false, aufgaben_offline: false });

	function get_projekt_json(projekt_name: string) {
		const is_offline = get(store).projekte_offline;

		if (is_offline) {
			throw new Error('Kunden sind alles Trottel und Projekt API offline');
		}

		if (projekt_name === 'Projekt A')
			return Promise.resolve(JSON.stringify({ id: 557, name: 'Test Projekt' }));

		return Promise.resolve(
			JSON.stringify({ error: true, message: 'Projekt nicht gefunden, Du Vollidiot' })
		);
	}

	function get_aufgaben_json(projekt_id: number) {
		const is_offline = get(store).aufgaben_offline;

		if (is_offline) {
			throw new Error('Wir haben wieder Scheiße gebaut - Aufgaben API offline');
		}

		if (projekt_id === 557)
			return Promise.resolve(
				JSON.stringify([
					{ id: 1, name: 'Aufgabe B' },
					{ id: 2, name: 'Aufgabe A' },
					{ id: 3, name: 'Aufgabe C', done: true }
				])
			);

		return Promise.resolve(
			JSON.stringify({ error: true, message: 'Aufgaben nicht gefunden, Kacke!' })
		);
	}

	return {
		...store,
		get_projekt_json,
		get_aufgaben_json
	};
}

export const projekt_service = create_projekt_service();

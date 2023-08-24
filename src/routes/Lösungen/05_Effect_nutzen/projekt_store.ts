import { Effect as E, pipe } from 'effect';
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
		const programm = pipe(
			projekt_laden(projekt_name),
			E.flatMap(parse_json<Projekt>),
			E.flatMap(ergebnis_prüfen<Projekt>('Projekt nicht gefunden')),
			E.flatMap((projekt) =>
				pipe(
					aufgaben_laden(projekt.id),
					E.flatMap(parse_json<Aufgabe[]>),
					E.flatMap(ergebnis_prüfen<Aufgabe[]>('Keine Aufgaben zu Projekt gefunden')),
					E.map(aufgaben_aufbereiten),
					E.map((aufgaben) => ({ ...projekt, aufgaben } as Projekt))
				)
			),
			E.match({
				onSuccess: (projekt) => store.set({ value: projekt, error: '' }),
				onFailure: (error) => {
					console.log('laden Fehler', error);
					store.set({ value: null, error: error.message });
				}
			})
		);

		await E.runPromise(programm);
	}

	const projekt_laden = (projekt_name: string) =>
		E.tryPromise({
			try: () => projekt_service.get_projekt_json(projekt_name),
			catch: () => new Error('Projekte können aktuell nicht abgerufen werden')
		});

	const aufgaben_laden = (projekt_id: number) =>
		E.tryPromise({
			try: () => projekt_service.get_aufgaben_json(projekt_id),
			catch: () => new Error('Aufgaben können aktuell nicht abgerufen werden')
		});

	function ergebnis_prüfen<T extends object>(fehler_text: string) {
		return function (ergebnis: T): E.Effect<never, Error, T> {
			return 'error' in ergebnis
				? E.fail(new Error(fehler_text)) //
				: E.succeed(ergebnis);
		};
	}

	function parse_json<T>(json: string) {
		return E.try({
			try: () => JSON.parse(json) as T,
			catch: () => new Error('Daten konnte nicht verarbeitet werden')
		});
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

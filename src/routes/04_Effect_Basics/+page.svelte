<script lang="ts">
	import { Effect as E, pipe } from 'effect';

	let ausgangs_zahl = 10;
	let divisor_wert = 2;

	const verdoppeln = (zahl: number) => zahl * 2;
	const addieren = (zahl: number) => zahl + 5;

	const non_total_division = (divident: number, divisor: number) => divident / divisor;

	// Rückgabetype wichtig!
	const division = (divident: number, divisor: number): E.Effect<never, string, number> =>
		divisor === 0 //
			? E.fail('Division durch 0')
			: E.succeed(divident / divisor);

	const division_durch_2 = (divident: number) => division(divident, divisor_wert);

	let kalkulation = '-';
	let kalkulation_mit_division_ergebnis = '-';

	function kalkulieren() {
		kalkulation = pipe(ausgangs_zahl, verdoppeln, addieren, String);

		const kalkulation_mit_division = pipe(
			ausgangs_zahl,
			division_durch_2,
			// E.tap((e) => E.sync(() => console.log('division:', e))),
			E.map(verdoppeln),
			E.map(addieren),
			E.orElseSucceed(() => -1),
			E.map(String)
		);

		kalkulation_mit_division_ergebnis = E.runSync(kalkulation_mit_division);
	}
</script>

<div>
	Ausgangszahl <input type="number" class="p-2 border" bind:value={ausgangs_zahl} />
</div>
<div>
	Divisor <input type="number" class="p-2 border" bind:value={divisor_wert} />
</div>

<div>
	<button on:click={kalkulieren} class="border-2 p-2 bg-blue-100"> Kalkulieren </button>
</div>

<div>
	Kalkulation {kalkulation}
</div>

<div>
	Kalkulation mit Division {kalkulation_mit_division_ergebnis}
</div>

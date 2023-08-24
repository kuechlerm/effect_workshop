
## Setup
- npm / pnpm install
- npm / pnpm run dev



## Ablauf
- Erinnerung: was ist Functional Programming?
- Was wollen wir davon praktisch nutzen?
  - unary, pure and total functions
    - 1 Argument
    - keine Nebeneffekte
    - für jeden möglichen Input der Input-Domäne gibt es einen Output der Output-Domäne
  - functions als "first class citizens", also functions als
    - Input
    - Output
    - Higher Order Functions
  - Functional Composition
    - Currying?
    - Partial Application
    - Chaining (flow / pipe)
    - "Dependency Injection"
  - Functional Domain Modeling
    - Algebraic Data Types
      - Product Types: Tuple, Record, "Object"
      - Sum Types: Discriminated Union, "Enum"
  - Immutability
- Was ist Effect?
    - functional patterns, using typescript, batteries included
    - Features
        - Composability
            Construct highly maintainable, readable, and flexible software through the use of small, reusable building blocks.
        - Type Safety
            Leverage the TypeScript type system to the fullest with Effect's focus on type inference and type safety.
        - Asynchronicity
            Write code that looks the same, whether it is synchronous or asynchronous.
        - Error Handling
            Handle errors in a structured and reliable manner using Effect's built-in error handling capabilities.
        - Concurrency
            Achieve highly-scalable, ultra low-latency applications through Effect's fiber-based concurrency model.
        - Resource Safety
            Safely manage acquisition and release of resources, even when your program fails.
        - Observability
            With full tracing capabilities, you can easily debug and monitor the execution of your Effect program.

## Aufgabenstellung
- Projekt "Projekt A" per API abholen
- Aufgaben zu "Projekt A"
  - per API abholen
  - erledigte rausfiltern
  - alphabetisch nach Name sortieren
- Projekt und Aufgaben darstellen
- ab 3.: geeignete Fehlermeldungen darstellen

## Übungen
1. Käse
2. Aufräumen
   - types
   - functions
3. Sichern
4. Effect Basics
5. Effect nutzen

- Beispiele
  - kack functions verbessern
    - Logik + API-Zugriffe zusammen in Svelte-Component
    - -> Fehlerbehandelung hinzufügen
      - trycatch (Fehler-Flag + result in Store)
      - Fehler: Verbindung wackelig (retry?), falscher-input, Auth?
    - -> Logik in Store verschieben
    - -> Logik von API-Zugriffe trennen, Zugriffe aufteilen
    - -> Fehlerbehandlung hinzufügen
  - Effect erstellen und laufen lassen
  - Effect mit Fehler laufen lassen und Fehlermeldung anzeigen
  - mehrere function calls mit unterschiedlichen Fehlern



```typescript
type Immutable<TObject> = {
	readonly [TKey in keyof TObject]:
		keyof TObject[TKey] extends undefinded
		? TObject[TKey]
		: Immmutable<TObject[TKey]>;
}

// example
type Order = Immutable<{
	orderId: string;
	nested: { cannot_change: string; }
}>;
```
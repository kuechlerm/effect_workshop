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
    - Features: https://effect.website/

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
3. Sichern
4. Effect Basics
5. Effect nutzen

## Bonus
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
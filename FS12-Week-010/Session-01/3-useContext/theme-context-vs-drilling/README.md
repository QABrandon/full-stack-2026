# Theme Demo: Prop Drilling vs useContext

Two tiny apps rendered side-by-side. Same feature — a theme value reaching a
deeply nested `GrandChild` — implemented two ways.

## Structure
```
src/
├── AppDrilling.jsx          ← owns state, passes theme down
├── drilling/
│   ├── Parent.jsx           ← accepts & forwards `theme`
│   ├── Child.jsx            ← accepts & forwards `theme`
│   └── GrandChild.jsx       ← uses `theme`
├── AppContext.jsx           ← owns state, provides ThemeContext
├── context/
│   ├── Parent.jsx           ← no props
│   ├── Child.jsx            ← no props
│   └── GrandChild.jsx       ← reads ThemeContext directly
├── ThemeContext.js          ← the context object
└── main.jsx                 ← renders both apps side-by-side
```

## Run
```
npm install
npm run dev
```

## What to notice
- In drilling, `Parent` and `Child` must accept and forward a prop they never use.
- Drilling us ok to use most of the time, its only if a really large portion of the application needs something that we use useContext()
- With context, only the provider (`AppContext`) and consumer (`GrandChild`) touch `theme`.
- Uses React 19's `<ThemeContext value={...}>` provider syntax (no `.Provider`).

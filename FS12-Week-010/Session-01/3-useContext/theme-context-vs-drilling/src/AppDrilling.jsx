import { useState } from 'react';
import Parent from './drilling/Parent';

export default function AppDrilling() {
  const [theme, setTheme] = useState('light');

  return (
    <section className={`panel ${theme}`}>
      <h2>Prop Drilling</h2>
      <button onClick={() => setTheme(t => (t === 'light' ? 'dark' : 'light'))}>
        Toggle theme
      </button>
      <Parent theme={theme} />
      <small>Parent and Child forward `theme` without using it.</small>
    </section>
  );
}

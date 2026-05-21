import { useState } from 'react';
import { ThemeContext } from './ThemeContext';
import Parent from './context/Parent';

export default function AppContext() {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext value={theme}>
      <section className={`panel ${theme}`}>
        <h2>useContext</h2>
        <button onClick={() => setTheme(t => (t === 'light' ? 'dark' : 'light'))}>
          Toggle theme
        </button>
        <Parent />
        <small>Parent and Child don't touch `theme`. GrandChild reads it directly.</small>
      </section>
    </ThemeContext>
  );
}

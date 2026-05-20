import { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';

export default function GrandChild() {
  const theme = useContext(ThemeContext);
  return <p>GrandChild sees: <strong>{theme}</strong></p>;
}

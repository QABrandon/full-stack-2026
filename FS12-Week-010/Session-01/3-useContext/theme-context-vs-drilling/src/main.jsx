import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AppDrilling from './AppDrilling';
import AppContext from './AppContext';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <main className="split">
      <AppDrilling />
      <AppContext />
    </main>
  </StrictMode>
);

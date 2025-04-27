
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const root = createRoot(document.getElementById("root")!);

// Handle page reloads
window.addEventListener('load', () => {
  root.render(<App />);
});

root.render(<App />);

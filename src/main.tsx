
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add a patch to catch Select.Item issues
const originalError = console.error;
console.error = function(...args) {
  // Check if this is a Select.Item error
  if (args[0] && typeof args[0] === 'string' && args[0].includes('A <Select.Item /> must have a value prop')) {
    console.warn('DEBUGGING SELECT ITEM:', args);
    // Print stack trace to help identify the component
    console.trace('Select.Item error location:');
  }
  return originalError.apply(console, args);
};

const root = createRoot(document.getElementById("root")!);

// Render the app only once
root.render(<App />);

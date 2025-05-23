
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './i18n.ts'; // Import i18n configuration

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

// Store PWA installation event without affecting scroll
let deferredPrompt: any;
window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the default browser install prompt
  e.preventDefault();
  // Store the event for later use
  deferredPrompt = e;
  
  console.log('App can be installed! Show install button.');
});

// Handle successful installation
window.addEventListener('appinstalled', () => {
  console.log('App was installed successfully');
  deferredPrompt = null;
});

const root = createRoot(document.getElementById("root")!);

// Render the app only once
root.render(<App />);

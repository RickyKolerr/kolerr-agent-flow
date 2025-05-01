
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

// Mobile viewport fix
function applyMobileViewportFixes() {
  // Ensure body has no overflow
  document.body.style.overflow = 'hidden auto';
  document.body.style.overflowX = 'hidden';
  document.body.style.width = '100%';
  document.body.style.position = 'relative';
  document.body.style.margin = '0';
  document.body.style.padding = '0';
  
  // Apply to HTML element too
  document.documentElement.style.overflowX = 'hidden';
  document.documentElement.style.width = '100%';
  document.documentElement.style.position = 'relative';
  
  // Add a class to the root element
  const root = document.getElementById('root');
  if (root) {
    root.classList.add('mobile-container-fix');
  }
}

// Apply fixes immediately
applyMobileViewportFixes();

// Re-apply on orientation change and resize
window.addEventListener('orientationchange', applyMobileViewportFixes);
window.addEventListener('resize', applyMobileViewportFixes);

// PWA installation event handling
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

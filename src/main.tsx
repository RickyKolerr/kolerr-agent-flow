
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

// Enhanced Mobile viewport fix
function applyMobileViewportFixes() {
  // Prevent horizontal scroll/bounce
  document.documentElement.style.position = 'fixed';
  document.documentElement.style.height = '100%';
  document.documentElement.style.width = '100%';
  document.documentElement.style.overflow = 'hidden';
  document.documentElement.style.overflowX = 'hidden';
  
  // Make body scrollable with momentum scrolling
  document.body.style.position = 'absolute';
  document.body.style.top = '0';
  document.body.style.left = '0';
  document.body.style.right = '0';
  document.body.style.bottom = '0';
  document.body.style.overflow = 'auto';
  document.body.style.overflowX = 'hidden';
  // Apply webkit overflow scrolling with type casting
  (document.body.style as any).webkitOverflowScrolling = 'touch';
  document.body.style.margin = '0';
  document.body.style.height = '100%';
  document.body.style.width = '100%';
  
  // Add a class to the root element
  const root = document.getElementById('root');
  if (root) {
    root.classList.add('mobile-container-fix', 'pwa-container');
    root.style.width = '100%';
    root.style.height = '100%';
    root.style.overflow = 'hidden';
    root.style.display = 'flex';
    root.style.flexDirection = 'column';
  }

  // Apply safe area insets for notched devices
  document.documentElement.style.setProperty(
    '--safe-area-inset-top', 
    'env(safe-area-inset-top, 0px)'
  );
  document.documentElement.style.setProperty(
    '--safe-area-inset-bottom', 
    'env(safe-area-inset-bottom, 0px)'
  );
}

// Apply fixes immediately
applyMobileViewportFixes();

// Re-apply on orientation change, resize and visibility change
window.addEventListener('orientationchange', applyMobileViewportFixes);
window.addEventListener('resize', applyMobileViewportFixes);
window.addEventListener('visibilitychange', applyMobileViewportFixes);
window.addEventListener('load', applyMobileViewportFixes);

// Prevent pinch zoom on iOS
document.addEventListener('gesturestart', function (e) {
  e.preventDefault();
});

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

// Handle standalone mode
if (window.matchMedia('(display-mode: standalone)').matches) {
  document.documentElement.classList.add('pwa-standalone-adjust');
}

const root = createRoot(document.getElementById("root")!);

// Render the app only once
root.render(<App />);

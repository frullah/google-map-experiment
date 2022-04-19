import './style.css';

import { initializeMap } from './src/GoogleMap';

async function initMap() {
  await initializeMap();
}

declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;
export {};

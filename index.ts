import './src/style.css';

import { initializeMap } from './src/googleMap';

declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initializeMap;
export {};

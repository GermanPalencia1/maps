import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

mapboxgl.accessToken = 'pk.eyJ1IjoiZ3VtaTU0MzIiLCJhIjoiY2xubHBxb2U5MDIzZDJqbjFzM2NqOHhqbSJ9.TXMikkdATB6W8ujKqZy7kQ';

if (!navigator.geolocation) {
  alert ('El navegador no soporta la geolocalización');
  throw new Error('El navegador no soporta la geolocalización');
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

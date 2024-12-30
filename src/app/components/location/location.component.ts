import { Component } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [GoogleMapsModule],
  templateUrl: './location.component.html',
  styleUrl: './location.component.scss'
})
export class LocationComponent {
  center: google.maps.LatLngLiteral = {
    lat: 47.3769, // Beispielkoordinaten - bitte durch die tatsächlichen Koordinaten ersetzen
    lng: 8.5417
  };
  zoom = 15;
  markerPosition: google.maps.LatLngLiteral = this.center;
  markerOptions: google.maps.MarkerOptions = {
    draggable: false
  };
  mapOptions: google.maps.MapOptions = {
    zoomControl: true,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 17,
    minZoom: 8,
  };
}

import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {

  @Output() localChange = new EventEmitter();

  readonly default_center = new google.maps.LatLng(-16.679301, -49.256769);
  @ViewChild('map', { static: true }) mapElement: ElementRef;
  map: google.maps.Map;

  public marker: google.maps.Marker;

  constructor() {

  }

  ngOnInit(): void {
    this.initMap();
  }

  private initMap() {
    let mapOptions: google.maps.MapOptions = {
      zoom: 17,
      center: this.default_center,
      fullscreenControl: false,
      mapTypeControl: false,
    };

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log('Current position: ', position)
        const latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        mapOptions.center = latLng;
        this.generateMap(mapOptions);
      }, (error) => {
        console.log('Current position error: ', error);
        this.generateMap(mapOptions);
      })
    } else {
      console.log('Geolocation is not available');
      this.generateMap(mapOptions);
    }
  }

  private generateMap(mapOptions: google.maps.MapOptions) {
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.initMarker(mapOptions.center, this.map);
  }

  private initMarker(latLng, map) {
    this.marker = new google.maps.Marker({
      position: latLng,
      map,
      draggable: true
    });

    this.marker.addListener('dragend', (e) => {
      this.localChange.emit(e.latLng.toJSON());
    });
  }
}

import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {

  @Input() lngLatPlace;
  @Output() localChange = new EventEmitter();

  readonly default_center = new google.maps.LatLng(-16.679301, -49.256769);
  @ViewChild('map', { static: true }) mapElement: ElementRef;
  map: google.maps.Map;

  public marker: google.maps.Marker;

  constructor() {

  }

  ngOnInit(): void {
    if (this.lngLatPlace) {
      console.log('Obj que passei: ', this.lngLatPlace);
      this.loadMap()
    } else {
      this.initMap();
    }
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

  private loadMap() {
    const latLng = new google.maps.LatLng(this.lngLatPlace.latitude, this.lngLatPlace.longitude);
    let mapOptions: google.maps.MapOptions = {
      zoom: 17,
      center: latLng,
      fullscreenControl: true,
      mapTypeControl: false
    };

    this.generateMap(mapOptions, false);
  }

  private generateMap(mapOptions: google.maps.MapOptions, draggable = true) {
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.initMarker(mapOptions.center, this.map, draggable);
  }

  private initMarker(latLng, map, draggable) {
    this.marker = new google.maps.Marker({
      position: latLng,
      map,
      draggable
    });

    this.localChange.emit(latLng.toJSON());

    this.marker.addListener('dragend', (e) => {
      this.localChange.emit(e.latLng.toJSON());
    });
  }
}

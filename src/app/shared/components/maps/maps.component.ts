import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {

  @Input() lngLatPlace;
  @Input() static: boolean = false;
  @Input() height: string = '600px';
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
    let mapOptions = {
      zoom: 17,
      center: this.default_center,
      fullscreenControl: false,
      mapTypeControl: false,
      zoomControl: true,
      gestureHandling: "cooperative"
    };

    if (this.lngLatPlace) {
      mapOptions.center = new google.maps.LatLng(this.lngLatPlace.latitude, this.lngLatPlace.longitude);
      this.generateMap(mapOptions);
      return;
    }

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        mapOptions.center = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);;
        this.generateMap(mapOptions);
      }, (error) => {
        //console.log('Current position error: ', error);
        this.generateMap(mapOptions);
      });
    } else {
      //console.log('Geolocation is not available');
      this.generateMap(mapOptions);
    }
  }

  private generateMap(mapOptions) {
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.initMarker(mapOptions.center, this.map);
  }

  private initMarker(latLng, map) {
    this.marker = new google.maps.Marker({
      position: latLng,
      map,
      draggable: !this.static
    });

    this.localChange.emit(latLng.toJSON());

    this.marker.addListener('dragend', (e) => {
      this.localChange.emit(e.latLng.toJSON());
    });
  }
}

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {
  @ViewChild('map', { static: true }) mapElement: ElementRef;
  map: google.maps.Map;
  constructor() {

  }

  ngOnInit(): void {
    console.log('Carregou')
    this.initMap();
  }

  private initMap() {
    if ("geolocation" in navigator) {
      const mapOptions: google.maps.MapOptions = {
        center: { lat: -16.6686548, lng: -49.1929707 },
        zoom: 17,
        fullscreenControl: false,
        mapTypeControl: false,
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      navigator.geolocation.getCurrentPosition((position) => {
        console.log('Current position: ', position)
      }, (error) => {
        console.log('Current position error: ', error)
      })
    } else {
      console.log('Geolocation is not available');
    }
  }

}

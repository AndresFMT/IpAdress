import { Component, AfterViewInit, OnInit } from '@angular/core';
import { LeafletService } from '../leaflet.service';
import * as L from 'leaflet';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.less']
})
export class MapComponent implements AfterViewInit, OnInit {

  location: any;
  locate: any;
  mapa2: any;

  // tslint:disable-next-line:variable-name
  constructor(private _service: LeafletService) { }

  private map;

  // tslint:disable-next-line:typedef
  private initMap() {
    return this._service.getInit().subscribe(
      data => {
        this.map = L.map('mapid', {
          center: [ data.location.lat, data.location.lng ],
          zoom: 2
        });
        const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18,
          minZoom: 2,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        });
        this.map.setView([data.location.lat, data.location.lng ], 13);
        L.marker([data.location.lat, data.location.lng], {icon: iconDefault}).addTo(this.map);
        tiles.addTo(this.map);
      },
      err => console.error(err)
    );
  }

  ngAfterViewInit(): void {
    this.initMap();
  }


  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.search_Url(this.location);
  }


  // tslint:disable-next-line:typedef
  search_Url(id: string) {
    return this._service.getService(id).subscribe(
      data => {
        console.log(data);
        this.location = [data];
        this.map.setView([data.location.lat, data.location.lng ], 13);
        L.marker([data.location.lat, data.location.lng], {icon: iconDefault}).addTo(this.map);
        console.log(this.location);
        return this.location;
      },
      err => console.error(err)
    );
  }
}

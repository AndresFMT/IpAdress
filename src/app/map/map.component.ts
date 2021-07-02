import { Component, AfterViewInit, OnInit } from '@angular/core';
import { LeafletService } from '../leaflet.service';
import * as L from 'leaflet';

const iconRetinaUrl = 'assets/icon-location.svg';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconSize: [35, 40],
  iconAnchor: [35, 40],
  shadowSize: [35, 40]
});

L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.less']
})

export class MapComponent implements AfterViewInit, OnInit {

  private map;
  location: any;
  error: any;
  poPupError = false;

  // tslint:disable-next-line:variable-name
  constructor(private _service: LeafletService) { }

  ngAfterViewInit(): void {
    this.initMap();
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.search_Url(this.location);
  }

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
      }
    );
  }

  // tslint:disable-next-line:typedef
  search_Url(id: string) {
    return this._service.getService(id).subscribe(
      data => {
        this.location = [data];
        if (this.map !== undefined) {
          this.map.setView([data.location.lat, data.location.lng ], 13);
          L.marker([data.location.lat, data.location.lng], {icon: iconDefault}).addTo(this.map);
        }
        console.log(this.location);
        return this.location;
      },
      err => {
        console.log(err);
        this.error = 'Ip not found';
        this.location = [];
        this.poPupError = true;
        return this.error;
      }
    );
  }

  // tslint:disable-next-line:typedef
  closePop() {
    this.poPupError = false;
  }
}

import {environment} from '../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class LeafletService {

  key: any = environment.getGeoJson;
  geoIpi: string;
  ipNumber: string;

  constructor(private http: HttpClient) {
    this.geoIpi = 'https://geo.ipify.org/api/v1?apiKey=' + this.key + '&ipAddress=';
  }

  private setHeaders(): HttpHeaders {
    const headersConfig = {
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Content-Type': 'application/json',
        Accept: 'application/json',
    };
    return new HttpHeaders(headersConfig);
  }

  getService(ipNumber: string): Observable<any> {
    const ipLocation = ipNumber === undefined ? '' : ipNumber;
    return this.http.get(this.geoIpi + ipLocation, {responseType: 'text'}).pipe(
      map(
        (data: any) => {
            const dateGeo = data;
            return JSON.parse(dateGeo);
        }
      )
    );
  }

  getInit(): Observable<any> {
    return this.http.get(this.geoIpi, {responseType: 'text'}).pipe(
      map(
        (data: any) => {
            const dateGeo = data;
            return JSON.parse(dateGeo);
        }
      )
    );
  }
}

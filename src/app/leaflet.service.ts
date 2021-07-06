import {environment} from '../environments/environment';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';


@Injectable()
export class LeafletService {

  key: any = environment.getGeoJson;
  geoIpi: string;
  ipNumber: string;

  constructor(private http: HttpClient) {
    this.geoIpi = 'https://geo.ipify.org/api/v1?apiKey=' + this.key + '&ipAddress=';
  }


  // tslint:disable-next-line:typedef
  handleError(error: HttpErrorResponse){
    return throwError(error);
  }

  private setHeaders(): HttpHeaders {
    const headersConfig = {
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Content-Type': 'application/json',
        Accept: 'application/json',
    };
    return new HttpHeaders(headersConfig);
  }
  getInit(): Observable<any> {
    return this.http.get(this.geoIpi, {responseType: 'text'}).pipe(
      map(
        (data: any) => {
            const dateGeo = data;
            return JSON.parse(dateGeo);
        },
      ),
      catchError(this.handleError)
    );
  }

  getService(ipNumber: string): Observable<any> {
    const ipLocation = ipNumber === undefined ? '' : ipNumber;
    return this.http.get(this.geoIpi + ipLocation, {responseType: 'text'}).pipe(
      map(
        (data: any) => {
          const dateGeo = data;
          return JSON.parse(dateGeo);
        }
      ),
      catchError(this.handleError)
    );
  }

}

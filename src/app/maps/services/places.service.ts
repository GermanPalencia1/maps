import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Feature, PlacesResponse } from '../interfaces/places';

@Injectable({
  providedIn: 'root'
})

export class PlacesService {

  public userLocation?: [number, number];
  public isLoadingPlaces: boolean = false;
  public places: Feature[] = [];

  get isUserLocationReady(): boolean {
    return !!this.userLocation;
  }

  constructor(
    private http: HttpClient,
  ) {
    this.getUserLocation();
  }

  public async getUserLocation(): Promise<[number, number]> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({coords}) => {
          this.userLocation = [coords.longitude, coords.latitude];
          resolve(this.userLocation);
        },
        (err) => {
          alert('No se pudo obtener la geolocalización')
          console.log(err);
          reject();
        }
      );
    });
  }

  getPlacesByQuery (query: string = '') {

    this.isLoadingPlaces = true;

    this.http.get<PlacesResponse>(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?limit=1&access_token=pk.eyJ1IjoiZ3VtaTU0MzIiLCJhIjoiY2xubHBxb2U5MDIzZDJqbjFzM2NqOHhqbSJ9.TXMikkdATB6W8ujKqZy7kQ`)
    .subscribe(resp => {
      console.log(resp.features)
      this.isLoadingPlaces = false;
      this.places = resp.features;
    });
 }
}

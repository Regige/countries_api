import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  countries: any = [];
  baseUrl = "https://restcountries.com/v3.1/all";

  urlAllCountries = this.baseUrl + '?fields=name,flags,tld,capital,subregion,region,population,borders,currencies,languages,cca3';


  constructor(private http: HttpClient) { }



// Get Countries

loadCountries(url:string) {
    return lastValueFrom(this.http.get(url));
  }


  // checkForSelVideo() {
  //   const videoJson = sessionStorage.getItem('selected_video');

  //   if (videoJson) {
  //     const savedVideo: Video = JSON.parse(videoJson);

  //     this.selVideo = savedVideo;
  //   }
  // }


}
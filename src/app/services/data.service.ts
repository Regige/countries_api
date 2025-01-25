import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { Country } from '../interfaces/country';

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


  getCountryByName(name: string): any {
    return this.countries.find(
      (country: any) => country.name.toLowerCase() === name.toLowerCase()
    );
  }


  transformCountriesData(rawCountries: any[]): Country[] {
    return rawCountries.map(country => ({
      name: country.name?.common || 'Unknown',
      topLevelDomain: country.tld || [],
      capital: country.capital || 'No Capital',
      subregion: country.subregion || 'Unknown',
      region: country.region || 'Unknown',
      population: country.population || 0,
      borders: country.borders || [],
      // nativeName: Object.values(country.name?.nativeName || {}).map(n => n.official || 'Unknown').join(', '),
      flag: country.flags?.png || '',
      // currencies: Object.values(country.currencies || {}).map( c => c?.name || '') || ['No Currency'],

      languages: Object.values(country.languages || []) || ['No Languages']
    }));
  }

}
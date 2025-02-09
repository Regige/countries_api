import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  allCountries: Country[] = [];
  filteredCountries: Country[] = [];
  countries: Country[] = [];

  baseUrl = "https://restcountries.com/v3.1/all";

  urlAllCountries = this.baseUrl + '?fields=name,flags,tld,capital,subregion,region,population,borders,currencies,languages,cca3';


  constructor(private http: HttpClient) { }


// Get Countries

  loadCountries(url:string) {
      return lastValueFrom(this.http.get(url));
  }


  getCountryByName(name: string): any {
    return this.allCountries.find(
      (country: Country) => country.name.toLowerCase() === name.toLowerCase()
    );
  }


  transformCountriesData(rawCountries: any[]): Country[] {
    return rawCountries.map(country => ({
      name: country.name?.common || 'Unknown',
      topLevelDomain: country.tld || [],
      cca3: country.cca3,
      capital: country.capital || 'No Capital',
      subregion: country.subregion || 'Unknown',
      region: country.region || 'Unknown',
      population: country.population || 0,
      borders: country.borders || [],
      // nativeName: Object.values(country.name?.nativeName || {}).map(n => n.official || 'Unknown').join(', '),
      nativeName: country.name?.nativeName || {},
      flag: country.flags?.png || '',
      // currencies: Object.values(country.currencies || {}).map( c => c?.name || '') || ['No Currency'],
      currencies: country.currencies,
      languages: Object.values(country.languages || []) || ['No Languages']
    }));
  }


  saveCountriesToSession(countries: Country[]) {
    sessionStorage.setItem('countries', JSON.stringify(countries));
  }

  getCountriesFromSession(): Country[] {
    const countries = sessionStorage.getItem('countries');
    return countries ? JSON.parse(countries) : [];
  }

  getBorderCountries(borders: string[]): any[] {
    return this.countries.filter((country: any) => borders.includes(country.cca3));
  }


  processCurrencies(currencies: Record<string, { name: string; symbol?: string }> | undefined): string[] {
    if (!currencies || Object.keys(currencies).length === 0) {
      return ['No Currencies']; // Wenn keine Währungen vorhanden sind
    }

    return Object.values(currencies) // Hole die Währungsobjekte
      .map(c => c?.name || '') // Extrahiere den Namen der Währung
      .filter(name => name !== ''); // Entferne leere Namen
  }


  processNativeNames(nativeName: Record<string, { official: string; common?: string }> | undefined): string[] {
    if (!nativeName || Object.keys(nativeName).length === 0) {
      return ['No Native Name']; // Wenn keine Namen vorhanden sind
    }

    return Object.values(nativeName) // Hole die Native-Name-Objekte
      .map(n => n?.common || '') // Extrahiere den offiziellen Namen
      .filter(name => name !== ''); // Entferne leere Namen
  }

}
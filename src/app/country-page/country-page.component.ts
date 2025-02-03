import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { Router, RouterLink } from '@angular/router';
import { Country } from '../interfaces/country';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-country-page',
  standalone: true,
  imports: [HeaderComponent, RouterLink],
  templateUrl: './country-page.component.html',
  styleUrl: './country-page.component.scss'
})
export class CountryPageComponent {
  country: any;
  borderCountries: Country[] = [];
  processedCurrencies: string[] = [];
  processedNativeNames: string[] = [];
  routeSubscription: Subscription  | null = null;

  constructor(
    private route: ActivatedRoute,
    private data: DataService
  ) {}

  ngOnInit(): void {
    this.data.allCountries = this.data.getCountriesFromSession();
    
    // const countryName = this.route.snapshot.paramMap.get('name');

    this.routeSubscription = this.route.paramMap.subscribe(paramMap => {
      const countryName = paramMap.get('name');

      if(countryName) {
        this.country = this.data.getCountryByName(countryName);
    
        if (!this.country) {
          console.error('Country not found!');
    
        } else {
          this.borderCountries = this.data.getBorderCountries(this.country.borders);
          this.processedCurrencies = this.data.processCurrencies(this.country.currencies);
          this.processedNativeNames = this.data.processNativeNames(this.country.nativeName);

          console.log("Alle native names: ", this.processedNativeNames);
          
          console.log("So sieht das Land aus:" , this.country);
        }
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }


}

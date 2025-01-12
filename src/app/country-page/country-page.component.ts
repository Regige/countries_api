import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-country-page',
  standalone: true,
  imports: [HeaderComponent, RouterLink],
  templateUrl: './country-page.component.html',
  styleUrl: './country-page.component.scss'
})
export class CountryPageComponent {
  country: any;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    // Name aus URL auslesen
    const countryName = this.route.snapshot.paramMap.get('name');
    console.log(countryName);
    // Land aus einer Liste oder API laden
    if(countryName) {
      this.country = this.dataService.getCountryByName(countryName);
  
      if (!this.country) {
        console.error('Country not found!');
        // Eventuell zu einer Fehlerseite umleiten
      } else {
        console.log("So sieht das Land aus:" , this.country);
      }
    }
  }
}

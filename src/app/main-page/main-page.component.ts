import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../shared/header/header.component';
import { DataService } from '../services/data.service';
import { Router, RouterLink } from '@angular/router';
import { CountryCardComponent } from './country-card/country-card.component';
import { Country } from '../interfaces/country';


@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [HeaderComponent, CountryCardComponent, RouterLink, CommonModule, FormsModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {
  
  errorData = false;
  searchQuery: string = '';


  constructor(public data: DataService, private router: Router) {}

  async ngOnInit() {
    try {
      // this.data.countries = await this.data.loadCountries(this.data.urlAllCountries);
      // console.log("All countries: ", this.data.countries);


      const rawData: any = await this.data.loadCountries(this.data.urlAllCountries);
      console.log("Untransformed countries: ", rawData);
      // for (let index = 0; index < rawData.length; index++) {
      //   const element = rawData[index];
      //   console.log("Currencies", element.currencies);
      // }

      // for (let index = 0; index < rawData.length; index++) {
      //   const element = rawData[index];
      //   console.log("Native names", element.name.nativeName);
      // }

      // for (let index = 0; index < rawData.length; index++) {
      //   const element = rawData[index];
      //   console.log("cca3", element.cca3);
      // }
      

      this.data.allCountries = this.data.transformCountriesData(rawData);
      console.log("Transformed countries: ", this.data.allCountries);
      this.data.countries = JSON.parse(JSON.stringify(this.data.allCountries));

      this.data.saveCountriesToSession(this.data.allCountries);


      // this.data.videos = this.mapVideos(rawVideos);
      // this.sortVideos();

      // // console.log(this.data.videos);

      // this.data.checkForSelVideo();
      // if(this.data.selVideo.id === -1) {
      //   this.data.selVideo = this.data.videos.find((video: Video) => video.is_new === true) || this.data.videos[0];
      // }
      // this.loadData = true;

    } catch(e) {
      console.log(e);
      this.errorData = true;
    }
  }


  showSglFlag(country: any) {

  }


  onSearch() {
    const query = this.searchQuery.toLowerCase().trim();
    if(query !== '') {
      this.data.countries = this.data.allCountries.filter(country =>
        country.name.toLowerCase().includes(query)
      );
    } else {
        this.data.countries = JSON.parse(JSON.stringify(this.data.allCountries));
    }

    console.log('Search', this.data.countries);
    
  }

}

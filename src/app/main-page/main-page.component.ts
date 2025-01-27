import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { DataService } from '../services/data.service';
import { Router, RouterLink } from '@angular/router';
import { CountryCardComponent } from './country-card/country-card.component';


@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [HeaderComponent, CountryCardComponent, RouterLink],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {
  
  errorData = false;


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
      //   console.log("cca3", element.cca3);
      // }
      

      this.data.countries = this.data.transformCountriesData(rawData);
      console.log("Transformed countries: ", this.data.countries);

      this.data.saveCountriesToSession(this.data.countries);


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

}

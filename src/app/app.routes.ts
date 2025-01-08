import { Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { CountryPageComponent } from './country-page/country-page.component';

export const routes: Routes = [
    { path: '', component: MainPageComponent},
    { path: 'flag/:name', component: CountryPageComponent},
];

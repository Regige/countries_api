import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { BackBtnComponent } from '../shared/back-btn/back-btn.component';
import { DataService } from '../services/data.service';
import { Country } from '../interfaces/country';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quiz-page',
  standalone: true,
  imports: [HeaderComponent, BackBtnComponent, FormsModule, CommonModule],
  templateUrl: './quiz-page.component.html',
  styleUrl: './quiz-page.component.scss'
})
export class QuizPageComponent {

  ranCountry: any = {};
  userInput: string = '';
  filteredCountries: Country[] = [];

  constructor(private data: DataService) {}

  ngOnInit(): void {
    this.data.allCountries = this.data.getCountriesFromSession();

    this.ranCountry = this.getRandomCountry();
    console.log(this.ranCountry);
    
  }


  getRandomCountry() {
    if (this.data.allCountries.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * this.data.allCountries.length);
    const ranCountry = this.data.allCountries[randomIndex];

    return ranCountry;
  }


  onInputChange(): void {
      if (!this.userInput) {
        this.filteredCountries = [];
        return;
      }

      const lowerCaseInput = this.userInput.toLowerCase();
      this.filteredCountries = this.data.allCountries.filter(country =>
        country.name.toLowerCase().startsWith(lowerCaseInput)
      );
  }


  selectCountry(country: Country): void {
    this.userInput = country.name; 
    this.filteredCountries = [];
  }


  // checkAnswer(selectedCountry: string): boolean {
  //   const correctCountry = 'Germany'; // Beispiel für das korrekte Land
  //   if (selectedCountry.toLowerCase() === correctCountry.toLowerCase()) {
  //     return true; // Richtiges Land
  //   }
  //   return false; // Falsches Land
  // }


}

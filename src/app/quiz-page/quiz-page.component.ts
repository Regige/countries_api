import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { BackBtnComponent } from '../shared/back-btn/back-btn.component';
import { DataService } from '../services/data.service';
import { Country } from '../interfaces/country';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Fuse from 'fuse.js';

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
  fuse: Fuse<Country> | null = null;

  showFeedback = false;
  isCorrect = false;
  feedbackMessage = "";

  constructor(private data: DataService) {
  }


  ngOnInit(): void {
    this.data.allCountries = this.data.getCountriesFromSession();

    this.ranCountry = this.getRandomCountry();
    console.log(this.ranCountry);

    this.fuse = new Fuse(this.data.allCountries, {
      keys: ['name', 'official'], // Wonach gesucht wird
      threshold: 0.4, // Ähnlichkeits-Schwelle (0 = exakt, 1 = sehr tolerant)
      includeScore: true, // Zeigt die Übereinstimmungs-Punkte an
    });
  }


  getRandomCountry() {
    if (this.data.allCountries.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * this.data.allCountries.length);
    const ranCountry = this.data.allCountries[randomIndex];

    return ranCountry;
  }


  onInputChange(): void {
    if (!this.userInput || !this.fuse) {
      this.filteredCountries = [];
      return;
    }

      // const lowerCaseInput = this.userInput.toLowerCase();
      // this.filteredCountries = this.data.allCountries.filter(country =>
      //   country.name.toLowerCase().startsWith(lowerCaseInput)
      // );

    const results = this.fuse.search(this.userInput); // Fuse.js Suche

    // Nur Länder mit hoher Übereinstimmung anzeigen
    this.filteredCountries = results
      .filter(result => result.score! <= 0.3) // Score-Filter für präzisere Treffer
      .map(result => result.item); // Länder-Objekte extrahieren
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



    checkAnswer() {
    if (this.userInput.toLowerCase() === this.ranCountry.name.toLowerCase()) {
      this.isCorrect = true;
      this.feedbackMessage = "Correct! ✅";
    } else {
      this.isCorrect = false;
      this.feedbackMessage = `Wrong! ❌ The correct answer is: ${this.ranCountry.name}`;
    }
    this.showFeedback = true;
  }

  skipFlag() {
    this.feedbackMessage = `Skipped! The correct answer was: ${this.ranCountry.name}`;
    this.isCorrect = false;
    this.showFeedback = true;
  }

  nextFlag() {
    this.ranCountry = this.getRandomCountry();
    this.userInput = "";
    this.showFeedback = false;
    this.filteredCountries = [];
  }

  showMoreInfo() {
    console.log("More info: ", this.ranCountry);
    
  }

}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { DarkModeService } from '../../services/dark-mode.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {



  constructor(public darkMood: DarkModeService) { }
  
  toggleDarkMode() {
    this.darkMood.isDarkMode = !this.darkMood.isDarkMode;
    document.body.classList.toggle('dark-mode', this.darkMood.isDarkMode);
  }

}

import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DarkModeService } from '../../services/dark-mode.service';

@Component({
  selector: 'app-back-btn',
  standalone: true,
  imports: [RouterLink ],
  templateUrl: './back-btn.component.html',
  styleUrl: './back-btn.component.scss'
})
export class BackBtnComponent {

  constructor(public darkMood: DarkModeService) {

  }

}

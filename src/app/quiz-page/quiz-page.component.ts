import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { BackBtnComponent } from '../shared/back-btn/back-btn.component';

@Component({
  selector: 'app-quiz-page',
  standalone: true,
  imports: [HeaderComponent, BackBtnComponent],
  templateUrl: './quiz-page.component.html',
  styleUrl: './quiz-page.component.scss'
})
export class QuizPageComponent {

}

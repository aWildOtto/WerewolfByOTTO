import { Component } from '@angular/core';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  constructor(
    public ls: LanguageService
  ){

  }
  changeLanguage(event) {
    this.ls.language = event.value;
    this.ls.loadLanguage();
  }

}

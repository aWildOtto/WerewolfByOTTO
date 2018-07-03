import { Component, OnInit, Input } from '@angular/core';
import { LanguageService } from '../../services/language.service';


@Component({
  selector: 'app-main-area',
  templateUrl: './main-area.component.html',
  styleUrls: ['./main-area.component.scss']
})
export class MainAreaComponent implements OnInit {
  // language: string;

  showPage: string;
  // Possible values:
  // - gameSetup
  // - welcome
  // - roleReveal
  switchPage(event) {
    console.log(event);
    this.showPage = event;
  }
  roleReveal(event) {
    console.log(event);
    this.showPage = "gameSetup";

  }
  changeLanguage(event) {
    this.ls.language = event.value;
    this.ls.loadLanguage();
  }
  constructor(public ls: LanguageService) { }

  ngOnInit() {
  }

}

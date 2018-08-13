import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../../services/language.service';
import { GameService } from '../../../services/game.service';

@Component({
  selector: 'app-main-area-ol',
  templateUrl: './main-area-ol.component.html',
  styleUrls: ['./main-area-ol.component.scss']
})
export class MainAreaOlComponent implements OnInit {
  showPage: string;

  // Possible Pages:
  // mainAreaOl
  // gameLobby
  // notFound
  switchPage(event) {
    this.showPage = event;
  }
  constructor(public ls: LanguageService) {
  }

  ngOnInit() { }
}

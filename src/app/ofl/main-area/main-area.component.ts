import { Component, OnInit, Input } from '@angular/core';
import { LanguageService } from '../../../services/language.service';
import { GameService } from '../../../services/game.service';


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
  // - passToNext
  // - roleReveal
  // - playerList
  switchPage(event) {
    console.log(event);
    this.showPage = event;
    this.gs.updatePage(event);
  }

  constructor(
    public ls: LanguageService,
    public gs: GameService
  ) {
    this.showPage = this.gs.getGameData().currentPage;
    this.gs.getPageObservable().subscribe(page => {
      this.showPage = page;
    });
  }

  ngOnInit() {
  }

}

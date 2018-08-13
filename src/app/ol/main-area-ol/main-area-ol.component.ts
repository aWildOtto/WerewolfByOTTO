import { Component, OnInit, HostListener } from '@angular/core';
import { LanguageService } from '../../../services/language.service';
import { GameService } from '../../../services/game.service';
import { OnlineService } from '../../../services/online.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main-area-ol',
  templateUrl: './main-area-ol.component.html',
  styleUrls: ['./main-area-ol.component.scss']
})
export class MainAreaOlComponent implements OnInit {
  public showPage: string;
  public gameCode: string;

  // Possible Pages:
  // mainAreaOl
  // gameLobby
  // notFound
  switchPage(event) {
    this.showPage = event;
  }
  constructor(
    public ls: LanguageService,
    private os: OnlineService,
    private activeRoute: ActivatedRoute,
  ) {
    this.gameCode = this.activeRoute.snapshot.params['id'];
  }

  ngOnInit() { }

  OnDestroy() {
    this.os.playerExit(this.gameCode);
  }

  @HostListener('window:beforeunload')
  exitGame() {
    this.os.playerExit(this.gameCode);
  }
}

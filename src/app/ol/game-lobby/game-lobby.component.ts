import { Component, OnInit, Output, EventEmitter, Inject, Input } from '@angular/core';
import { OnlineService } from '../../../services/online.service';
import { ActivatedRoute } from '@angular/router';
import { GameData } from '../../../model/gameData';
import { AngularFireObject } from 'angularfire2/database';
import { LanguageService } from '../../../services/language.service';


@Component({
  selector: 'app-game-lobby',
  templateUrl: './game-lobby.component.html',
  styleUrls: ['./game-lobby.component.scss']
})
export class GameLobbyComponent implements OnInit {
  @Input() gameCode: string;
  @Input() gameData: AngularFireObject<GameData>;
  @Input() players: string[];
  @Output() switchPage = new EventEmitter<string>();

  constructor(
    public ls: LanguageService,
    private os: OnlineService,
    private activeRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
  }

  convertObjToArr(evilResponseProps: {}): string[] {
    const goodResponse = [];
    for (const prop in evilResponseProps) {
      if (prop) {
        goodResponse.push(evilResponseProps[prop]);
      }
    }
    return goodResponse;
  }

  clickConfig() {
    this.switchPage.emit('gameConfig');
  }
}

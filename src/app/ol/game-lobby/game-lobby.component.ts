import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { OnlineService } from '../../../services/online.service';
import { GameData } from '../../../model/gameData';
import { AngularFireObject } from 'angularfire2/database';
import { LanguageService } from '../../../services/language.service';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';


@Component({
  selector: 'app-game-lobby',
  templateUrl: './game-lobby.component.html',
  styleUrls: ['./game-lobby.component.scss']
})
export class GameLobbyComponent implements OnInit {
  @Input() gameCode: string;
  @Input() gameData: AngularFireObject<GameData>;
  @Input() players: string[];
  @Input() roles: string[];
  @Output() switchPage = new EventEmitter<string>();

  constructor(
    public ls: LanguageService,
    private os: OnlineService,
  ) {

  }

  ngOnInit() {
  }

  clickConfig() {
    this.switchPage.emit('gameConfig');
  }
}

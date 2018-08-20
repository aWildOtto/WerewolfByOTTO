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
  @Output() switchPage = new EventEmitter<string>();


  public playerNumMatched = false;
  private roleNum = 0;

  constructor(
    public ls: LanguageService,
    private os: OnlineService,
    private activeRoute: ActivatedRoute,
  ) {

  }

  ngOnInit() {
    this.roleNum = this.os.getRoleNumber(this.gameCode);
    if (this.players) {
      this.playerNumMatched = (this.players.length === this.roleNum);
    }

  }

  clickConfig() {
    this.switchPage.emit('gameConfig');
  }
}

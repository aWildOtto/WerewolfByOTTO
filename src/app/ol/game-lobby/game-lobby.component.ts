import { Component, OnInit, Output, EventEmitter, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { OnlineService } from '../../../services/online.service';
import { GameData } from '../../../model/gameData';
import { AngularFireObject } from 'angularfire2/database';
import { LanguageService } from '../../../services/language.service';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-game-lobby',
  templateUrl: './game-lobby.component.html',
  styleUrls: ['./game-lobby.component.scss']
})
export class GameLobbyComponent implements OnInit, OnChanges, OnDestroy {
  @Input() gameCode: string;
  @Input() gameData: AngularFireObject<GameData>;
  @Input() players: string[];
  @Input() roles: string[];
  @Input() creator;
  @Output() switchPage = new EventEmitter<string>();
  public currentUserId = '';
  public disableActions = false;

  constructor(
    public ls: LanguageService,
    private os: OnlineService,
  ) {
  }

  ngOnChanges(change: SimpleChanges) {
    if (change.creator) {
      this.os.getAuthObj().subscribe(auth => {
        if (auth) {
          this.currentUserId = auth.uid;
          if (this.currentUserId === this.creator.id) {
            this.disableActions = true;
          } else {
            this.disableActions = false;
          }
        }
      });
    }

  }

  ngOnDestroy() {
  }

  ngOnInit() {

  }

  clickConfig() {
    this.switchPage.emit('gameConfig');
  }

  startGame() {
    this.os.createRoleData(this.gameCode);
    this.os.changeGameStatus(this.gameCode, 'started');
  }
}

import { Component, OnInit, Output, EventEmitter, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { OnlineService } from '../../../services/online.service';
import { GameData } from '../../../model/gameData';
import { AngularFireObject } from 'angularfire2/database';
import { LanguageService } from '../../../services/language.service';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../../model/User';


@Component({
  selector: 'app-game-lobby',
  templateUrl: './game-lobby.component.html',
  styleUrls: ['./game-lobby.component.scss']
})
export class GameLobbyComponent implements OnInit, OnChanges, OnDestroy {
  @Input() gameCode: string;
  @Input() gameData: AngularFireObject<GameData>;
  @Input() players: User[];
  @Input() roles: string[];
  @Input() creator: User;
  @Output() switchPage = new EventEmitter<string>();
  public currentUserId = '';
  public disableActions = false;
  public disableStart = true;


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
    if ((change.roles && change.roles.currentValue.length) || (change.players && change.players.currentValue.length)) {
      if (!this.roles.includes('moderator')) {
        if (this.roles.length === this.players.length - 1) {
          this.disableStart = false;
        }
      } else {
        if (this.roles.length === this.players.length) {
          this.disableStart = false;
        } else {
          this.disableStart = true;
        }
      }
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
    this.os.createRoleData(this.gameCode, this.roles, this.players, this.creator).then(res => {
      this.os.changeGameStatus(this.gameCode, 'started');
    });
  }
}

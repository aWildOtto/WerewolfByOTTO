import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { OnlineService } from '../../../services/online.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GameData } from '../../../model/gameData';
import { AngularFireObject } from 'angularfire2/database';

@Component({
  selector: 'app-game-lobby',
  templateUrl: './game-lobby.component.html',
  styleUrls: ['./game-lobby.component.scss']
})
export class GameLobbyComponent implements OnInit {
  public gameCode: string;
  public gameData: AngularFireObject<GameData>;
  public players: string[];
  @Output() switchPage = new EventEmitter<string>();

  constructor(
    private os: OnlineService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) { }

  @Output() goToConfig = new EventEmitter<string>();

  ngOnInit() {
    this.gameCode = this.activeRoute.snapshot.params['id'];
    this.gameData = this.os.getGameData(this.gameCode.toLowerCase());
    this.gameData.valueChanges().subscribe(data => {
      if (data) {
        this.players = this.convertObjToArr(data.players);
      } else {
        this.switchPage.emit('notFound');
      }
    });
    this.os.checkGameExistance(this.gameCode).then(exists => {
      if (exists) {
        this.os.joinGame(this.gameCode).then(result => {
          console.log(result);
        });
      }
    });
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
    this.goToConfig.emit('game-config-ol');
  }
}

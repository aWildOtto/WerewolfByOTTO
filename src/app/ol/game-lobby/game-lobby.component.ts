import { Component, OnInit } from '@angular/core';
import { OnlineService } from '../../../services/online.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GameData } from '../../../model/gameData';

@Component({
  selector: 'app-game-lobby',
  templateUrl: './game-lobby.component.html',
  styleUrls: ['./game-lobby.component.scss']
})
export class GameLobbyComponent implements OnInit {

  public gameCode: string;
  public gameData: GameData;
  constructor(
    private os: OnlineService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.gameCode = this.activeRoute.snapshot.params['id'];
    this.os.getGameData(this.gameCode).then(data => {
      if (data) {
        this.gameData = data;
      } else {
        this.router.navigate(['404']);
      }
    });
  }

}

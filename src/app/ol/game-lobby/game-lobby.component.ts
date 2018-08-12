import { Component, OnInit } from '@angular/core';
import { OnlineService } from '../../../services/online.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game-lobby',
  templateUrl: './game-lobby.component.html',
  styleUrls: ['./game-lobby.component.scss']
})
export class GameLobbyComponent implements OnInit {

  public gameCode: string;
  constructor(
    private os: OnlineService,
    private activeRoute: ActivatedRoute
  ) {

  }

  ngOnInit() {
    this.gameCode = this.activeRoute.snapshot.params['id'];
  }

}

import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { OnlineService } from "../../../services/online.service";
import { ActivatedRoute, Router } from "@angular/router";
import { GameData } from "../../../model/gameData";
import { AngularFireObject } from "angularfire2/database";

@Component({
  selector: "app-game-lobby",
  templateUrl: "./game-lobby.component.html",
  styleUrls: ["./game-lobby.component.scss"]
})
export class GameLobbyComponent implements OnInit {
  public gameCode: string;
  public gameData: AngularFireObject<GameData>;
  public players: string[];
  constructor(
    private os: OnlineService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}

  @Output() goToConfig = new EventEmitter<string>();

  ngOnInit() {
    this.gameCode = this.activeRoute.snapshot.params["id"];
    this.gameData = this.os.getGameData(this.gameCode);
    this.gameData.valueChanges().subscribe(data => {
      if (data) {
        this.players = data.players;
      }
    });
  }

  clickConfig() {
    this.goToConfig.emit("game-config-ol");
  }
}

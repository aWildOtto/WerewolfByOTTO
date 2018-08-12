import { Component, OnInit, Inject, Output, EventEmitter } from "@angular/core";
import { OnlineService } from "../../../services/online.service";
import { LanguageService } from "../../../services/language.service";
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from "@angular/material";
import { Router } from "../../../../node_modules/@angular/router";
import { GameData } from "../../../model/gameData";
import { AngularFireObject } from "angularfire2/database";

@Component({
  selector: "app-welcome-ol",
  templateUrl: "./welcome-ol.component.html",
  styleUrls: ["./welcome-ol.component.scss"]
})
export class WelcomeOlComponent implements OnInit {
  ngOnInit() {}
  constructor(
    private os: OnlineService,
    public ls: LanguageService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  openDialog(event) {
    let isJoin = true;
    let dialogTitle: string = this.ls.s["joinGame"];
    let roomCode = "";
    if (event.target.id === "createGame" || event.path[1].id === "createGame") {
      isJoin = false;
      dialogTitle = this.ls.s["createGame"];
      roomCode = "I'm not empty"; // this value wouldn't be used when creating a game.
      // so we make this not empty and it doesn't disable the button
    }
    const dialogRef = this.dialog.open(EnterGameDialog, {
      width: "70%",
      data: {
        isJoin,
        dialogTitle,
        username: "",
        roomCode,
        usernameInvalid: true,
        roomCodeInvalid: true
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.isJoin) {
          this.router.navigate([result.roomCode]);
        } else {
          this.os.createGame(result.username).then(createResult => {
            this.router.navigate([createResult]);
          });
        }
      }
    });
  }
}

@Component({
  selector: "dialog-enter-game",
  templateUrl: "dialog-enter-game.html",
  styleUrls: ["./dialog-style.scss"]
})
export class EnterGameDialog {
  public gameCode: string;
  public gameData: AngularFireObject<GameData>;
  public players: string[];

  constructor(
    public ls: LanguageService,
    public dialogRef: MatDialogRef<EnterGameDialog>,
    private os: OnlineService,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }
  onConfirmClick(): void {
    this.dialogRef.close(this.data);
  }

  onChange(): void {
    if (this.data.isJoin && this.data.roomCode !== "") {
      this.gameData = this.os.getGameData(this.data.roomCode);
      this.gameData.valueChanges().subscribe(data => {
        if (data) {
          this.data.roomCodeInvalid = false;
          this.players = data.players;
          this.data.usernameInvalid = !this.players.includes(
            this.data.username
          );
        } else {
          this.data.roomCodeInvalid = true;
        }
      });
    }
  }

  getErrorMessageUsername(): any {
    if (!this.data.isJoin && this.data.username.trim().length === 0)
      return this.ls.s["createUserNameError"];
    if (this.data.isJoin && !this.data.roomCodeInvalid)
      return this.ls.s["noUserNameError"];
  }

  getErrorMessageRoomCode(): any {
    if (this.data.isJoin && this.gameCode !== this.data.username)
      return this.ls.s["noRoomCodeError"];
  }
}

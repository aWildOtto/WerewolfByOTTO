import { Component, OnInit, Inject, Output, EventEmitter } from "@angular/core";
import { OnlineService } from "../../../services/online.service";
import { LanguageService } from "../../../services/language.service";
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from "@angular/material";
import { FormControl, Validators } from "@angular/forms";
import { Router } from "../../../../node_modules/@angular/router";

@Component({
  selector: "app-welcome-ol",
  templateUrl: "./welcome-ol.component.html",
  styleUrls: ["./welcome-ol.component.scss"]
})
export class WelcomeOlComponent implements OnInit {
  roomCodeInputControl = new FormControl("", [
    Validators.required,
    Validators.minLength(6),
    Validators.maxLength(6)
  ]);

  userNameInputControl = new FormControl("", [
    Validators.required,
    Validators.minLength(1)
  ]);

  constructor(
    private os: OnlineService,
    public ls: LanguageService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  public roomCode: string = "";
  public userName: string = "";

  openJoinDialog() {
    const joinDialogRef = this.dialog.open(JoinGameDialog, {
      width: "300px"
    });

    // joinDialogRef.afterClosed().subscribe(result => {
    //   console.log("The dialog was closed");
    //   // this.animal = result;
    // });
  }

  openCreateDialog() {
    const createDialogRef = this.dialog.open(CreateGameDialog, {
      width: "300px",
      data: ""
    });

    createDialogRef.afterClosed().subscribe(result => {
      //this.os.createGame(result).subscribe(result =>{
      this.router.navigate(["qwjlkfejlkdsafjlk"]);
      //});

      console.log(result);
    });
  }
  create() {}

  join() {}

  ngOnInit() {
    this.roomCodeInputControl.setValue("");
  }
}

@Component({
  selector: "dialog-join-game",
  templateUrl: "dialog-join-game.html"
})
export class JoinGameDialog {
  constructor(
    public ls: LanguageService,
    public dialogRef: MatDialogRef<JoinGameDialog> // @Inject(MAT_DIALOG_DATA) public data:
  ) {}

  @Output() gameLobby = new EventEmitter<string>();

  onCancelClick(): void {
    this.dialogRef.close();
  }

  enterGameLobby() {
    this.gameLobby.emit("gameLobby");
  }
}

@Component({
  selector: "dialog-create-game",
  templateUrl: "dialog-create-game.html"
})
export class CreateGameDialog {
  constructor(
    public ls: LanguageService,
    public dialogRef: MatDialogRef<CreateGameDialog>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }
  onConfirmClick(): void {
    this.dialogRef.close(this.data);
  }
}

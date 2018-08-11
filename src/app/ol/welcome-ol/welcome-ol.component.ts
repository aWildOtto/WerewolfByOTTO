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

  openDialog(event) {
    let isJoin:boolean = true;
    let dialogTitle: string = this.ls.s['joinGame'];
    let roomCode: string = "";
    if(event.target.id === "createGame" || event.path[1].id === "createGame"){
      isJoin = false;
      dialogTitle = this.ls.s['createGame'];
    }
    const createDialogRef = this.dialog.open(EnterGameDialog, {
      width: "70%",
      data: {
        isJoin,
        dialogTitle,
        username: '',
        roomCode
      }
    });

    createDialogRef.afterClosed().subscribe(result => {
      if(result){
        console.log(result);
        if(result.isJoin){
          this.router.navigate([result.roomCode]);
        } else {
          //this.os.createGame(result).subscribe(result =>{
            this.router.navigate(['createdGame']);
          //});
        }
      }
    });
  }
  create() {}

  join() {}

  ngOnInit() {
    this.roomCodeInputControl.setValue("");
  }
}


@Component({
  selector: "dialog-enter-game",
  templateUrl: "dialog-enter-game.html",
  styleUrls: ["./dialog-style.scss"]
})
export class EnterGameDialog {
  constructor(
    public ls: LanguageService,
    public dialogRef: MatDialogRef<EnterGameDialog>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }
  onConfirmClick(): void {
    this.dialogRef.close(this.data);
  }
}

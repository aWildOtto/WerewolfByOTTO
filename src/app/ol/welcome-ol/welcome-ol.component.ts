import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { OnlineService } from '../../../services/online.service';
import { LanguageService } from '../../../services/language.service';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-welcome-ol',
  templateUrl: './welcome-ol.component.html',
  styleUrls: ['./welcome-ol.component.scss']
})
export class WelcomeOlComponent implements OnInit {

  ngOnInit() {
  }
  constructor(
    private os: OnlineService,
    public ls: LanguageService,
    public dialog: MatDialog,
    private router: Router
  ) { }
  openCreateDialog(event) {
    this.openDialog(false);
  }
  openJoinDialog(event) {
    this.openDialog(true);
  }
  openDialog(isJoin: boolean) {
    let dialogTitle: string = this.ls.s['joinGame'];
    let roomCode = '';
    if (!isJoin) {
      isJoin = false;
      dialogTitle = this.ls.s['createGame'];
      roomCode = 'I\'m not empty'; // this value wouldn't be used when creating a game.
      // so we make this not empty and it doesn't disable the button
    }
    const dialogRef = this.dialog.open(EnterGameDialog, {
      width: '70%',
      data: {
        isJoin,
        dialogTitle,
        username: '',
        roomCode
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
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
  selector: 'dialog-enter-game',
  templateUrl: 'dialog-enter-game.html',
  styleUrls: ['./dialog-style.scss']
})
export class EnterGameDialog {
  constructor(
    public ls: LanguageService,
    public dialogRef: MatDialogRef<EnterGameDialog>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  onCancelClick(): void {
    this.dialogRef.close();
  }
  onConfirmClick(): void {
    this.dialogRef.close(this.data);
  }
}

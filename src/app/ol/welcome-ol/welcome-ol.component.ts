import { Component, OnInit, Inject, Output, EventEmitter, OnDestroy } from '@angular/core';
import { OnlineService } from '../../../services/online.service';
import { LanguageService } from '../../../services/language.service';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { GameData } from '../../../model/gameData';
import { AngularFireObject } from 'angularfire2/database';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-welcome-ol',
  templateUrl: './welcome-ol.component.html',
  styleUrls: ['./welcome-ol.component.scss']
})
export class WelcomeOlComponent implements OnInit, OnDestroy {
  private dialogSubscription: Subscription;
  ngOnInit() { }
  constructor(
    private os: OnlineService,
    public ls: LanguageService,
    public dialog: MatDialog,
    private router: Router
  ) { }

  openJoinDialog(event) {
    this.openDialog(true);
  }
  openCreateDialog(event) {
    this.openDialog(false);
  }

  openDialog(isJoin: boolean) {
    let dialogTitle: string = this.ls.s['joinGame'];
    let roomCode = '';
    if (!isJoin) {
      dialogTitle = this.ls.s['createGame'];
      roomCode = 'I\'m not empty'; // this value wouldn't be used when creating a game.
      // so we make this not empty and it doesn't disable the button
    }
    const dialogRef = this.dialog.open(EnterGameDialog, {
      width: '60%',
      data: {
        isJoin,
        dialogTitle,
        username: '',
        roomCode
      }
    });

    this.dialogSubscription = dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.isJoin) {
          this.os.createUserProfile(result.username);
          this.router.navigate([result.roomCode]);
        } else {
          this.os.createGame(result.username).then(createResult => {
            this.router.navigate([createResult]);
          });
        }
      }
    });
  }
  ngOnDestroy() {
    if (this.dialogSubscription) {
      this.dialogSubscription.unsubscribe();
    }
  }
}

@Component({
  selector: 'dialog-enter-game',
  templateUrl: 'dialog-enter-game.html',
  styleUrls: ['./dialog-style.scss']
})
export class EnterGameDialog {
  private gameData: AngularFireObject<GameData>;
  public gameCodeInvalid: boolean;
  private gameDataObservable: Subscription;

  constructor(
    public ls: LanguageService,
    public dialogRef: MatDialogRef<EnterGameDialog>,
    private os: OnlineService,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.dialogRef.beforeClose().subscribe(event => {
      if (this.gameDataObservable) {
        this.gameDataObservable.unsubscribe();
      }
    });
  }


  onConfirmClick(): void {
    this.dialogRef.close(this.data);
  }

  onChange(): void {
    if (this.data.roomCode !== '') {
      this.gameData = this.os.getGameData(this.data.roomCode);
      this.gameDataObservable = this.gameData.valueChanges().subscribe(data => {
        if (data) {
          this.gameCodeInvalid = false;
        } else {
          this.gameCodeInvalid = true;
        }
      });
    }
  }
}

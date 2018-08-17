import { Component, OnInit, HostListener, Inject, OnDestroy } from '@angular/core';
import { LanguageService } from '../../../services/language.service';
import { OnlineService } from '../../../services/online.service';
import { ActivatedRoute } from '@angular/router';
import { AngularFireObject } from 'angularfire2/database';
import { GameData } from '../../../model/gameData';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-main-area-ol',
  templateUrl: './main-area-ol.component.html',
  styleUrls: ['./main-area-ol.component.scss']
})
export class MainAreaOlComponent implements OnInit, OnDestroy {
  public showPage: string;
  public gameCode: string;
  public gameData: AngularFireObject<GameData>;
  public players: string[];
  private gameDataSubscription: Subscription;
  private dialogSubscription: Subscription;

  // Possible Pages:
  // mainAreaOl
  // gameLobby
  // notFound
  switchPage(event) {
    this.showPage = event;
  }
  constructor(
    public ls: LanguageService,
    private os: OnlineService,
    private activeRoute: ActivatedRoute,
    public dialog: MatDialog,
  ) {
    this.gameCode = this.activeRoute.snapshot.params['id'].toUpperCase();
    this.gameData = this.os.getGameData(this.gameCode);
    this.os.checkGameExistance(this.gameCode).then(exists => {// check if the game exist once
      if (exists) {
        this.gameDataSubscription = this.gameData.valueChanges().subscribe(data => {// subscribe to game change if it exists
          if (data) {
            this.players = this.convertObjToArr(data.playersObj);
          } else {
            this.showPage = 'notFound';
          }
        });

        if (!this.os.checkUserProfile()) {
          // if the user doesn't have a local profile ask for a name to create one
          this.dialogSubscription = this.openNameInputDialog().subscribe(username => {
            this.os.createUserProfile(username).then(auth => {
              this.os.joinGame(this.gameCode).then(result => {
                console.log(result);
              });
            });
          });
        } else {
          this.os.joinGame(this.gameCode).then(result => {
            console.log(result);
          });
        }
      } else {
        this.showPage = 'notFound';
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

  ngOnInit() { }

  ngOnDestroy() {
    this.os.playerExit(this.gameCode);
    if (this.gameDataSubscription) {
      this.gameDataSubscription.unsubscribe();
    }
    if (this.dialogSubscription) {
      this.dialogSubscription.unsubscribe();
    }
  }

  openNameInputDialog(): Observable<string> {
    const dialogRef = this.dialog.open(NameInputDialog, {
      width: '70%',
      data: '',
      disableClose: true
    });
    return dialogRef.afterClosed();
  }

  @HostListener('window:beforeunload')
  exitGame() {
    this.os.playerExit(this.gameCode);
  }
}


@Component({
  selector: 'dialog-input-name',
  templateUrl: 'dialog-input-name.html',
  styleUrls: ['./dialog-style.scss']
})
export class NameInputDialog {
  constructor(
    public ls: LanguageService,
    public dialogRef: MatDialogRef<NameInputDialog>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  onConfirmClick(): void {
    this.dialogRef.close(this.data);
  }
}

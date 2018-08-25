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
  public creator: Object = {};
  public playersData: AngularFireObject<Object>;
  public rolesData: AngularFireObject<string[]>;
  public players: string[] = [];
  public roles: string[] = [];
  private gameDataSubscription: Subscription;
  private playersSubscription: Subscription;
  private rolesSubscription: Subscription;
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

    const setupDataSubscriptions = () => {
      this.gameData = this.os.getData('gameData', this.gameCode);
      this.playersData = this.os.getData('players', this.gameCode);
      this.rolesData = this.os.getData('roles', this.gameCode);
      this.gameDataSubscription = this.gameData.valueChanges().subscribe(data => {// subscribe to game change if it exists
        if (data) {
          this.creator = {
            name: Object.values(data.creator)[0],
            id: Object.keys(data.creator)[0]
          };
        } else {
          this.showPage = 'notFound';
        }
      });
      this.playersSubscription = this.playersData.valueChanges().subscribe(playersObj => {
        if (playersObj) {
          this.players = this.convertObjToArr(playersObj);
        }
      });
      this.rolesSubscription = this.rolesData.valueChanges().subscribe(rolesArr => {
        if (rolesArr) {
          this.roles = rolesArr;
        }
      });
    };
    this.os.checkGameExistance(this.gameCode).then(exists => {// check if the game exist once
      if (exists) {
        if (!this.os.checkUserProfile()) {
          // if the user doesn't have a local profile ask for a name to create one
          this.dialogSubscription = this.openNameInputDialog().subscribe(username => {
            this.os.createUserProfile(username).then(auth => {
              this.os.joinGame(this.gameCode).then(result => {
                setupDataSubscriptions();
              });
            });
          });
        } else {
          this.os.joinGame(this.gameCode)
            .then(result => {
              setupDataSubscriptions();
            })
            .catch(error => {
              console.log(error);
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
        goodResponse.push({
          name: evilResponseProps[prop],
          id: prop
        });
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
    if (this.playersSubscription) {
      this.playersSubscription.unsubscribe();
    }
    if (this.rolesSubscription) {
      this.rolesSubscription.unsubscribe();
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

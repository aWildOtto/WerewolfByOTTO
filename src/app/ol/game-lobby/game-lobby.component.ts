import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { OnlineService } from '../../../services/online.service';
import { ActivatedRoute } from '@angular/router';
import { GameData } from '../../../model/gameData';
import { AngularFireObject } from 'angularfire2/database';
import { LanguageService } from '../../../services/language.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-game-lobby',
  templateUrl: './game-lobby.component.html',
  styleUrls: ['./game-lobby.component.scss']
})
export class GameLobbyComponent implements OnInit {
  public gameCode: string;
  public gameData: AngularFireObject<GameData>;
  public players: string[];
  @Output() switchPage = new EventEmitter<string>();

  constructor(
    public ls: LanguageService,
    private os: OnlineService,
    private activeRoute: ActivatedRoute,
    public dialog: MatDialog,
  ) {
  }

  ngOnInit() {
    this.gameCode = this.activeRoute.snapshot.params['id'];
    this.gameData = this.os.getGameData(this.gameCode.toLowerCase());
    this.gameData.valueChanges().subscribe(data => {
      if (data) {
        this.players = this.convertObjToArr(data.players);
      } else {
        this.switchPage.emit('notFound');
      }
    });
    this.os.checkGameExistance(this.gameCode).then(exists => {
      if (exists) {
        if (!this.os.checkUserProfile()) {
          this.openNameInputDialog().subscribe(username => {
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
      }
    });
  }

  openNameInputDialog(): Observable<string> {
    const dialogRef = this.dialog.open(NameInputDialog, {
      width: '60%',
      data: '',
      disableClose: true
    });
    return dialogRef.afterClosed();
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

  clickConfig() {
    this.switchPage.emit('gameConfig');
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

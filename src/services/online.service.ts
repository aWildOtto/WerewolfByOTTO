import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { GameData } from '../model/gameData';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class OnlineService {
  private authState = null;

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth
  ) {
    this.afAuth.authState.subscribe(authObj => {
      this.authState = authObj;
    });
  }

  checkUserProfile(): boolean {
    return !!this.authState;
  }

  getGameData(gameCode: string): AngularFireObject<GameData> {
    return this.db.object('gameData/' + gameCode.toLowerCase());
  }

  checkGameExistance(gameCode: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.db.database.ref('gameData/' + gameCode.toLowerCase()).once('value', data => {
        if (data.val()) {
          resolve(true);
        } else {
          resolve(false);
        }
      }).catch(error => {
        reject(error);
      });
    });
  }

  playerExit(gameCode: string) {
    this.db.database.ref('gameData/' + gameCode.toLowerCase() + '/playersObj/' + this.getUserID()).remove();
  }

  joinGame(gameCode: string): any {
    const updates = {};
    updates['gameData/' + gameCode.toLowerCase() + '/playersObj/' + this.getUserID()] = this.getUsername();
    return this.db.database.ref().update(updates);
  }

  createUserProfile(username: string): Promise<string> {
    localStorage.setItem('username', username);
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInAnonymously().then(data => {
        console.log(data.user.uid);
        localStorage.setItem('uid', data.user.uid);
        resolve(data.user.uid);
      }).catch(err => {
        reject(err);
      });
    });
  }

  genGameCode(): string {
    let gameCode = '';
    const possible = 'abcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 6; i++) {
      gameCode += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return gameCode;
  }

  newGameData(uid, username): GameData {
    return {
      creator: {
        [uid]: username
      },
      roles: [],
      playersObj: {
        [uid]: username
      },
      currentPage: 'gameLobby',
      currentNight: 0
    };
  }

  createGame(username): Promise<string> {
    const createProfilePromise = this.createUserProfile(username);
    return new Promise((resolve, reject) => {
      createProfilePromise.then(uid => {
        const newGameCode = this.genGameCode();
        this.db.object('gameData/' + newGameCode)
          .set(this.newGameData(uid, username))// create new gameData entry with creator data
          .then((result) => {
            console.log('create game success: ' + !result);
            if (!result) {
              resolve(newGameCode);
            }
          }).catch(error => {
            reject(error);
          });
      });
    });
  }

  getUsername(): string {
    return localStorage.getItem('username');
  }

  getUserID(): string {
    return this.authState.uid;
  }

  createRoleArray(gameCode: string, roles: string[]): any {
    const updates = {};
    updates['gameData/' + gameCode.toLowerCase() + '/roles/'] = roles;
    return this.db.database.ref().update(updates);

  }

  getNumberOfPlayers(gameCode: string): number {
    let num = 0;
    this.db.database.ref('gameData/' + gameCode.toLowerCase() + '/playersObj/').on('value', function (snapshot) {
      num = snapshot.numChildren();
    });
    return num;
  }

  getRoleNumber(gameCode: string): number {
    let count = 0;
    this.db.database.ref('gameData/' + gameCode.toLowerCase() + '/roles/').once('value', function (snapshot) {
      count = snapshot.numChildren();
    });
    return count;
  }

}

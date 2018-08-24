import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { GameData } from '../model/gameData';
import { AngularFireAuth } from 'angularfire2/auth';

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

  getData(dataStr: string, gameCode: string): AngularFireObject<any> {
    const dbPath = dataStr ? dataStr + '/' : '';
    return this.db.object(dbPath + gameCode.toLowerCase());
  }

  async checkGameExistance(gameCode: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
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
    this.db.database.ref('players/' + gameCode.toLowerCase() + '/' + this.getUserID()).remove();
  }

  joinGame(gameCode: string): any {
    const updates = {};
    updates['players/' + gameCode.toLowerCase() + '/' + this.getUserID()] = this.getUsername();
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

  createGame(username): Promise<string> {
    const createProfilePromise = this.createUserProfile(username);
    return new Promise((resolve, reject) => {
      createProfilePromise.then(uid => {
        const newGameCode = this.genGameCode();
        Promise.all([
          // public general info
          this.db.object('gameData/' + newGameCode)
            .set({
              currentNight: 0,
              creator: {
                [uid]: username
              }
            }),
          // playes array s
          this.db.object('players/' + newGameCode)
            .set({
              [uid]: username
            })
        ])
          // create new gameData entry with creator data
          .then((result) => {
            console.log('create game success: ' + !result[0] && !result[1]);
            if (!result[0] && !result[1]) {
              resolve(newGameCode);
            }
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

  createRoleArray(gameCode: string, roles: string[]): Promise<any> {
    return this.db.object('roles/' + gameCode.toLowerCase())
      .set(roles);
  }

}

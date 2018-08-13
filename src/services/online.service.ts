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
  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth
  ) {
  }

  checkUserProfile(): boolean {
    return !!localStorage.getItem('uid');
  }
  checkGameExistance(gameCode: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.db.database.ref('gameData/' + gameCode).once('value', data => {
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
    this.db.database.ref('gameData/' + gameCode + '/players/' + this.getUserID()).remove();
  }

  joinGame(gameCode: string): any {
    const updates = {};
    updates['gameData/' + gameCode + '/players/' + this.getUserID()] = localStorage.getItem('username');
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

  genGameCode(gameNum: number): string {
    let gameCode = '';
    const possible = 'abcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 5; i++) {
      gameCode += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    gameCode += gameNum ? gameNum : 0;
    return gameCode;
  }

  newGameData(uid, username): GameData {
    return {
      creator: {
        [uid]: username
      },
      roles: [],
      playersObj: {},
      currentPage: 'gameLobby',
      currentNight: 0
    };
  }

  createGame(username): Promise<any> {
    const createProfilePromise = this.createUserProfile(username);
    return new Promise((resolve, reject) => {
      createProfilePromise.then(uid => {
        this.db.database
          .ref('gameNum')
          .once('value', data => {// find gameNum for appending to the end of the gameCode
            console.log(data.val());
            const newGameCode = this.genGameCode(data.val());
            this.db
              .object('gameData/' + newGameCode)
              .set(this.newGameData(uid, username))// create new gameData entry with creator data
              .then(result => {
                this.db
                  .object('gameNum')
                  .set(data.val() + 1) // increment gameNum
                  .then(res => {
                    resolve(newGameCode);
                  });
              });
          });
      })
        .catch(error => {
          reject(error);
        });
    });
  }

  getGameData(gameCode: string): AngularFireObject<GameData> {
    return this.db.object('gameData/' + gameCode);
  }

  getUserID(): string {
    return localStorage.getItem('uid');
  }
}

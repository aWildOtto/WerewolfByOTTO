import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { GameData } from '../model/gameData';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseAuth } from '../../node_modules/angularfire2';
import { RoleData } from '../model/roleData';
import { Werewolf } from '../model/werewolf';
import { User } from '../model/User';
import { Villager } from '../model/villager';

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

  restart(gameCode: string) {
    this.db.object(`gameStatus${gameCode.toLowerCase()}`).set('preparing').then(result => {
      if (!result) {
        this.db.object(`roleData${gameCode.toLowerCase()}`).remove();
      }
    });
  }

  getAuthObj(): Observable<firebase.User> {
    return this.afAuth.authState;
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
      this.afAuth.auth.signInAnonymously().then(auth => {
        localStorage.setItem('uid', auth.user.uid);
        resolve(auth.user.uid);
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
          this.db.object('gameStatus/' + newGameCode)
            .set('preparing')
        ])
          // create new gameData entry with creator data
          .then((result) => {
            const resultBool = !result[0] && !result[1] && !result[2];
            console.log('create game success: ' + resultBool);
            if (resultBool) {
              resolve(newGameCode);
            }
          });
      });
    });
  }

  getUsername(): string {
    return localStorage.getItem('username') || '';
  }

  getUserID(): string {
    return localStorage['uid'] || this.authState.uid;
  }

  createRoleArray(gameCode: string, roles: string[]): Promise<any> {
    return this.db.object('roles/' + gameCode.toLowerCase()).set(roles);
  }

  changeGameStatus(gameCode: string, status: string): Promise<any> {
    return this.db.object('gameStatus/' + gameCode.toLowerCase()).set(status);
  }

  // https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
  shuffle(a): string[] {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  createRoleData(gameCode: string, roleArr: string[], playerArr: User[], creator: User) {
    return new Promise((resolve, reject) => {
      let i = 0;
      gameCode = gameCode.toLowerCase();
      const newPlayerArr = playerArr.slice();
      if (!roleArr.includes('moderator')) {// if roleArr doesn't have moderator->not random mod
        const mod = newPlayerArr.find((player, ind) => {
          return player.id === creator.id;
        });
        const index = newPlayerArr.indexOf(mod);
        if (index > -1) {
          newPlayerArr.splice(index, 1);
        }
        this.db.object(`roleData/${gameCode}/${mod.id}`).set({// set game creator to mod
          name: mod.name,
          id: mod.id,
          role: 'moderator'
        });
      }
      roleArr = this.shuffle(roleArr);
      roleArr.forEach(role => {
        let roleData = {};
        roleData = {
          name: newPlayerArr[i].name,
          id: newPlayerArr[i].id,
          role,
        };
        this.db.object(`roleData/${gameCode}/${newPlayerArr[i].id}`).set(roleData);
        i++;
      });
      resolve(true);
    });
  }

  getCurrentRole(gameCode: string) {
    return this.db.database.ref(`roleData/${gameCode}/${this.getUserID()}`).once('value');
  }
}

import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { GameData } from '../model/gameData';

@Injectable({
  providedIn: 'root'
})
export class OnlineService {
  constructor(private db: AngularFireDatabase) {
    console.log('hi otto');
  }

  createUserProfile(username: string) {
    localStorage.setItem('username', username);
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

  newGameData(creator): GameData {
    return {
      creator,
      roles: [],
      players: [],
      currentPage: 'gameLobby',
      currentNight: 0
    };
  }

  createGame(username): Promise<any> {
    localStorage.setItem('username', username);
    return new Promise((resolve, reject) => {
      this.db.database
        .ref('gameNum')
        .once('value', data => {
          console.log(data.val());
          const newGameCode = this.genGameCode(data.val());
          this.db
            .object('gameData/' + newGameCode)
            .set(this.newGameData(username))
            .then(result => {
              this.db
                .object('gameNum')
                .set(data.val() + 1) // increment gameNum
                .then(res => {
                  resolve(newGameCode);
                });
            });
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  getGameData(gameCode: string): AngularFireObject<GameData> {
    // const path = `gameData/${gameCode}`;
    return this.db.object('gameData/' + gameCode);
  }

  // getGameRoom(roomcode): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     let gameDataRef = this.db.database.ref("gameData");
  //     gameDataRef.on(
  //       "value",
  //       function(snapshot) {
  //         snapshot.forEach(function(childrenSnapshot) {
  //           var childData = childrenSnapshot;
  //           console.log(childData.key);
  //           if (childData.key === roomcode) {
  //             return resolve(roomcode);
  //           }
  //         });
  //         console.log("no match");
  //       },
  //       function(error) {
  //         console.log(error);
  //       }
  //     );
  //   });
  // }
}

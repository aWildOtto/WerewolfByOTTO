import { Injectable } from '@angular/core';
import { GameData } from '../model/gameData';

@Injectable({
  providedIn: 'root'
})

export class GameService {
  gameData: GameData;
  
  constructor() { }

  createGameData(players: string[], roles: string[], currentPage: string){
    this.gameData = {
      players,
      roles,
      currentPage
    }
  }
}

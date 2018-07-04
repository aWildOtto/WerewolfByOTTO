import { Injectable } from '@angular/core';
import { GameData } from '../model/gameData';
import { LanguageService } from './language.service';

@Injectable({
  providedIn: 'root'
})

export class GameService {
  gameData: GameData;
  
  constructor(private ls: LanguageService) { }

  createGameData(players: string[], roles: string[], currentIndex, currentPage: string){
    this.gameData = {
      players,
      roles,
      currentIndex,
      currentPage,
      currentNight: 0,
      language: this.ls.language
    }
  }
}

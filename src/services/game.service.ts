import { Injectable } from '@angular/core';
import { GameData } from '../model/gameData';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class GameService {
  private gameData: GameData;

  constructor(
  ) { 
    this.initGameData();
    if(localStorage.getItem('gameData')){
      this.gameData = JSON.parse(localStorage.getItem('gameData'));
    }
    console.log(this.gameData);
  }

  getGameData(){
    return this.gameData;
  }

  private initGameData(){
    this.gameData = {
      players:[],
      roles:[],
      currentIndex:0,
      currentPage:"welcome",
      currentNight: 0
    }
    this.updateGameData();
  }

  private updateGameData(){
    localStorage.setItem('gameData', JSON.stringify(this.gameData));
  }

  createGameData(players: string[], roles: string[], currentIndex, currentPage: string){
    this.gameData = {
      players,
      roles,
      currentIndex,
      currentPage,
      currentNight: 0
    }
    this.updateGameData();
  }

  reset(){
    this.gameData = {
      players:[],
      roles:[],
      currentIndex: 0,
      currentPage: "welcome",
      currentNight:0
    }
    this.updateGameData();
  }
  addPlayer(name: string){
    this.gameData.players.push(name);
    this.updateGameData();
  }
  updatePage(page){
    this.gameData.currentPage = page;
    this.updateGameData();
  }
}

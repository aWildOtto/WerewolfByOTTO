import { Injectable } from '@angular/core';
import { GameData } from '../model/gameData';
import { Observable } from 'rxjs';
import { RoleService } from './role.service';

@Injectable({
  providedIn: 'root'
})

export class GameService {
  private gameData: GameData;
  private defaultGameData: GameData = {
    players: [],
    roles: [],
    currentIndex: 0,
    currentPage: "welcome",
    currentNight: 0
  };

  constructor(
    private rs: RoleService
  ) {
    if(localStorage.getItem('gameData')){
      this.gameData = JSON.parse(localStorage.getItem('gameData'));
    } else{
      this.initGameData();
    }
    console.log(this.gameData);
  }

  getGameData(){
    return this.gameData;
  }

  private initGameData(){
    this.gameData = this.defaultGameData;
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
    this.gameData = this.defaultGameData;
    this.updateGameData();
  }

  restart(){
    this.gameData.currentIndex = 0;
    this.gameData.currentNight = 0;
    this.gameData.currentPage = "gameSetup";
    this.gameData.roles = [];
  }

  addPlayer(name: string, role: string){
    this.gameData.players.push(name);
    this.gameData.currentIndex ++;
    this.updateGameData();
    this.rs.addRoleData(name, role);
  }

  updatePage(page){
    this.gameData.currentPage = page;
    this.updateGameData();
  }
}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-game-setup',
  templateUrl: './game-setup.component.html',
  styleUrls: ['./game-setup.component.scss']
})
export class GameSetupComponent implements OnInit {
  @Output() roleReveal = new EventEmitter<string>();

  public numPlayer: number = 0;
  private numWerewolf: number = 0;
  private numVillager: number = 0;
  private seer: boolean = true;
  private witch: boolean = true;
  
  sumPlayer(){
    this.numPlayer = this.numWerewolf + this.numVillager;
    this.seer ? this.numPlayer+=1: null; 
    this.witch ? this.numPlayer+=1: null; 
  }
  constructor(
    public ls: LanguageService,
    private gs: GameService
  ) { }

  ngOnInit() {
    this.sumPlayer();
  }

  finishConfig(){
    let roleArr = [];
    for(let i = 0; i<this.numWerewolf;i++){
      roleArr.push("werewolf");
    }
    for(let i = 0; i<this.numVillager;i++){
      roleArr.push("villager");
    }
    this.seer ? roleArr.push("seer"): null;
    this.witch ? roleArr.push("witch"): null;
    this.gs.createGameData(
      [],
      roleArr,
      "roleReveal"
    );
    console.log(event);
    this.roleReveal.emit('roleReveal');
  }

}

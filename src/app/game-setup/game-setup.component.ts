import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-game-setup',
  templateUrl: './game-setup.component.html',
  styleUrls: ['./game-setup.component.scss']
})
export class GameSetupComponent implements OnInit {
  @Output() passToNext = new EventEmitter<string>();

  public numPlayer: number = 0;
  private numWerewolf: number = 0;
  private numVillager: number = 0;
  private seer: boolean = true;
  private guardian: boolean = true;
  
  sumPlayer(){
    this.numPlayer = this.numWerewolf + this.numVillager;
    this.seer ? this.numPlayer+=1: null; 
    this.guardian ? this.numPlayer+=1: null; 
  }
  constructor(
    public ls: LanguageService,
    private gs: GameService
  ) { }

  ngOnInit() {
    this.sumPlayer();
  }
  //https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
  shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
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
    this.guardian ? roleArr.push("guardian"): null;
    roleArr = this.shuffle(roleArr);
    this.gs.createGameData(
      [],
      roleArr,
      0,
      "passToNext"
    );
    this.passToNext.emit('passToNext');
  }

}

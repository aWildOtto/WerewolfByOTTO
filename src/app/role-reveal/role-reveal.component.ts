import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-role-reveal',
  templateUrl: './role-reveal.component.html',
  styleUrls: ['./role-reveal.component.scss']
})
export class RoleRevealComponent implements OnInit {
  @Output() toNext = new EventEmitter<string> ();
  showAction: string = "nameInput";
  roleToDisplay: string;
  name: string;
  constructor(
    public ls: LanguageService, 
    private gs: GameService
  ) {
    if(this.gs.getGameData().currentIndex > this.gs.getGameData().roles.length){
      this.toNext.emit("playerList");
    }
    if (this.gs.getGameData().players[this.gs.getGameData().currentIndex]) {
      this.showAction = "greeting";
    } 
    this.name = this.gs.getGameData().players[this.gs.getGameData().currentIndex]; 
    this.roleToDisplay = this.gs.getGameData().roles[this.gs.getGameData().currentIndex]; 
  }

  showRole(){
    this.gs.addPlayer(this.name, this.roleToDisplay);
    this.showAction = "confirmRole";
  }

  ngOnInit() {
  }

  next() {
      this.toNext.emit("passToNext");
  }
}

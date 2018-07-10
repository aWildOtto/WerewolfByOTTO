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
  displayRole: boolean = false;
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
      this.displayRole = true;
    } 
    this.name = this.gs.getGameData().players[this.gs.getGameData().currentIndex]; 
    this.roleToDisplay = this.gs.getGameData().roles[this.gs.getGameData().currentIndex]; 
  }

  showRole(){
    this.displayRole = true;
    this.gs.addPlayer(this.name, this.roleToDisplay);
  }

  ngOnInit() {
  }

  next() {
    if (this.gs.getGameData().currentIndex >= this.gs.getGameData().roles.length) {
      this.toNext.emit("playerList");
    } else {
      this.toNext.emit("passToNext");
    }
  }
}

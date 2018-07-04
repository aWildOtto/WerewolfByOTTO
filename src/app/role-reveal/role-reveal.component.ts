import { Component, OnInit, Output } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-role-reveal',
  templateUrl: './role-reveal.component.html',
  styleUrls: ['./role-reveal.component.scss']
})
export class RoleRevealComponent implements OnInit {
  displayRole: boolean = false;
  roleToDisplay: string;
  name: string;
  constructor(
    public ls: LanguageService, 
    private gs: GameService
  ) {
    if (this.gs.gameData.players[this.gs.gameData.currentIndex]) {
      this.displayRole = true;
    } 
    this.roleToDisplay = this.gs.gameData.roles[this.gs.gameData.currentIndex]; 
  }

  showRole(){
    this.displayRole = true;
  }

  ngOnInit() {
  }

}

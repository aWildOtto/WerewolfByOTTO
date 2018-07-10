import { Component, OnInit, isDevMode } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  devMode:boolean = false;

  refresh() {
    window.location.reload();
  }
  constructor(
    public ls: LanguageService,
    private gs: GameService
  ) { 
    if(isDevMode()){
      this.devMode = true;
    }
  }

  showEverything(){
    console.log(this.gs.getGameData());
    console.log(this.gs.getRoleData());
  }

  ngOnInit() {
  }

}

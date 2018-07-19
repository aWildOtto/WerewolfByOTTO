import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GameService } from '../../../services/game.service';
import { LanguageService } from '../../../services/language.service';

@Component({
  selector: 'app-pass-to-next',
  templateUrl: './pass-to-next.component.html',
  styleUrls: ['./pass-to-next.component.scss']
})
export class PassToNextComponent implements OnInit {
  @Output() roleReveal = new EventEmitter<string>();

  passTo: string;
  toRoleReveal(event) {
    if (this.gs.getGameData().currentIndex < this.gs.getGameData().roles.length) {
      this.roleReveal.emit("roleReveal");
    } else {
      this.roleReveal.emit("playerList");
    }
  }
  constructor(
    private gs: GameService,
    public ls: LanguageService
  ) {
    if (
      this.gs.getGameData().players[this.gs.getGameData().currentIndex]
      && this.gs.getGameData().currentIndex < this.gs.getGameData().roles.length
    ) {
      this.passTo = ls.s["passToNext"] + " " + this.gs.getGameData().players[this.gs.getGameData().currentIndex];
    } else if (this.gs.getGameData().currentIndex < this.gs.getGameData().roles.length) {
      this.passTo = ls.s["passToNext"] + " " + ls.s['nextPlayer'];
    } else {
      this.passTo = ls.s['passBackToMod'];
    }

  }

  ngOnInit() {
    setTimeout(() => { this.toRoleReveal(event) }, 5000);
  }

}

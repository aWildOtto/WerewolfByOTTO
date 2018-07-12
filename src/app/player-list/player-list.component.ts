import { Component, OnInit, ViewChild } from '@angular/core';
import { GameService } from '../../services/game.service';
import { LanguageService } from '../../services/language.service';
import { MatSelectionList, MatSelectionListChange } from '@angular/material';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss']
})
export class PlayerListComponent implements OnInit {
  public playerData = [];
  @ViewChild(MatSelectionList) players: MatSelectionList;

  constructor(
    private gs: GameService,
    public ls: LanguageService
  ) {
    const roleObj = gs.getRoleData();
    for (let i in roleObj) {
      if(i == "werewolves"){
        roleObj[i].forEach(werewolf => {
          this.playerData.push({
            role: "werewolf",
            playerName: werewolf.name
          });    
        });
      }
      else if(i == "villagers"){
        roleObj[i].forEach(villager => {
          this.playerData.push({
            role: "villager",
            playerName: villager.name
          });    
        });
      }
      else{
        this.playerData.push({
          role: i,
          playerName: roleObj[i].name
        });
      }
    }
  }

  ngOnInit() {
    this.players.selectionChange.subscribe((s: MatSelectionListChange) => {

      this.players.deselectAll();
      s.option.selected = true;
    });
  }

}

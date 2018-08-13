import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { LanguageService } from '../../../services/language.service';
import { GameService } from '../../../services/game.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-game-setup',
  templateUrl: './game-setup.component.html',
  styleUrls: ['./game-setup.component.scss']
})

export class GameSetupComponent implements OnInit {
  werewolfInputControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[0-9]*$'),
    Validators.min(1)
  ]);

  villagerInputControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[0-9]*$'),
    Validators.min(1)
  ]);


  @Output() passToNext = new EventEmitter<string>();

  public numPlayer = 0;
  public seer = true;
  public guardian = true;

  addWerewolf() {
    this.werewolfInputControl.setValue(this.werewolfInputControl.value + 1);
  }

  minusWerewolf() {
    this.werewolfInputControl.setValue(this.werewolfInputControl.value - 1);
  }

  addVillager() {
    this.villagerInputControl.setValue(this.villagerInputControl.value + 1);
  }

  minusVillager() {
    this.villagerInputControl.setValue(this.villagerInputControl.value - 1);
  }

  sumPlayer() {
    this.numPlayer = Number(this.villagerInputControl.value) + Number(this.werewolfInputControl.value);
    this.seer ? this.numPlayer += 1 : null;
    this.guardian ? this.numPlayer += 1 : null;
  }
  constructor(
    public ls: LanguageService,
    private gs: GameService
  ) { }

  ngOnInit() {
    this.werewolfInputControl.setValue(1);
    this.villagerInputControl.setValue(1);
    this.sumPlayer();
  }
  // https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
  shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  finishConfig() {
    let roleArr = [];
    for (let i = 0; i < this.werewolfInputControl.value; i++) {
      roleArr.push('werewolf');
    }
    for (let i = 0; i < this.villagerInputControl.value; i++) {
      roleArr.push('villager');
    }
    this.seer ? roleArr.push('seer') : null;
    this.guardian ? roleArr.push('guardian') : null;
    roleArr = this.shuffle(roleArr);
    this.gs.updateGameData(
      null, roleArr, null, null, null
    );
    this.passToNext.emit('passToNext');
  }

}

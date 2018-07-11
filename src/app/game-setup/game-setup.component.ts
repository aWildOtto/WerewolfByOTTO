import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { GameService } from '../../services/game.service';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-game-setup',
  templateUrl: './game-setup.component.html',
  styleUrls: ['./game-setup.component.scss']
})
export class GameSetupComponent implements OnInit {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  @Output() passToNext = new EventEmitter<string>();

  public numPlayer: number = 0;
  private numWerewolf: number = 1;
  private numVillager: number = 1;
  private seer: boolean = true;
  private guardian: boolean = true;

  checkWerewolfInput() {
    if (this.numWerewolf === null || this.numWerewolf <= 0) {
      this.numWerewolf = 1;
    }
  }

  checkVillagerInput() {
    if (this.numVillager === null || this.numVillager <= 0) {
      this.numVillager = 1;
    }
  }

  addWerewolf() {
    this.numWerewolf++;
  }

  minusWerewolf() {
    if (this.numWerewolf > 1) {
      this.numWerewolf--;
    } else {
      this.numWerewolf = 1;
    }
  }

  addVillager() {
    this.numVillager++;
  }

  minusVillager() {
    if (this.numVillager > 1) {
      this.numVillager--;
    } else {
      this.numVillager = 1;
    }
  }

  sumPlayer() {
    this.checkVillagerInput();
    this.checkWerewolfInput();
    this.numPlayer = this.numWerewolf + this.numVillager;
    this.seer ? this.numPlayer += 1 : null;
    this.guardian ? this.numPlayer += 1 : null;
    console.log(this.numPlayer);
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

  finishConfig() {
    let roleArr = [];
    for (let i = 0; i < this.numWerewolf; i++) {
      roleArr.push("werewolf");
    }
    for (let i = 0; i < this.numVillager; i++) {
      roleArr.push("villager");
    }
    this.seer ? roleArr.push("seer") : null;
    this.guardian ? roleArr.push("guardian") : null;
    roleArr = this.shuffle(roleArr);
    this.gs.updateGameData(
      null, roleArr, null, null, null
    );
    this.passToNext.emit('passToNext');
  }

}

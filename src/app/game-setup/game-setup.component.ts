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
  numberInputControl = new FormControl('', [
    Validators.required,
    Validators.pattern("^[0-9]*$"),
    Validators.min(1)
  ]);

  villagerInputControl = new FormControl('', [
    Validators.required,
    Validators.pattern("^[0-9]*$"),
    Validators.min(1)
  ]);


  @Output() passToNext = new EventEmitter<string>();

  public numPlayer: number = 0;
  private numWerewolf: number = 0;
  private numVillager: number = 0;
  private seer: boolean = true;
  private guardian: boolean = true;
  private finishBtnDisable: boolean = true;

  verifyFinishBtn() {
    // console.log(this.villagerInputControl.status);

    // if (this.villagerInputControl.status === "INVALID" || this.numberInputControl.status === "INVALID" ||
    if (this.numVillager < 1 || this.numWerewolf < 1) {
      this.finishBtnDisable = true;
    } else {
      this.finishBtnDisable = false;
    }
    console.log("btn status " + this.finishBtnDisable);
  }

  addWerewolf() {
    this.numWerewolf++;
    this.verifyFinishBtn();
  }

  minusWerewolf() {
    this.numWerewolf--;
    this.verifyFinishBtn();
  }

  addVillager() {
    this.numVillager++;
    this.verifyFinishBtn();
  }

  minusVillager() {
    this.numVillager--;
    this.verifyFinishBtn();
  }

  sumPlayer() {
    this.numPlayer = this.numWerewolf + this.numVillager;
    this.seer ? this.numPlayer += 1 : null;
    this.guardian ? this.numPlayer += 1 : null;
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

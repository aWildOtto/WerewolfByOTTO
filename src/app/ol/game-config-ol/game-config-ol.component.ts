import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { LanguageService } from '../../../services/language.service';
import { GameService } from '../../../services/game.service';
import { FormControl, Validators } from '@angular/forms';
import { OnlineService } from '../../../services/online.service';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-game-config-ol',
  templateUrl: './game-config-ol.component.html',
  styleUrls: ['./game-config-ol.component.scss']
})
export class GameConfigOlComponent implements OnInit {
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

  @Output() switchPage = new EventEmitter<string>();

  public numPlayer = 0;
  public seer = true;
  public guardian = true;
  public moderator = true;
  public witch = false;
  public hunter = false;
  public numPlayerInRoom = 0;
  private gameCode: string;

  constructor(
    public ls: LanguageService,
    private os: OnlineService,
    private activeRoute: ActivatedRoute
  ) {
    this.gameCode = this.activeRoute.snapshot.params['id'].toUpperCase();
    this.numPlayerInRoom = this.os.getNumberOfPlayers(this.gameCode);
  }

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
    this.moderator ? this.numPlayer += 1 : null;
    this.hunter ? this.numPlayer += 1 : null;
    this.witch ? this.numPlayer += 1 : null;
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
    this.moderator ? roleArr.push('moderator') : null;
    this.witch ? roleArr.push('witch') : null;
    this.hunter ? roleArr.push('hunter') : null;
    roleArr = this.shuffle(roleArr);
    console.log(roleArr.length);
    this.os.createRoleArray(this.gameCode, roleArr);
    this.switchPage.emit('gameLobby');
  }

  backToLobby(event) {
    this.switchPage.emit('gameLobby');
  }

}

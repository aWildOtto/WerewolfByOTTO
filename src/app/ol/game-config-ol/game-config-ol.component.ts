import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { LanguageService } from '../../../services/language.service';
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
  @Input() players: string[];
  @Input() roles: string[];
  @Input() gameCode: string;
  @Input() creator: Object;
  @Output() switchPage = new EventEmitter<string>();

  public numPlayer = 0;
  public seer = false;
  public guardian = false;
  public moderator = false;
  public witch = false;
  public hunter = false;

  constructor(
    public ls: LanguageService,
    private os: OnlineService,
  ) {
  }

  ngOnInit() {
    this.parseRoleArray();
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
    this.numPlayer += 1; // this.moderator 
    this.hunter ? this.numPlayer += 1 : null;
    this.witch ? this.numPlayer += 1 : null;
  }

  finishConfig() {
    this.roles = [];
    for (let i = 0; i < this.werewolfInputControl.value; i++) {
      this.roles.push('werewolf');
    }
    for (let i = 0; i < this.villagerInputControl.value; i++) {
      this.roles.push('villager');
    }
    this.seer ? this.roles.push('seer') : null;
    this.guardian ? this.roles.push('guardian') : null;
    this.moderator ? this.roles.push('moderator') : null;
    this.witch ? this.roles.push('witch') : null;
    this.hunter ? this.roles.push('hunter') : null;
    this.os.createRoleArray(this.gameCode, this.roles).then(result => {
      if (!result) {
        this.switchPage.emit('gameLobby');
      }
    });
  }

  parseRoleArray() {
    let villagerNum = 0;
    let werewolfNum = 0;
    if (this.roles.length === 0) {
      this.werewolfInputControl.setValue(1);
      this.villagerInputControl.setValue(1);
      this.seer = true;
      this.guardian = true;
      this.moderator = true;
      this.sumPlayer();
    } else {
      this.roles.forEach(element => {
        if (element === 'villager') {
          villagerNum++;
        } else if (element === 'werewolf') {
          werewolfNum++;
        } else if (element === 'seer') {
          this.seer = true;
        } else if (element === 'guardian') {
          this.guardian = true;
        } else if (element === 'moderator') {
          this.moderator = true;
        } else if (element === 'witch') {
          this.witch = true;
        } else if (element === 'hunter') {
          this.hunter = true;
        }
      });
      this.werewolfInputControl.setValue(werewolfNum);
      this.villagerInputControl.setValue(villagerNum);
      this.sumPlayer();
    }
  }

  backToLobby(event) {
    this.switchPage.emit('gameLobby');
  }

}

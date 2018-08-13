import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-game-config-ol',
  templateUrl: './game-config-ol.component.html',
  styleUrls: ['./game-config-ol.component.scss']
})
export class GameConfigOlComponent implements OnInit {
  @Output() switchPage = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }
  backToLobby(event) {
    this.switchPage.emit('gameLobby');
  }
}

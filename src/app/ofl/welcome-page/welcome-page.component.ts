import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import { LanguageService } from '../../../services/language.service';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {
  @Output() startGame = new EventEmitter<string>();
  start(){
    this.startGame.emit('gameSetup');
  }
  showHelp(){

  }
  constructor(public languageService: LanguageService) { }

  ngOnInit() {
  }

}

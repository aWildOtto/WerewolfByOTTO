import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';

import { AppComponent } from './app.component';
import { MainAreaComponent } from './main-area/main-area.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { GameSetupComponent } from './game-setup/game-setup.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { PlayerListComponent } from './player-list/player-list.component';


@NgModule({
  declarations: [
    AppComponent,
    MainAreaComponent,
    NavBarComponent,
    GameSetupComponent,
    WelcomePageComponent,
    PlayerListComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule, 
    MatCheckboxModule,
    MatToolbarModule,
    MatCardModule
  ],
  exports: [
    MatButtonModule, 
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

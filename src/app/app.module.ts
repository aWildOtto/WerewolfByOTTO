//Dependencies
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from "@angular/forms";
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';

//Our own stuff
import { AppComponent } from './app.component';
import { MainAreaComponent } from './main-area/main-area.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { GameSetupComponent } from './game-setup/game-setup.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { PlayerListComponent } from './player-list/player-list.component';
import { LanguageService } from '../services/language.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { RoleRevealComponent } from './role-reveal/role-reveal.component';

@NgModule({
  declarations: [
    AppComponent,
    MainAreaComponent,
    NavBarComponent,
    GameSetupComponent,
    WelcomePageComponent,
    PlayerListComponent,
    RoleRevealComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule, 
    MatCheckboxModule,
    MatToolbarModule,
    MatCardModule,
    MatDividerModule,
    MatListModule,
    MatButtonToggleModule,
    MatInputModule,
    MatExpansionModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  exports: [
    MatButtonModule, 
    MatCheckboxModule
  ],
  providers: [
    LanguageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

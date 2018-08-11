//Dependencies
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  MatButtonModule,
  MatCheckboxModule,
  MatIconModule,
  MatDialogModule
} from "@angular/material";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatCardModule } from "@angular/material/card";
import { FormsModule } from "@angular/forms";
import { MatDividerModule } from "@angular/material/divider";
import { MatListModule } from "@angular/material/list";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatInputModule } from "@angular/material/input";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatTooltipModule } from "@angular/material/tooltip";
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";

//Our own stuff
import { AppComponent } from "./app.component";
import { MainAreaComponent } from "./ofl/main-area/main-area.component";
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { GameSetupComponent } from "./ofl/game-setup/game-setup.component";
import { WelcomePageComponent } from "./ofl/welcome-page/welcome-page.component";
import { PlayerListComponent } from "./ofl/player-list/player-list.component";
import { LanguageService } from "../services/language.service";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";
import { RoleRevealComponent } from "./ofl/role-reveal/role-reveal.component";
import { PassToNextComponent } from "./ofl/pass-to-next/pass-to-next.component";
import { GameService } from "../services/game.service";
import { ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing/app-routing.module";
import {
  WelcomeOlComponent,
  EnterGameDialog
} from "./ol/welcome-ol/welcome-ol.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { OnlineService } from "../services/online.service";
import { MainAreaOlComponent } from "./ol/main-area-ol/main-area-ol.component";
import { GameLobbyComponent } from "./ol/game-lobby/game-lobby.component";

@NgModule({
  imports: [
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatCardModule,
    MatDividerModule,
    MatListModule,
    MatButtonToggleModule,
    MatInputModule,
    MatExpansionModule,
    MatTooltipModule,
    MatDialogModule,
    ServiceWorkerModule.register("/ngsw-worker.js", {
      enabled: environment.production
    }),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
  ],

  declarations: [
    AppComponent,
    MainAreaComponent,
    NavBarComponent,
    GameSetupComponent,
    WelcomePageComponent,
    PlayerListComponent,
    RoleRevealComponent,
    PassToNextComponent,
    WelcomeOlComponent,
    NotFoundComponent,
    EnterGameDialog,
    MainAreaOlComponent,
    GameLobbyComponent
  ],

  exports: [MatButtonModule, MatCheckboxModule],
  providers: [LanguageService, GameService, OnlineService],
  entryComponents: [EnterGameDialog],
  bootstrap: [AppComponent]
})
export class AppModule {}

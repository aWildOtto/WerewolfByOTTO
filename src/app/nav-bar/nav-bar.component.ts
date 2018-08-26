import { Component, OnInit, isDevMode, Inject, OnDestroy } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { GameService } from '../../services/game.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { OnlineService } from '../../services/online.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  devMode = false;
  public version = 'online';
  private url = '';

  refresh() {
    window.location.reload();
  }
  constructor(
    public ls: LanguageService,
    private gs: GameService,
    public dialog: MatDialog,
    private router: Router
  ) {
    if (isDevMode()) {
      this.devMode = true;
    }
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.url = event.url;
        if (event.url === '/offline') {
          this.version = 'offline';
        } else {
          this.version = 'online';
        }
      }
    });
  }

  showEverything() {
    console.log(this.gs.getGameData());
    console.log(this.gs.getRoleData());
  }

  ngOnInit() {
  }

  openSettingsDialog(event): void {
    const dialogRef = this.dialog.open(SettingsDialog, {
      width: '70%',
      data: {
        version: this.version,
        language: this.ls.language,
        gameCode: this.url
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}

@Component({
  selector: 'settings',
  templateUrl: 'settings.html',
  styleUrls: ['settings.scss']
})
export class SettingsDialog {

  constructor(
    public dialogRef: MatDialogRef<SettingsDialog>,
    public ls: LanguageService,
    private os: OnlineService,
    private router: Router,
    private gs: GameService,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  changeLanguage(event) {
    this.ls.language = event.value;
    this.ls.loadLanguage();
  }

  changeVersion(event) {
    this.ls.version = event.value;
    if (event.value === 'online') {
      this.router.navigate(['']);
      this.data.version = 'online';
    } else {
      this.router.navigate(['offline']);
      this.data.version = 'offline';
    }

  }


  resetGameData(event) {
    this.gs.reset();
    this.ls.reset();
    this.dialogRef.close();
  }

  restartGame(event) {
    if (this.data.version === 'offline') {
      this.gs.restart();
    } else {
      this.os.restart(this.data.gameCode);
    }
    this.dialogRef.close();
  }

}

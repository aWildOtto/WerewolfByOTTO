import { Component, OnInit, isDevMode, Inject, OnDestroy } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { GameService } from '../../services/game.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  devMode = false;

  refresh() {
    window.location.reload();
  }
  constructor(
    public ls: LanguageService,
    private gs: GameService,
    public dialog: MatDialog,
    private route: ActivatedRoute
  ) {
    if (isDevMode()) {
      this.devMode = true;
    }
  }

  showEverything() {
    console.log(this.gs.getGameData());
    console.log(this.gs.getRoleData());
  }

  ngOnInit() {
    console.log(this.route.snapshot.url);
  }

  openSettingsDialog(event): void {
    const dialogRef = this.dialog.open(SettingsDialog, {
      width: '70%'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}

@Component({
  selector: 'settings',
  templateUrl: 'settings.html',

})
export class SettingsDialog {
  showPage: string;
  public isOnLineMode = true;

  constructor(
    public ls: LanguageService,
    public dialogRef: MatDialogRef<SettingsDialog>,
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
      this.isOnLineMode = true;
      this.router.navigate(['']);
    } else {
      this.isOnLineMode = false;
      this.router.navigate(['offline']);
    }
  }


  resetGameData(event) {
    this.gs.reset();
    this.ls.reset();
    this.showPage = this.gs.getGameData().currentPage;
    console.log(this.gs.getGameData());
  }

  restartGame(event) {
    this.gs.restart();
    this.showPage = this.gs.getGameData().currentPage;
  }

}

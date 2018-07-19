import { Component, OnInit, Inject } from '@angular/core';
import { OnlineService } from '../../../services/online.service';
import { LanguageService } from '../../../services/language.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';

@Component({
  selector: 'app-welcome-ol',
  templateUrl: './welcome-ol.component.html',
  styleUrls: ['./welcome-ol.component.scss']
})
export class WelcomeOlComponent implements OnInit {

  constructor(
    private os: OnlineService,
    public ls: LanguageService,
    public dialog: MatDialog
  ) { 

  }


  openDialog(){
    const dialogRef = this.dialog.open(CreateJoinGameDialog, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }
  create(){

  }

  join(){

  }

  ngOnInit() {
  }

}


@Component({
  selector: 'dialog-create-join-game',
  templateUrl: 'dialog-create-join-game.html',
})
export class CreateJoinGameDialog {

  constructor(
    public dialogRef: MatDialogRef<CreateJoinGameDialog>,
    // @Inject(MAT_DIALOG_DATA) public data: 
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-area',
  templateUrl: './main-area.component.html',
  styleUrls: ['./main-area.component.scss']
})
export class MainAreaComponent implements OnInit {
  showPage: string;
  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { Role } from '../../../model/role';
import { LanguageService } from '../../../services/language.service';

@Component({
  selector: 'app-mod-page',
  templateUrl: './mod-page.component.html',
  styleUrls: ['./mod-page.component.scss']
})
export class ModPageComponent implements OnInit {
  // TODO: input gameCode, 
  // get all of roleData/gameCode
  // display the roleData
  // - (role) (name)

  @Input() gameCode: string;
  @Input() roleDataArr: Role[];

  constructor(public ls: LanguageService) { }

  ngOnInit() {
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { LanguageService } from '../../../services/language.service';

@Component({
  selector: 'app-role-reveal-ol',
  templateUrl: './role-reveal-ol.component.html',
  styleUrls: ['./role-reveal-ol.component.scss']
})
export class RoleRevealOlComponent implements OnInit {
  @Input() currentRoleData;
  constructor(
    public ls: LanguageService
  ) { }

  ngOnInit() {
  }

}

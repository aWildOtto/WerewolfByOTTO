import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Role } from '../../../model/role';
import { ActivatedRoute } from '@angular/router';
import { LanguageService } from '../../../services/language.service';
import { AngularFireObject } from '../../../../node_modules/angularfire2/database';
import { Subscription } from '../../../../node_modules/rxjs';
import { OnlineService } from '../../../services/online.service';

@Component({
  selector: 'app-mod-page',
  templateUrl: './mod-page.component.html',
  styleUrls: ['./mod-page.component.scss']
})
export class ModPageComponent implements OnInit, OnDestroy {

  public roleData: AngularFireObject<Object>;
  private roleDataSubscription: Subscription;
  public gameCode = '';
  public roleDataArr: Role[] = [];

  constructor(
    public ls: LanguageService,
    private os: OnlineService,
    private activeRoute: ActivatedRoute
  ) {
    this.gameCode = this.activeRoute.snapshot.params['id'];
    this.roleData = this.os.getData('roleData', this.gameCode);
    this.roleDataSubscription = this.roleData.valueChanges().subscribe(roleDataObj => {
      if (roleDataObj) {
        this.roleDataArr = this.convertRoleDateToArr(roleDataObj);
      }
    });
  }

  convertRoleDateToArr(evilResponseProps: {}): Role[] {
    const goodResponse: Role[] = [];
    for (const prop in evilResponseProps) {
      if (prop) {
        goodResponse.push({
          id: evilResponseProps[prop].id,
          name: evilResponseProps[prop].name,
          role: evilResponseProps[prop].role
        });
      }
    }
    return goodResponse;
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    if (this.roleDataSubscription) {
      this.roleDataSubscription.unsubscribe();
    }
  }

}

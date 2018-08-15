import { Injectable } from '@angular/core';
import { ActivatedRoute, Params } from '../../node_modules/@angular/router';
import { Observable } from '../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  private routerParams: Observable<Params>;
  private params: Params;
  constructor(
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      this.params = params;
    });
  }
  getParams() {
    return this.params;
  }
}

import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class OnlineService {

  constructor(
    db: AngularFireDatabase
  ) { 
    console.log("hi otto");     
  }
}

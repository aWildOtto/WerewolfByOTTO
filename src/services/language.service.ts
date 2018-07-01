import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  public language:string = "English";
  public s;//string object
  constructor() {
    
    this.loadLanguage();
    
  }
  loadLanguage(){
    this.s = require('../assets/' + this.language + '.json');
  }
}

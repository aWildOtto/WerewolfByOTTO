import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  public version = 'online';
  public language = 'English';
  public s; // string object
  constructor() {
    if (localStorage.getItem('lang')) {
      this.language = localStorage.getItem('lang');
    }
    this.loadLanguage();

  }
  loadLanguage() {
    this.s = require('../assets/' + this.language + '.json');
    localStorage.setItem('lang', this.language);
  }

  reset() {
    this.language = 'English';
    this.loadLanguage();
  }
}

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainAreaOlComponent } from './main-area-ol.component';

describe('MainAreaOlComponent', () => {
  let component: MainAreaOlComponent;
  let fixture: ComponentFixture<MainAreaOlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainAreaOlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainAreaOlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

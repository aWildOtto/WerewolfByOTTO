import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeOlComponent } from './welcome-ol.component';

describe('WelcomeOlComponent', () => {
  let component: WelcomeOlComponent;
  let fixture: ComponentFixture<WelcomeOlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomeOlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeOlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

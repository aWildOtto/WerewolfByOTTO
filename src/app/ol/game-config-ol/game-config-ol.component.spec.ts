import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameConfigOlComponent } from './game-config-ol.component';

describe('GameConfigOlComponent', () => {
  let component: GameConfigOlComponent;
  let fixture: ComponentFixture<GameConfigOlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameConfigOlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameConfigOlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

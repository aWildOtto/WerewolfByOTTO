import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameUIComponent } from './game-ui.component';

describe('GameUIComponent', () => {
  let component: GameUIComponent;
  let fixture: ComponentFixture<GameUIComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameUIComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

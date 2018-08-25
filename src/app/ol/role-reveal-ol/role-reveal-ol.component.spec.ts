import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleRevealOlComponent } from './role-reveal-ol.component';

describe('RoleRevealOlComponent', () => {
  let component: RoleRevealOlComponent;
  let fixture: ComponentFixture<RoleRevealOlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleRevealOlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleRevealOlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleRevealComponent } from './role-reveal.component';

describe('RoleRevealComponent', () => {
  let component: RoleRevealComponent;
  let fixture: ComponentFixture<RoleRevealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleRevealComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleRevealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

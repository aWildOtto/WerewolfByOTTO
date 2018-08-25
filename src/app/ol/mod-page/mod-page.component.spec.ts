import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModPageComponent } from './mod-page.component';

describe('ModPageComponent', () => {
  let component: ModPageComponent;
  let fixture: ComponentFixture<ModPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

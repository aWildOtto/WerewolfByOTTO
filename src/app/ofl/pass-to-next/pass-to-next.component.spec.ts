import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassToNextComponent } from './pass-to-next.component';

describe('PassToNextComponent', () => {
  let component: PassToNextComponent;
  let fixture: ComponentFixture<PassToNextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassToNextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassToNextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

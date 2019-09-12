import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UmpireScheduleComponent } from './umpire-schedule.component';

describe('UmpireScheduleComponent', () => {
  let component: UmpireScheduleComponent;
  let fixture: ComponentFixture<UmpireScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UmpireScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UmpireScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingAssignmentComponent } from './training-assignment.component';

describe('TrainingAssignmentComponent', () => {
  let component: TrainingAssignmentComponent;
  let fixture: ComponentFixture<TrainingAssignmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingAssignmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

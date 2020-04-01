import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingAssignmentAddComponent } from './training-assignment-add.component';

describe('TrainingAssignmentAddComponent', () => {
  let component: TrainingAssignmentAddComponent;
  let fixture: ComponentFixture<TrainingAssignmentAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingAssignmentAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingAssignmentAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

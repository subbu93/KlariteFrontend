import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillAssignmentAddComponent } from './skill-assignment-add.component';

describe('SkillAssignmentAddComponent', () => {
  let component: SkillAssignmentAddComponent;
  let fixture: ComponentFixture<SkillAssignmentAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillAssignmentAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillAssignmentAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTrainingAddComponent } from './admin-training-add.component';

describe('AdminTrainingAddComponent', () => {
  let component: AdminTrainingAddComponent;
  let fixture: ComponentFixture<AdminTrainingAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminTrainingAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTrainingAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

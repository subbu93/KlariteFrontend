import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSkillAddComponent } from './admin-skill-add.component';

describe('AdminSkillAddComponent', () => {
  let component: AdminSkillAddComponent;
  let fixture: ComponentFixture<AdminSkillAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSkillAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSkillAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

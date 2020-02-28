import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSkillComponent } from './admin-skill.component';

describe('AdminSkillComponent', () => {
  let component: AdminSkillComponent;
  let fixture: ComponentFixture<AdminSkillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSkillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

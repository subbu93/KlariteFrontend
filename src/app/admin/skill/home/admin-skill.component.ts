import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {AppComponent} from '../../../app.component';
import {AdminServiceService} from '../../../services/admin-service.service';
import {Skill} from '../../../model/skill';
import {ToastrService} from 'ngx-toastr';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-admin-skill',
  templateUrl: './admin-skill.component.html',
  styleUrls: ['./admin-skill.component.css', '../../../app.component.css', '../../admin.component.css']
})
export class AdminSkillComponent implements OnInit, OnDestroy {
  skills: Skill[];
  navigationSubscription;
  selected: Skill = null;

  constructor(private adminService: AdminServiceService,
              private appComponent: AppComponent,
              private router: Router,
              private toastr: ToastrService) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initialize the component
      if (e instanceof NavigationEnd && e.url === '/admin-skill') {
        appComponent.previousUrl = appComponent.currentUrl;
        appComponent.currentUrl = e.url;
        appComponent.title = 'Admin - Skill';
        console.log(appComponent.previousUrl);
      }
    });
  }

  ngOnInit() {
    this.adminService.getAllSkills().subscribe(data => {
      this.skills = data;
      // console.log(data);
    });
  }

  myClick(skill: Skill) {
    const state = skill.isSelected;
    this.skills.forEach((element) => {
      element.isSelected = false;
    });
    skill.isSelected = !state;
    if (skill.isSelected) {
      this.selected = skill;
    } else {
      this.selected = null;
    }
  }

  onEdit() {
    if (this.selected) {
      console.log('selected');
      this.router.navigateByUrl('/admin-skill-add', {state: {data: this.selected}});
    } else {
      this.toastr.error('Select a Skill to edit');
    }
  }

  onAdd() {
    this.router.navigateByUrl('/admin-skill-add');
  }

  onDelete() {
    if (this.selected) {
      this.adminService.deleteSkill(this.selected)
        .subscribe(
          (val) => {
            console.log(val);
          },
          (response: HttpErrorResponse) => {
            if (response.status === 200) {
              this.adminService.getAllSkills().subscribe(data => {
                this.skills = data;
              });
            } else {
              this.toastr.error('Could not delete data');
            }
          });
    } else {
      this.toastr.error('Select a Skill to delete');
    }
  }

  ngOnDestroy(): void {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }
}

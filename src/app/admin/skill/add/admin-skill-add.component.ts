import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppComponent} from '../../../app.component';
import {NavigationEnd, Router} from '@angular/router';
import {Skill} from '../../../model/skill';
import {Training} from '../../../model/training';
import {AdminServiceService} from '../../../Services/admin-service.service';
import {ToastrService} from 'ngx-toastr';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-admin-skill-add',
  templateUrl: './admin-skill-add.component.html',
  styleUrls: ['./admin-skill-add.component.css', '../../../app.component.css']
})
export class AdminSkillAddComponent implements OnInit, OnDestroy {
  navigationSubscription;
  skill: Skill = new Skill();
  trainings: Training[];
  // trainingId = '';

  constructor(private adminService: AdminServiceService,
              private appComponent: AppComponent,
              private router: Router,
              private toastr: ToastrService) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd && e.url === '/admin-skill-add') {
        appComponent.previousUrl = appComponent.currentUrl;
        appComponent.currentUrl = e.url;
        appComponent.title = 'Admin - Skill';
        console.log(appComponent.previousUrl);
      }
    });
  }

  ngOnInit(): void {
    if (history.state.data) {
      this.skill = history.state.data;
    }
    this.adminService.getAllTrainings().subscribe(data => {
      this.trainings = data;
    });
  }
  ngOnDestroy(): void {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  onSave() {
    this.adminService.addSkill(this.skill)
      .subscribe(response => {
        // debugger;
        console.log('response: ' + response);
      }, (err: HttpErrorResponse) => {
        if (err.status === 201) {
          this.router.navigateByUrl('/admin-skill');
        } else {
          this.toastr.error('Cannot store data');
        }
        console.log(err);
      });
  }

  onCancel() {
    this.router.navigateByUrl(this.appComponent.previousUrl);
  }
}

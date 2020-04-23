import { Component, OnInit } from '@angular/core';
import {User} from '../../../model/user';
import {BusinessUnit} from '../../../model/business-unit';
import {CostCenter} from '../../../model/cost-center';
import {AdminServiceService} from '../../../services/admin-service.service';
import {AppComponent} from '../../../app.component';
import {NavigationEnd, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {AuthenticationServiceService} from '../../../services/authentication-service.service';
import {SkillServiceService} from '../../../services/skill-service.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Roles} from '../../../model/roles.enum';

@Component({
  selector: 'app-admin-users-add',
  templateUrl: './admin-users-add.component.html',
  styleUrls: ['./admin-users-add.component.css', '../../../app.component.css', '../../admin.component.css']
})
export class AdminUsersAddComponent implements OnInit {
  user: User = new User();
  businessUnits: BusinessUnit[] = [];
  costCenters: CostCenter[] = [];
  private navigationSubscription;
  roles = [Roles.Supervisor, Roles.Nurse, Roles.SiteAdministrator, Roles.SuperUser];

  constructor(private adminService: AdminServiceService,
              private appComponent: AppComponent,
              private router: Router,
              private toastr: ToastrService,
              private authService: AuthenticationServiceService,
              private skillService: SkillServiceService) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initialize the component
      if (e instanceof NavigationEnd && e.url === '/admin-users-add' && appComponent.previousUrl !== '/admin-users-add') {
        appComponent.previousUrl = appComponent.currentUrl;
        appComponent.currentUrl = e.url;
        appComponent.title = 'Admin - Users';
        console.log(appComponent.previousUrl);
      }
    });
    this.skillService.getCostCenters().subscribe(data => {
      this.costCenters = data;
    });
    this.skillService.getBusinessUnits().subscribe(data => {
      this.businessUnits = data;
    });
  }

  ngOnInit(): void {
    if (history.state.data) {
      console.log(history.state.data);
      this.user = history.state.data;
    }
  }

  onSave() {
    this.adminService.createUser(this.user).subscribe(response => {
      // debugger;
      console.log('response: ' + response);
    }, (response: HttpErrorResponse) => {
      if (response.status === 201) {
        this.router.navigateByUrl('/admin-users');
      } else {
        this.toastr.error('Cannot store data');
      }
      console.log(response);
    });
  }

  onCancel() {
    // console.log(this.appComponent.previousUrl);
    this.router.navigateByUrl('/admin-users');
  }
}

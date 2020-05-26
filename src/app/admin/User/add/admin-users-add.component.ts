import {Component, OnInit} from '@angular/core';
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
import {License} from '../../../model/license';
import {FormControl, FormGroup} from '@angular/forms';
import {IDropdownSettings} from 'ng-multiselect-dropdown';

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
  licenses: License[] = [];
  private form: FormGroup;
  dropdownSettings: IDropdownSettings;
  selectedLicense: any[] = [];
  dropdownRequiredField = false;

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

    this.adminService.getLicense().subscribe(data => {
      this.licenses = data;
    });
  }

  ngOnInit(): void {
    if (history.state.data) {
      console.log(history.state.data);
      this.user = history.state.data;
      this.selectedLicense = history.state.data.licenseList;
    }

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    this.setForm();
  }

  onSave() {
    console.log(this.selectedLicense);
    this.user.licenseList = this.selectedLicense;
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

  public setForm() {
    this.checkUserDropdownValid();
    this.form = new FormGroup({
      name: new FormControl(this.selectedLicense)
    });
  }

  get f() {
    return this.form.controls;
  }

  checkUserDropdownValid() {
    if (this.selectedLicense.length > 0) {
      this.dropdownRequiredField = true;
    } else {
      this.dropdownRequiredField = false;
    }
    console.log(this.dropdownRequiredField);
  }

  onItemSelect(item: any) {
    this.selectedLicense.push(item);
    console.log(this.selectedLicense);
    this.checkUserDropdownValid();
  }

  OnItemDeSelect(item: any) {
    console.log(item);
    let index = 0;
    for (const license of this.selectedLicense) {
      if (license.id == item.id) {
        this.selectedLicense.splice(index, 1);
      }
      index++;
    }
    this.checkUserDropdownValid();
  }

  onSelectAll(items: any) {
    console.log(this.selectedLicense);
    this.selectedLicense = items;
    this.checkUserDropdownValid();
  }

  onDeSelectAll($event: any) {
    this.selectedLicense = [];
    this.checkUserDropdownValid();
  }
}

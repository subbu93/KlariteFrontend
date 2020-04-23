import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AdminServiceService} from '../../../services/admin-service.service';
import {AppComponent} from '../../../app.component';
import {NavigationEnd, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {SkillAssignment} from '../../../model/skill-assignment';
import {User} from '../../../model/user';
import {SkillServiceService} from '../../../services/skill-service.service';
import {CostCenter} from '../../../model/cost-center';
import {Skill} from '../../../model/skill';
import {HttpErrorResponse} from '@angular/common/http';
import {IDropdownSettings} from 'ng-multiselect-dropdown';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-skill-assignment-add',
  templateUrl: './skill-assignment-add.component.html',
  styleUrls: ['./skill-assignment-add.component.css', '../../../app.component.css', '../../../admin/admin.component.css']
})
export class SkillAssignmentAddComponent implements OnInit, OnDestroy {

  @ViewChild('multiSelect') multiSelect;
  navigationSubscription;
  assignment: SkillAssignment = new SkillAssignment();
  users: User[] = [];
  usersList: any[] = [];
  selectedUsers: any = [];
  dropdownSettings: IDropdownSettings;
  costCenters: CostCenter[] = [];
  skills: Skill[] = [];
  private form: FormGroup;

  constructor(private adminService: AdminServiceService,
              private skillService: SkillServiceService,
              private appComponent: AppComponent,
              private router: Router,
              private toastr: ToastrService) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd && e.url === '/skill-assignment-add') {
        appComponent.previousUrl = appComponent.currentUrl;
        appComponent.currentUrl = e.url;
        appComponent.title = 'Skill - Assignment';
        console.log(appComponent.previousUrl);
      }
    });
    this.skillService.getAllUSers().subscribe(data => {
      this.users = data;
      const list = [];
      for (const user of data) {
        if (this.assignment.assignedUserIds) {
          for (const id of this.assignment.assignedUserIds) {
            if (user.id == id) {
              console.log(user.firstName + '  ' + user.lastName);
              this.selectedUsers.push({id: user.id, name: user.firstName + '  ' + user.lastName});
            }
          }
          if (this.assignment.costCenterId == user.costCenterId) {
            list.push({id: user.id, name: user.firstName + '  ' + user.lastName});
          }
        } else {
          list.push({id: user.id, name: user.firstName + '  ' + user.lastName});
        }
      }
      this.usersList = list;
      console.log(this.usersList);
      this.setForm();
    });
    this.skillService.getCostCenters().subscribe(data => {
      this.costCenters = data;
    });
    this.adminService.getAllSkills().subscribe(data => {
      console.log(data);
      this.skills = data;
    });
  }

  ngOnInit(): void {
    if (history.state.data) {
      console.log(history.state.data);
      this.assignment = history.state.data;
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

  ngOnDestroy(): void {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  onCancel() {
    this.router.navigateByUrl(this.appComponent.previousUrl);
  }

  onSave() {
    const userIds = [];
    for (const item of this.selectedUsers) {
      userIds.push(item.id);
    }
    this.assignment.assignedUserIds = userIds;
    this.skillService.addSkillAssignment(this.assignment).subscribe(response => {
      // debugger;
      console.log('response: ' + response);
    }, (err: HttpErrorResponse) => {
      if (err.status === 201) {
        this.router.navigateByUrl('/skill-assignment');
      } else {
        this.toastr.error('Cannot store data');
      }
      console.log(err);
    });
  }

  onItemSelect(item: any) {
    this.selectedUsers.push(item);
    console.log(this.selectedUsers);
  }

  OnItemDeSelect(item: any) {
    console.log(item);
    let index = 0;
    for (const usr of this.selectedUsers) {
      if (usr.id == item.id) {
        this.selectedUsers.splice(index, 1);
      }
      index++;
    }
  }

  onSelectAll(items: any) {
    console.log(this.selectedUsers);
    this.selectedUsers = items;

  }

  onDeSelectAll($event: any) {
    this.selectedUsers = [];
  }

  public setForm() {
    this.form = new FormGroup({
      name: new FormControl(this.selectedUsers)
    });
  }

  get f() {
    return this.form.controls;
  }

  onChangeCostCenter() {
    const list = [];
    for (const user of this.users) {
      if (user.costCenterId == this.assignment.costCenterId) {
        list.push({id: user.id, name: user.firstName + '  ' + user.lastName});
      }
    }
    this.usersList = list;
    this.selectedUsers = [];
    this.setForm();
  }
}

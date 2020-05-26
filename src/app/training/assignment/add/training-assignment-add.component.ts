import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {User} from '../../../model/user';
import {IDropdownSettings} from 'ng-multiselect-dropdown';
import {CostCenter} from '../../../model/cost-center';
import {FormControl, FormGroup} from '@angular/forms';
import {AdminServiceService} from '../../../services/admin-service.service';
import {SkillServiceService} from '../../../services/skill-service.service';
import {AppComponent} from '../../../app.component';
import {NavigationEnd, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Training} from '../../../model/training';
import {HttpErrorResponse} from '@angular/common/http';
import {TrainingAssignment} from '../../../model/training-assignment';
import {BusinessUnit} from '../../../model/business-unit';
import {TrainingServiceService} from '../../../services/training-service.service';
import {v4 as uuidv4} from 'uuid';

@Component({
  selector: 'app-training-assignment-add',
  templateUrl: './training-assignment-add.component.html',
  styleUrls: ['./training-assignment-add.component.css', '../../../app.component.css', '../../../admin/admin.component.css']
})
export class TrainingAssignmentAddComponent implements OnInit, OnDestroy {

  @ViewChild('multiSelect') multiSelect;
  navigationSubscription;
  assignment: TrainingAssignment = new TrainingAssignment();
  users: User[] = [];
  usersList: any[] = [];
  selectedUsers: any = [];
  dropdownSettings: IDropdownSettings;
  businessUnits: BusinessUnit[] = [];
  costCenters: CostCenter[] = [];
  trainings: Training[] = [];
  private form: FormGroup;
  dropdownRequiredField = false;

  constructor(private adminService: AdminServiceService,
              private skillService: SkillServiceService,
              private trainingService: TrainingServiceService,
              private appComponent: AppComponent,
              private router: Router,
              private toastr: ToastrService) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd && e.url === '/training-assignment-add') {
        appComponent.previousUrl = appComponent.currentUrl;
        appComponent.currentUrl = e.url;
        appComponent.title = 'Training - Assignment';
        console.log(appComponent.previousUrl);
      }
    });
    this.skillService.getAllUSers().subscribe(data => {
      this.users = data;
      console.log(data);
      const list = [];
      if (this.assignment.assignedUserIds) {
      for (const user of data) {
          for (const id of this.assignment.assignedUserIds) {
            if (user.id == id) {
              console.log(user.firstName + '  ' + user.lastName);
              this.selectedUsers.push({id: user.id, name: user.firstName + '  ' + user.lastName});
            }
          }
          if (this.assignment.costCenterId == user.costCenterId) {
            list.push({id: user.id, name: user.firstName + '  ' + user.lastName});
          }
        }
      }
      this.usersList = list;
      console.log(this.usersList);
      this.setForm();
    });

    this.skillService.getCostCenters().subscribe(data => {
      this.costCenters = data;
    });
    this.skillService.getBusinessUnits().subscribe(data => {
      this.businessUnits = data;
    });
    this.adminService.getAllTrainings().subscribe(data => {
      console.log(data);
      this.trainings = data;
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
    this.assignment.assignedUserIds = this.addUsers();
    this.addUuid();
    console.log(this.assignment.startTime);
    this.trainingService.addTrainingAssignment(this.assignment).subscribe(response => {
      // debugger;
      console.log('response: ' + response);
    }, (err: HttpErrorResponse) => {
      if (err.status === 201) {
        this.router.navigateByUrl('/training-assignment');
      } else {
        this.toastr.error('Cannot store data');
      }
      console.log(err);
    });
  }

  checkUserDropdownValid() {
    if (this.selectedUsers.length > 0) {
      this.dropdownRequiredField = true;
    } else {
      this.dropdownRequiredField = false;
    }
    console.log(this.dropdownRequiredField);
  }

  onItemSelect(item: any) {
    this.selectedUsers.push(item);
    console.log(this.selectedUsers);
    this.checkUserDropdownValid();
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
    this.checkUserDropdownValid();
  }

  onSelectAll(items: any) {
    console.log(this.selectedUsers);
    this.selectedUsers = items;
    this.checkUserDropdownValid();
  }

  onDeSelectAll($event: any) {
    this.selectedUsers = [];
    this.checkUserDropdownValid();
  }

  public setForm() {
    this.checkUserDropdownValid();
    this.form = new FormGroup({
      name: new FormControl(this.selectedUsers)
    });
  }

  get f() {
    return this.form.controls;
  }

  generateUserList() {
    const list = [];
    this.usersList = list;
    this.selectedUsers = [];
    if (!this.assignment.businessUnitId) {
      this.toastr.error('Select business unit');
      return;
    }
    if (!this.assignment.costCenterId) {
      this.toastr.error('Select cost center');
      return;
    }
    for (const user of this.users) {
      if (user.costCenterId == this.assignment.costCenterId
        && user.businessUnitId == this.assignment.businessUnitId) {
        list.push({id: user.id, name: user.firstName + '  ' + user.lastName});
      }
    }
    this.usersList = list;
    this.setForm();
  }

  updateTime(event: any) {
    if (event.length < 6) {
      event = event + ':00';
      this.assignment.startTime = event;
    }
  }

  private addUsers() {
    const userIds = [];
    for (const item of this.selectedUsers) {
      userIds.push(item.id);
    }
    return userIds;
  }

  private addUuid() {
    if (this.assignment.assignmentId == null) {
      this.assignment.uuid = (Math.floor(100000 + Math.random() * 900000)).toString();
    }
  }
}

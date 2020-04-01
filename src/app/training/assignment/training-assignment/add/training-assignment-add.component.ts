import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {SkillAssignment} from '../../../../model/skill-assignment';
import {User} from '../../../../model/user';
import {IDropdownSettings} from 'ng-multiselect-dropdown';
import {CostCenter} from '../../../../model/cost-center';
import {Skill} from '../../../../model/skill';
import {FormControl, FormGroup} from '@angular/forms';
import {AdminServiceService} from '../../../../services/admin-service.service';
import {SkillServiceService} from '../../../../services/skill-service.service';
import {AppComponent} from '../../../../app.component';
import {NavigationEnd, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Training} from '../../../../model/training';
import {HttpErrorResponse} from '@angular/common/http';
import {TrainingAssignment} from '../../../../model/training-assignment';
import {BusinessUnit} from '../../../../model/business-unit';
import {TrainingServiceService} from '../../../../services/training-service.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-training-assignment-add',
  templateUrl: './training-assignment-add.component.html',
  styleUrls: ['./training-assignment-add.component.css', '../../../../app.component.css', '../../../../admin/admin.component.css']
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

  constructor(private adminService: AdminServiceService,
              private skillService: SkillServiceService,
              private trainingService: TrainingServiceService,
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
      console.log(data);
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

  onChangeBusinessUnit() {
    const usrlist = [];
    const cstlist = [];
    for (const user of this.users) {
      if (user.businessUnitId == this.assignment.businessUnitId) {
        usrlist.push({id: user.id, name: user.firstName + '  ' + user.lastName});
        cstlist.push({id: user.costCenterId, costCenterName: user.costCenterName});
      }
    }
    this.usersList = usrlist;
    this.costCenters = cstlist;
    this.selectedUsers = [];
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
      this.assignment.uuid = uuidv4();
    }
  }
}
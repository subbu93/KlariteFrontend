import { Component, OnInit } from '@angular/core';
import {SkillServiceService} from '../../services/skill-service.service';
import {AdminServiceService} from '../../services/admin-service.service';
import {AppComponent} from '../../app.component';
import {NavigationEnd, Router} from '@angular/router';
import {AuthenticationServiceService} from '../../services/authentication-service.service';
import {HttpErrorResponse} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.css',  '../../app.component.css', '../../admin/admin.component.css']
})
export class ValidationComponent implements OnInit {
  navigationSubscription: any;
  validationData: any[];
  users: any[] = [];
  selectedUser: any;
  mrnList: any[];
  selectedMrn: string;
  episodeTableData: any[];
  showMsg = false;
  showTable = false;

  constructor(private skillService: SkillServiceService,
              private adminService: AdminServiceService,
              private appComponent: AppComponent,
              private authenticationService: AuthenticationServiceService,
              private router: Router,
              private toastr: ToastrService) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initialize the component
      if (e instanceof NavigationEnd && e.url === '/skill-validation') {
        appComponent.previousUrl = appComponent.currentUrl;
        appComponent.currentUrl = e.url;
        appComponent.title = 'Skill - Validation';
        console.log(appComponent.previousUrl);
      }
    });
  }

  ngOnInit(): void {
    this.skillService.getValidationData(this.authenticationService.currentUserValue.id)
      .subscribe(data => {
        console.log(data);
        if (data.length == 0) {
          this.showMsg = true;
        }
        this.validationData = data;
        for (const row of data) {
          const found = this.users.some(el => el.id === row.userId);
          if (!found) {
            this.users.push({id: row.userId, name: row.firstName + ' ' + row.lastName});
          }
        }
        if (this.selectedUser != undefined && this.selectedMrn != undefined) {
          this.createEpisodesTableData();
        }
      });
  }

  createMrnList() {
    this.mrnList = [];

    for (const row of this.validationData) {
      if (row.userId == this.selectedUser && !(this.mrnList.some(el => el === row.mrn))) {
        this.mrnList.push(row.mrn);
      }
    }
  }

  createEpisodesTableData() {
    this.episodeTableData = [];

    console.log('createEpisodesTableData');

    for (const row of this.validationData) {
      if (row.userId == this.selectedUser && row.mrn == this.selectedMrn) {
        this.episodeTableData.push(row);
      }
    }
    this.showTable = true;
    console.log(this.episodeTableData);
  }

  onCancel() {
    console.log('Cancel');
  }

  onSave() {
    this.skillService.saveValidationData(this.validationData).subscribe(response => {
      // debugger;
      console.log('response: ' + response);
    }, (err: HttpErrorResponse) => {
      if (err.status === 201) {
        this.ngOnInit();
        // this.router.navigateByUrl('/skill-assignment');
      } else {
        this.toastr.error('Cannot store data');
      }
      console.log(err);
    });
    console.log(this.validationData);
  }
}

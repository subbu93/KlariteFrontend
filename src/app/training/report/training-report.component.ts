import {Component, OnDestroy, OnInit} from '@angular/core';
import {TrainingServiceService} from '../../services/training-service.service';
import {AppComponent} from '../../app.component';
import {NavigationEnd, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Training} from '../../model/training';
import {TrainingAssignment} from '../../model/training-assignment';
import {User} from '../../model/user';

@Component({
  selector: 'app-training-report',
  templateUrl: './training-report.component.html',
  styleUrls: ['./training-report.component.css', '../../app.component.css', '../../admin/admin.component.css']
})
export class TrainingReportComponent implements OnInit, OnDestroy {
  private navigationSubscription;
  assignments: TrainingAssignment[];
  selected: Training = new Training();
  users: User[];
  attended: User[] = [];
  notAttended: User[] = [];

  constructor(private trainingService: TrainingServiceService,
              private appComponent: AppComponent,
              private router: Router,
              private toastr: ToastrService) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initialize the component
      if (e instanceof NavigationEnd && e.url === '/training-report') {
        appComponent.previousUrl = appComponent.currentUrl;
        appComponent.currentUrl = e.url;
        appComponent.title = 'Training - Report';
        console.log(appComponent.previousUrl);
      }
    });
  }

  ngOnInit(): void {
    this.trainingService.getAllAssignments().subscribe(data => {
      console.log(data);
      this.assignments = data;
    });
  }

  ngOnDestroy(): void {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  getAttendanceList($event: any) {
    this.notAttended = [];
    this.attended = [];
    this.trainingService.getAttendanceList($event).subscribe(data => {
      console.log(data);
      this.users = data;
      for (const user of data) {
        console.log(user.trainingAttended);
        if (user.trainingAttended) {
          this.attended.push(user);
        } else {
          this.notAttended.push(user);
        }
      }
    });
  }

  searchAttended(value: any) {
    console.log(value);
  }
}

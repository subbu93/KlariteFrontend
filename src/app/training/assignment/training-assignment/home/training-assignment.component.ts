import {Component, OnInit} from '@angular/core';
import {AppComponent} from '../../../../app.component';
import {NavigationEnd, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {TrainingServiceService} from '../../../../services/training-service.service';
import {TrainingAssignment} from '../../../../model/training-assignment';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-training-assignment',
  templateUrl: './training-assignment.component.html',
  styleUrls: ['./training-assignment.component.css', '../../../../app.component.css', '../../../../admin/admin.component.css']
})
export class TrainingAssignmentComponent implements OnInit {

  assignments: TrainingAssignment[];
  navigationSubscription;
  selected: TrainingAssignment = null;
  qrdata = '';
  href: string;

  constructor(private trainingService: TrainingServiceService,
              private appComponent: AppComponent,
              private router: Router,
              private toastr: ToastrService) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initialize the component
      if (e instanceof NavigationEnd && e.url === '/training-assignment') {
        appComponent.previousUrl = appComponent.currentUrl;
        appComponent.currentUrl = e.url;
        appComponent.title = 'Training - Assignment';
        console.log(appComponent.previousUrl);
      }
    });
  }

  ngOnInit(): void {
    this.trainingService.getAllAssignments().subscribe(data => {
      this.assignments = data;
    });
  }

  onDelete() {
    if (this.selected) {
      this.trainingService.deleteAssignment(this.selected)
        .subscribe(
          (val) => {
            console.log(val);
          },
          (response: HttpErrorResponse) => {
            if (response.status === 200) {
              this.trainingService.getAllAssignments().subscribe(data => {
                this.assignments = data;
              });
            } else {
              this.toastr.error('Could not delete data');
            }
          });
    } else {
      this.toastr.error('Select a Assignment to delete');
    }
  }

  onEdit() {
    if (this.selected) {
      console.log('selected');
      this.router.navigateByUrl('/training-assignment-add', {state: {data: this.selected}});
    } else {
      this.toastr.error('Select a assignment to edit');
    }
  }

  onAdd() {
    this.router.navigateByUrl('/training-assignment-add');
  }

  myClick(assignment: TrainingAssignment) {
    const state = assignment.isSelected;
    this.assignments.forEach((element) => {
      element.isSelected = false;
    });
    assignment.isSelected = !state;
    if (assignment.isSelected) {
      this.selected = assignment;
      this.qrdata = assignment.uuid;
    } else {
      this.selected = null;
    }
  }

  onGenerateQRCode() {
    const div = document.getElementsByClassName('qrcode')[0];
    this.href = div.getElementsByTagName('img')[0].src;
  }
}

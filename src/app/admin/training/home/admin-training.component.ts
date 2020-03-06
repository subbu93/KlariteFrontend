import {Component, OnDestroy, OnInit} from '@angular/core';
import {Training} from '../../../model/training';
import {AdminServiceService} from '../../../Services/admin-service.service';
import {AppComponent} from '../../../app.component';
import {NavigationEnd, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-admin-training',
  templateUrl: './admin-training.component.html',
  styleUrls: ['./admin-training.component.css', '../../../app.component.css', '../../admin.component.css']
})
export class AdminTrainingComponent implements OnInit, OnDestroy {
  trainings: Training[];
  navigationSubscription;
  selected: Training = null;
  constructor(private adminService: AdminServiceService,
              private appComponent: AppComponent,
              private router: Router,
              private toastr: ToastrService) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initialize the component
      if (e instanceof NavigationEnd && e.url === '/admin-training') {
        appComponent.previousUrl = appComponent.currentUrl;
        appComponent.currentUrl = e.url;
        appComponent.title = 'Admin - Training';
        console.log(appComponent.previousUrl);
      }
    });
  }

  ngOnInit(): void {
    this.adminService.getAllTrainings().subscribe(data => {
      this.trainings = data;
      console.log(data);
    });
  }
  myClick(training: Training) {
    const state = training.isSelected;
    this.trainings.forEach( (element) => {
      element.isSelected = false;
    });
    training.isSelected = !state;
    if (training.isSelected) {
      this.selected = training;
    } else {
      this.selected = null;
    }
  }

  onEdit() {
    if (this.selected) {
      console.log('selected');
      this.router.navigateByUrl('/admin-training-add', {state: {data: this.selected}});
    } else {
      this.toastr.error('Select a training to edit');
    }
  }

  onAdd() {
    this.router.navigateByUrl('/admin-training-add');
  }

  onDelete() {
    if (this.selected) {
      this.adminService.deleteTraining(this.selected)
        .subscribe(
          (val) => {
            console.log(val);
          },
          (response: HttpErrorResponse) => {
            if (response.status === 200) {
              window.location.reload();
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

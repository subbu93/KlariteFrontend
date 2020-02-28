import {Component, OnDestroy, OnInit} from '@angular/core';
import {Skill} from '../../../model/skill';
import {Training} from '../../../model/training';
import {SkillServiceService} from '../../../Services/skill-service.service';
import {AppComponent} from '../../../app.component';
import {NavigationEnd, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {HttpErrorResponse} from '@angular/common/http';
import {User} from '../../../model/user';

@Component({
  selector: 'app-admin-training-add',
  templateUrl: './admin-training-add.component.html',
  styleUrls: ['./admin-training-add.component.css', '../../../app.component.css']
})
export class AdminTrainingAddComponent implements OnInit, OnDestroy {
  navigationSubscription;
  training: Training = new Training();
  trainers: User[];
  trainerId = '';
  constructor(private skillService: SkillServiceService,
              private appComponent: AppComponent,
              private router: Router,
              private toastr: ToastrService) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd && e.url === '/admin-training-add') {
        appComponent.title = 'Admin - Training';
      }
    });
  }

  ngOnInit(): void {
    if (history.state.data) {
      this.training = history.state.data;
    }

    this.skillService.getTrainers().subscribe(data => {
      this.trainers = data;
    });
  }

  ngOnDestroy(): void {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  onSave() {
    console.log(this.trainers);
    // this.skillService.addTraining(this.training)
    //   .subscribe(response => {
    //     // debugger;
    //     console.log('response: ' + response);
    //   }, (err: HttpErrorResponse) => {
    //     if (err.status === 201){
    //       this.router.navigateByUrl('/admin-training');
    //     } else {
    //       this.toastr.error('Cannot store data');
    //     }
    //     console.log(err);
    //   });
  }

  onCancel() {
    this.router.navigateByUrl('/admin-training');
  }
}

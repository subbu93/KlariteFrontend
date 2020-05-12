import {Component, OnInit} from '@angular/core';
import {SkillAssignment} from '../../../model/skill-assignment';
import {AppComponent} from '../../../app.component';
import {NavigationEnd, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {SkillServiceService} from '../../../services/skill-service.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-skill-assignment',
  templateUrl: './skill-assignment.component.html',
  styleUrls: ['./skill-assignment.component.css', '../../../app.component.css', '../../../admin/admin.component.css']
})
export class SkillAssignmentComponent implements OnInit {
  assignments: SkillAssignment[];
  navigationSubscription;
  selected: SkillAssignment = null;
  showMsg = false;

  constructor(private skillService: SkillServiceService,
              private appComponent: AppComponent,
              private router: Router,
              private toastr: ToastrService) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initialize the component
      if (e instanceof NavigationEnd && e.url === '/skill-assignment') {
        appComponent.previousUrl = appComponent.currentUrl;
        appComponent.currentUrl = e.url;
        appComponent.title = 'Skill - Assignment';
        console.log(appComponent.previousUrl);
      }
    });
  }

  ngOnInit(): void {
    this.skillService.getAllAssignments().subscribe(data => {
      console.log(data);
      this.assignments = data;
      if (data.length == 0) {
        this.showMsg = true;
      }
    });
  }

  onDelete() {
    if (this.selected) {
      this.skillService.deleteAssignment(this.selected)
        .subscribe(
          (val) => {
            console.log(val);
          },
          (response: HttpErrorResponse) => {
            if (response.status === 200) {
              // window.location.reload();
              this.skillService.getAllAssignments().subscribe(data => {
                this.assignments = data;
                if (data.length == 0) {
                  this.showMsg = true;
                }
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
      this.router.navigateByUrl('/skill-assignment-add', {state: {data: this.selected}});
    } else {
      this.toastr.error('Select a assignment to edit');
    }
  }

  onAdd() {
    this.router.navigateByUrl('/skill-assignment-add');
  }

  myClick(assignment: SkillAssignment) {
    const state = assignment.isSelected;
    this.assignments.forEach((element) => {
      element.isSelected = false;
    });
    assignment.isSelected = !state;
    if (assignment.isSelected) {
      this.selected = assignment;
    } else {
      this.selected = null;
    }
  }
}

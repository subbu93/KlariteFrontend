import {Component, OnDestroy, OnInit} from '@angular/core';
import {AdminServiceService} from '../../services/admin-service.service';
import {AppComponent} from '../../app.component';
import {NavigationEnd, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {ContactHours} from '../../model/contact-hours';
import {HttpErrorResponse} from '@angular/common/http';
import {element} from 'protractor';
import {License} from '../../model/license';

@Component({
  selector: 'app-contact-hours',
  templateUrl: './contact-hours.component.html',
  styleUrls: ['./contact-hours.component.css', '../../app.component.css', '../admin.component.css']
})
export class ContactHoursComponent implements OnInit, OnDestroy {
  navigationSubscription;
  // states: string[] = ['Alaska', 'Alabama', 'Arkansas', 'American Samoa', 'Arizona', 'California', 'Colorado', 'Connecticut',
  //   'District of Columbia', 'Delaware', 'Florida', 'Georgia', 'Guam', 'Hawaii', 'Iowa', 'Idaho', 'Illinois', 'Indiana',
  //   'Kansas', 'Kentucky', 'Louisiana', 'Massachusetts', 'Maryland', 'Maine', 'Michigan', 'Minnesota', 'Missouri',
  //   'Mississippi', 'Montana', 'North Carolina', ' North Dakota', 'Nebraska', 'New Hampshire', 'New Jersey', 'New Mexico', 'Nevada',
  //   'New York', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota',
  //   'Tennessee', 'Texas', 'Utah', 'Virginia', 'Virgin Islands', 'Vermont', 'Washington', 'Wisconsin', 'West Virginia',
  //   'Wyoming'];
  ce: ContactHours = new ContactHours();
  displayDescription = '';
  licenses: License[] = [];

  constructor(private adminService: AdminServiceService,
              private appComponent: AppComponent,
              private router: Router,
              private toastr: ToastrService) {
    console.log(this.router.url);
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initialize the component
      if (e instanceof NavigationEnd && e.url === '/admin-ce') {
        appComponent.previousUrl = appComponent.currentUrl;
        appComponent.currentUrl = e.url;
        appComponent.title = 'Admin - Contact Hours';
        console.log(e);
      }
    });
  }

  ngOnInit(): void {
    this.adminService.getLicense().subscribe(data => {
      console.log(data);
      this.licenses = data;
    });
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
    this.adminService.addCe(this.ce)
      .subscribe(response => {
        // debugger;
        console.log('response: ' + response);
      }, (err: HttpErrorResponse) => {
        if (err.status === 201) {
          this.ce = new ContactHours();
        } else {
          this.toastr.error('Cannot store data');
        }
        console.log(err);
      });
  }

  getCeHours() {
    console.log('getCeHours');
    this.ce.state = 'Ohio';
    // tslint:disable-next-line:triple-equals
    if (this.ce.licenseId != undefined) {
      // const val = this.ce.certificationId;
      const filteredObj = this.licenses.find(e => e.id == this.ce.licenseId);
      console.log(filteredObj);
      this.displayDescription = filteredObj.description;
    }
    if (this.ce.licenseId != undefined && this.ce.state != undefined) {
      this.adminService.getCeHours(this.ce).subscribe((data: ContactHours) => {
        console.log(data);
        if (data != null) {
          this.ce = data;
        } else {
          this.ce.timePeriod = null;
          this.ce.ceHrs = null;
        }
      });
    }
  }
}

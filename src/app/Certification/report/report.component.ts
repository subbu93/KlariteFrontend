import { Component, OnInit } from '@angular/core';
import {SkillServiceService} from '../../services/skill-service.service';
import {AdminServiceService} from '../../services/admin-service.service';
import {AppComponent} from '../../app.component';
import {NavigationEnd, Router} from '@angular/router';
import {CostCenter} from '../../model/cost-center';
import {BusinessUnit} from '../../model/business-unit';
import {CeReport} from '../../model/ce-report';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css', '../../app.component.css', '../../admin/admin.component.css']
})
export class ReportComponent implements OnInit {
  navigationSubscription: any;
  costCenters: CostCenter[];
  businessUnits: BusinessUnit[];
  businessUnitId: number;
  costCenterId: number;
  ceReport: CeReport[];
  showTable = false;
  showMsg = false;

  constructor(private skillService: SkillServiceService,
              private adminService: AdminServiceService,
              private appComponent: AppComponent,
              private router: Router) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initialize the component
      if (e instanceof NavigationEnd && e.url === '/certification-report') {
        appComponent.previousUrl = appComponent.currentUrl;
        appComponent.currentUrl = e.url;
        appComponent.title = 'Certification - Report';
        console.log(appComponent.previousUrl);
      }
    });
  }

  ngOnInit(): void {
    this.skillService.getCostCenters().subscribe(data => {
      this.costCenters = data;
    });
    this.skillService.getBusinessUnits().subscribe(data => {
      this.businessUnits = data;
    });
  }

  getReport() {
    this.skillService.getCeReport(this.businessUnitId, this.costCenterId).subscribe(data => {
      console.log(data);
      if(data.length > 0) {
        this.ceReport = data;
        this.showTable = true;
      } else {
        this.showMsg = true;
      }
    });
  }
}

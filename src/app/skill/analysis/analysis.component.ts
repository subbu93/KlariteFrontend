import {Component, OnInit} from '@angular/core';
import {SkillServiceService} from '../../services/skill-service.service';
import {AppComponent} from '../../app.component';
import {NavigationEnd, Router} from '@angular/router';
import {AdminServiceService} from '../../services/admin-service.service';
import {Skill} from '../../model/skill';
import {User} from '../../model/user';
import {BusinessUnit} from '../../model/business-unit';
import {CostCenter} from '../../model/cost-center';
import {Episode} from '../../model/episode';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css', '../../app.component.css', '../../admin/admin.component.css']
})
export class AnalysisComponent implements OnInit {
  private navigationSubscription;
  row = [];
  displayedColumns: string[];
  dataSource = [];
  skills: Skill[];
  users: User[];
  businessUnitId: number;
  businessUnits: BusinessUnit[];
  costCenterId: number;
  costCenters: CostCenter[];
  analysisData: any;
  tableAnalysisData = [];
  showTable = false;
  consideredUsers: User[] = [];
  showMsg = false;
  showChart = false;
  selectedUser: User = new User();
  selectedSkill: Skill = new Skill();
  episodes: any[];

  single: any[] = [];

  view: any[] = [600, 300];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = '';
  showYAxisLabel = true;
  yAxisLabel = '';
  chartTitle: string;
  showEpisodeData = false;


  constructor(private skillService: SkillServiceService,
              private adminService: AdminServiceService,
              private appComponent: AppComponent,
              private router: Router) {

    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initialize the component
      if (e instanceof NavigationEnd && e.url === '/skill-analysis') {
        appComponent.previousUrl = appComponent.currentUrl;
        appComponent.currentUrl = e.url;
        appComponent.title = 'Skill - Analysis';
        console.log(appComponent.previousUrl);
      }
    });
    Object.assign(this, this.single);
  }

  ngOnInit(): void {
    this.skillService.getCostCenters().subscribe(data => {
      this.costCenters = data;
    });
    this.skillService.getBusinessUnits().subscribe(data => {
      this.businessUnits = data;
    });
    this.adminService.getAllSkills().subscribe(data => {
      this.skills = data;
    });
    this.adminService.getAllUsers().subscribe(data => {
      this.users = data;
    });
  }

  onCancel() {
    this.router.navigateByUrl(this.appComponent.previousUrl);
  }

  onGenerate() {
    this.showTable = false;
    this.skillService.getAnalysisData(this.costCenterId, this.businessUnitId).subscribe(data => {
      this.analysisData = data;
      if (Object.keys(data).length > 0) {
        this.showTable = true;
        this.showChart = false;
        this.showMsg = false;
        this.tableAnalysisData = [];
        this.filteredUser();
        this.generateTableData(data);
      }
    });
    if (!this.showTable) {
      this.showMsg = true;
    }
  }

  generateTableData(data: Object) {
    console.log(data);
    // console.log(Object.values(data));
    for (const user of this.consideredUsers) {
      const tempData = {
        id: undefined,
        name: undefined,
        skillData: undefined
      };
      const skillData = [];
      for (const skill of this.skills) {
        let skillDataVal = '';
        // @ts-ignore
        if (user.id in data && data[user.id].length > 0) {
          // @ts-ignore
          for (const skillDetails of data[user.id]) {
            if (skill.id == skillDetails.id && skill.totalThreshold <= skillDetails.episodeCount) {
              skillDataVal = 'Completed';
            } else if (skill.id == skillDetails.id && skillDetails.episodeCount > 0
              && skill.totalThreshold > skillDetails.episodeCount) {
              skillDataVal = 'In Progress';
            } else if (skill.id == skillDetails.id) {
              skillDataVal = 'Assigned';
            }
          }
          if (skillDataVal == '') {
            skillData.push('Not Assigned');
          } else {
            skillData.push(skillDataVal);
          }
        } else {
          skillData.push('Not Assigned');
        }
      }
      tempData.skillData = skillData;
      tempData.id = user.id;
      tempData.name = user.firstName + ' ' + user.lastName;
      this.tableAnalysisData.push(tempData);
    }
  }

  private filteredUser() {
    this.consideredUsers = [];
    for (const user of this.users) {
      if (user.businessUnitId == this.businessUnitId && user.costCenterId == this.costCenterId) {
        this.consideredUsers.push(user);
      }
    }
  }

  getSkillValue(skill: Skill) {
    console.log(skill);
    console.log(this.skills);
    this.selectedSkill = skill;

    this.skillService.getUsersPerSkillData(skill.id, this.businessUnitId, this.costCenterId).subscribe(
      data => {
        console.log(typeof data);
        this.single = data;
        this.xAxisLabel = 'User Names';
        this.yAxisLabel = 'Episode Count';
        this.chartTitle = 'Details of users for ' + skill.skillName;
        this.showChart = true;
        this.showTable = false;
        console.log(data);
      }
    );
    console.log(skill);
  }

  generateUserGraph(row: any) {
    this.selectedUser.id = row.id;
    const newSkills = this.analysisData[row.id];
    this.single = [];
    for (const skill of newSkills) {
      const temp = {
        name: undefined,
        value: undefined,
        extra: {threshold: undefined, skillId: undefined}
      };
      temp.name = skill.skillName;
      temp.value = skill.episodeCount;
      temp.extra.threshold = skill.threshold;
      temp.extra.skillId = skill.id;
      this.single.push(temp);
    }
    this.xAxisLabel = 'Skill Names';
    this.yAxisLabel = 'Episode Count';
    this.chartTitle = 'Details of skills for ' + row.name;
    this.showChart = true;
    this.showTable = false;
  }

  onBack() {
    if (this.showEpisodeData) {
      this.showChart = true;
      this.showTable = false;
    } else {
      this.showChart = false;
      this.showTable = true;
    }
    this.showEpisodeData = false;
  }

  onClickChart($event: any) {
    console.log($event);
    console.log(this.selectedUser.id);
    console.log(this.selectedSkill.id);

    if ($event.extra.userId == undefined) {
      this.selectedSkill.id = $event.extra.skillId;
    } else if ($event.extra.skillId == undefined) {
      this.selectedUser.id = $event.extra.userId;
    }
    this.skillService.getEpisodes(this.selectedUser.id, this.selectedSkill.id).subscribe(
      data => {
        console.log(data);
        // this.episodes = data;
        this.episodes = this.generateEpisodeChartData(data);
        this.showEpisodeData = true;
        this.showChart = false;
        this.showTable = false;
      }
    );
  }

  generateEpisodeChartData(data: any[]) {
    const returnValue = [];
    for (const val of data) {
      const temp = new Episode();
      temp.mrn = val.mrn;
      temp.date = val.date;
      for (const episode of val.episodes) {
        temp.comment = episode.comment;
        if (episode.observed) {
          const observer = this.users.find(e => e.id === episode.observerId);
          if (episode.validated == true) {
            temp.status = 'Episode has been Validated by ' +
              observer.firstName + ' ' + observer.lastName;
          } else if (episode.remediated == true) {
            temp.status = 'Episode has been remediated by ' +
              observer.firstName + ' ' + observer.lastName;
          } else {
            temp.status = 'Validation Pending';
          }
        } else {
          temp.status = 'N/A';
        }
        returnValue.push(temp);
      }
    }
    return returnValue;
  }
}

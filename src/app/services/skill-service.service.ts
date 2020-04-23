import {Injectable} from '@angular/core';
import {SkillAssignment} from '../model/skill-assignment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../model/user';
import {CostCenter} from '../model/cost-center';
import {BusinessUnit} from '../model/business-unit';
import {environment} from '../../environments/environment';
import {AuthenticationServiceService} from './authentication-service.service';

@Injectable({
  providedIn: 'root'
})
export class SkillServiceService {
  private getAllAssignmentsUrl: string;
  private deleteAssignmentsUrl: string;
  private getAllUsersUrl: string;
  private getCostCentersUrl: string;
  private addSkillAssignmentUrl: string;
  private getBusinessUnitsUrl: string;

  constructor(private http: HttpClient,
              private authenticationService: AuthenticationServiceService) {
    this.getAllAssignmentsUrl = `${environment.apiUrl}/assign_skill/get_all_assignments`;
    this.deleteAssignmentsUrl = `${environment.apiUrl}/assign_skill/delete_assigned_skill`;
    this.getAllUsersUrl = `${environment.apiUrl}/user_services/get_all_users`;
    this.getCostCentersUrl = `${environment.apiUrl}/assign_skill/get_cost_centers`;
    this.addSkillAssignmentUrl = `${environment.apiUrl}/assign_skill/add_skill_assignment`;
    this.getBusinessUnitsUrl = `${environment.apiUrl}/assign_skill/get_business_units`;
  }

  deleteAssignment(selected: SkillAssignment) {
    console.log(selected.assignmentId);
    const url = `${this.deleteAssignmentsUrl}?id=${selected.assignmentId}`;
    console.log(url);
    return this.http.delete(url);
  }

  public getAllAssignments() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        token: this.authenticationService.currentUserValue.token
      })
    };
    return this.http.get<SkillAssignment[]>(this.getAllAssignmentsUrl, httpOptions);
  }

  public getAllUSers() {
    return this.http.get<User[]>(this.getAllUsersUrl);
  }

  public getCostCenters() {
    return this.http.get<CostCenter[]>(this.getCostCentersUrl);
  }

  addSkillAssignment(assignment: SkillAssignment) {
    console.log(assignment);
    const headers = {'Content-Type': 'application/json'};
    return this.http.post(this.addSkillAssignmentUrl, assignment, {headers});
  }

  getBusinessUnits() {
    return this.http.get<BusinessUnit[]>(this.getBusinessUnitsUrl);
  }
}

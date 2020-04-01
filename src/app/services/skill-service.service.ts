import {Injectable} from '@angular/core';
import {SkillAssignment} from '../model/skill-assignment';
import {HttpClient} from '@angular/common/http';
import {User} from '../model/user';
import {CostCenter} from '../model/cost-center';
import {BusinessUnit} from '../model/business-unit';

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

  constructor(private http: HttpClient) {
    this.getAllAssignmentsUrl = 'http://localhost:8080/assign_skill/get_assigned_skills';
    this.deleteAssignmentsUrl = 'http://localhost:8080/assign_skill/delete_assigned_skill';
    this.getAllUsersUrl = 'http://localhost:8080/user_services/get_all_users';
    this.getCostCentersUrl = 'http://localhost:8080/assign_skill/get_cost_centers';
    this.addSkillAssignmentUrl = 'http://localhost:8080/assign_skill/add_skill_assignment';
    this.getBusinessUnitsUrl = 'http://localhost:8080/assign_skill/get_business_units';
  }

  deleteAssignment(selected: SkillAssignment) {
    console.log(selected.assignmentId);
    const url = `${this.deleteAssignmentsUrl}?id=${selected.assignmentId}`;
    console.log(url);
    return this.http.delete(url);
  }

  public getAllAssignments() {
    return this.http.get<SkillAssignment[]>(this.getAllAssignmentsUrl);
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

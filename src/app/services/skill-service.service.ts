import {Injectable} from '@angular/core';
import {SkillAssignment} from '../model/skill-assignment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../model/user';
import {CostCenter} from '../model/cost-center';
import {BusinessUnit} from '../model/business-unit';
import {environment} from '../../environments/environment';
import {AuthenticationServiceService} from './authentication-service.service';
import {Episode} from '../model/episode';

@Injectable({
  providedIn: 'root'
})
export class SkillServiceService {
  getAllAssignmentsUrl: string;
  deleteAssignmentsUrl: string;
  getAllUsersUrl: string;
  getCostCentersUrl: string;
  addSkillAssignmentUrl: string;
  getBusinessUnitsUrl: string;
  getAnalysisDataUrl: string;
  getUsersPerSkillDataUrl: string;
  getEpisodesUrl: string;
  getValidationDataUrl: string;
  saveValidationDataUrl: string;

  constructor(private http: HttpClient,
              private authenticationService: AuthenticationServiceService) {
    this.getAllAssignmentsUrl = `${environment.apiUrl}/assign_skill/get_all_assignments`;
    this.deleteAssignmentsUrl = `${environment.apiUrl}/assign_skill/delete_assigned_skill`;
    this.getAllUsersUrl = `${environment.apiUrl}/user_services/get_all_users`;
    this.getCostCentersUrl = `${environment.apiUrl}/assign_skill/get_cost_centers`;
    this.addSkillAssignmentUrl = `${environment.apiUrl}/assign_skill/add_skill_assignment`;
    this.getBusinessUnitsUrl = `${environment.apiUrl}/assign_skill/get_business_units`;
    this.getAnalysisDataUrl = `${environment.apiUrl}/skill/get-analysis-data`;
    this.getUsersPerSkillDataUrl = `${environment.apiUrl}/skill/get-users-per-skill-data`;
    this.getEpisodesUrl = `${environment.apiUrl}/skill/get_all_episodes`;
    this.getValidationDataUrl = `${environment.apiUrl}/skill/get-skill-validation`;
    this.saveValidationDataUrl = `${environment.apiUrl}/skill/store-skill-validation`;
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
        'Content-Type': 'application/json',
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

  getAnalysisData(costCenterId: number, businessUnitId: number) {
    const url = `${this.getAnalysisDataUrl}?businessUnitId=${businessUnitId}&costCenterId=${costCenterId}`;
    return this.http.get(url);
  }

  getUsersPerSkillData(id: number, businessUnitId: number, costCenterId: number) {
    const url = `${this.getUsersPerSkillDataUrl}?businessUnitId=${businessUnitId}&costCenterId=${costCenterId}&skillId=${id}`;
    return this.http.get<any[]>(url);
  }

  getEpisodes(userId: bigint, skillId: number) {
    const url = `${this.getEpisodesUrl}?userId=${userId}&skillId=${skillId}`;
    return this.http.get<Episode[]>(url);
  }

  getValidationData(id: bigint) {
    const url = `${this.getValidationDataUrl}?userId=${id}`;
    return this.http.get<any[]>(url);
  }

  saveValidationData(validationData: any[]) {
    const headers = {'Content-Type': 'application/json'};
    return this.http.post(this.saveValidationDataUrl, validationData, {headers});
  }
}

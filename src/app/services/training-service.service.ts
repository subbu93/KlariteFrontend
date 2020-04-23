import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SkillAssignment} from '../model/skill-assignment';
import {TrainingAssignment} from '../model/training-assignment';
import {User} from '../model/user';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrainingServiceService {
  getAllAssignmentsUrl: string;
  deleteAssignmentsUrl: string;
  addTrainingAssignmentUrl: string;
  getAttendanceListUrl: string;
  constructor(private http: HttpClient) {
    this.getAllAssignmentsUrl = `${environment.apiUrl}/assign_training/get_assigned_trainings`;
    this.deleteAssignmentsUrl = `${environment.apiUrl}/assign_training/delete_assigned_training`;
    this.addTrainingAssignmentUrl = `${environment.apiUrl}/assign_training/add_assigned_training`;
    this.getAttendanceListUrl = `${environment.apiUrl}/training/report`;
  }

  public getAllAssignments() {
    return this.http.get<TrainingAssignment[]>(this.getAllAssignmentsUrl);
  }

  deleteAssignment(selected: TrainingAssignment) {
    const url = `${this.deleteAssignmentsUrl}?id=${selected.assignmentId}`;
    return this.http.delete(url);
  }

  addTrainingAssignment(assignment: TrainingAssignment) {
    const headers = {'Content-Type': 'application/json'};
    return this.http.post(this.addTrainingAssignmentUrl, assignment, {headers});
  }

  getAttendanceList(id: any) {
    const url = `${this.getAttendanceListUrl}?id=${id}`;
    return this.http.get<User[]>(url);
  }
}

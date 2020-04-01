import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SkillAssignment} from '../model/skill-assignment';
import {TrainingAssignment} from '../model/training-assignment';

@Injectable({
  providedIn: 'root'
})
export class TrainingServiceService {
  getAllAssignmentsUrl: string;
  deleteAssignmentsUrl: string;
  addTrainingAssignmentUrl: string;
  constructor(private http: HttpClient) {
    this.getAllAssignmentsUrl = 'http://localhost:8080/assign_training/get_assigned_trainings';
    this.deleteAssignmentsUrl = 'http://localhost:8080/assign_training/delete_assigned_training';
    this.addTrainingAssignmentUrl = 'http://localhost:8080/assign_training/add_assigned_training';
  }

  public getAllAssignments() {
    return this.http.get<TrainingAssignment[]>(this.getAllAssignmentsUrl);
  }

  deleteAssignment(selected: TrainingAssignment) {
    console.log(selected.assignmentId);
    const url = `${this.deleteAssignmentsUrl}?id=${selected.assignmentId}`;
    console.log(url);
    return this.http.delete(url);
  }

  addTrainingAssignment(assignment: TrainingAssignment) {
    const headers = {'Content-Type': 'application/json'};
    return this.http.post(this.addTrainingAssignmentUrl, assignment, {headers});
  }
}

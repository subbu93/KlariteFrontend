import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Skill} from '../model/skill';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Training} from '../model/training';
import {User} from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class SkillServiceService {
  private getSkillsUrl: string;
  private getTrainingUrl: string;
  private addSkillUrl: string;
  private deleteSkillUrl: string;
  private deleteTrainingUrl: string;
  private addTrainingUrl: string;
  private getTrainersUrl: string;
  constructor(private http: HttpClient) {
    this.getSkillsUrl = 'http://localhost:8080/skill_admin/get_all_skills';
    this.getTrainingUrl = 'http://localhost:8080/skill_admin/get_all_trainings';
    this.addSkillUrl = 'http://localhost:8080/skill_admin/add_skill';
    this.deleteSkillUrl = 'http://localhost:8080/skill_admin/delete_skill';
    this.addTrainingUrl = '';
    this.deleteTrainingUrl = '';
    this.getTrainersUrl = 'http://localhost:8080/skill_admin/get_trainer';
  }
  public getAllSkills(): Observable<Skill[]> {
    return this.http.get<Skill[]>(this.getSkillsUrl);
  }

  public getAllTrainings(): Observable<Training[]> {
    return this.http.get<Training[]>(this.getTrainingUrl);
  }

  public addSkill(skill: Skill) {
    const headers = {'Content-Type':  'application/json'}
    return this.http.post<Skill>(this.addSkillUrl, skill, {headers});
  }

  public deleteSkill(selected: Skill) {
    const url = `${this.deleteSkillUrl}?id=${selected.id}`;
    return this.http.delete(url);
  }

  public deleteTraining(selected: Training) {
    const url = `${this.deleteTrainingUrl}?id=${selected.id}`;
    return this.http.delete(url);
  }

  public addTraining(training: Training) {
    const headers = {'Content-Type':  'application/json'}
    return this.http.post<Skill>(this.addTrainingUrl, training, {headers});
  }

  public getTrainers() {
    return this.http.get<User[]>(this.getTrainersUrl);
  }
}

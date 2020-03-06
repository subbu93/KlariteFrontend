import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Skill} from '../model/skill';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Training} from '../model/training';
import {User} from '../model/user';
import {ContactHours} from '../model/contact-hours';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {
  private getSkillsUrl: string;
  private getTrainingUrl: string;
  private addSkillUrl: string;
  private deleteSkillUrl: string;
  private deleteTrainingUrl: string;
  private addTrainingUrl: string;
  private getTrainersUrl: string;
  private addCeUrl: string;
  private getCeHour: string;
  constructor(private http: HttpClient) {
    this.getSkillsUrl = 'http://localhost:8080/skill_admin/get_all_skills';
    this.getTrainingUrl = 'http://localhost:8080/skill_admin/get_all_trainings';
    this.addSkillUrl = 'http://localhost:8080/skill_admin/add_skill';
    this.deleteSkillUrl = 'http://localhost:8080/skill_admin/delete_skill';
    this.addTrainingUrl = 'http://localhost:8080/skill_admin/add_training';
    this.deleteTrainingUrl = 'http://localhost:8080/skill_admin/delete_training';
    this.getTrainersUrl = 'http://localhost:8080/skill_admin/get_trainer';
    this.addCeUrl = 'http://localhost:8080/skill_admin/add_ce';
    this.getCeHour = 'http://localhost:8080/skill_admin/get_ce_hrs';
  }
  public getAllSkills(): Observable<Skill[]> {
    return this.http.get<Skill[]>(this.getSkillsUrl);
  }

  public getAllTrainings(): Observable<Training[]> {
    return this.http.get<Training[]>(this.getTrainingUrl);
  }

  public addSkill(skill: Skill) {
    const headers = {'Content-Type':  'application/json'};
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
    const headers = {'Content-Type':  'application/json'};
    return this.http.post<Skill>(this.addTrainingUrl, training, {headers});
  }

  public getTrainers() {
    return this.http.get<User[]>(this.getTrainersUrl);
  }

  public addCe(ce: ContactHours) {
    const headers = {'Content-Type':  'application/json'};
    return this.http.post<Skill>(this.addCeUrl, ce, {headers});
  }

  getCeHours(ce: ContactHours) {
    const url = `${this.getCeHour}?state=${ce.state}&title=${ce.userTitle}&pos=${ce.position}`;
    return this.http.get(url);
  }
}

import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Skill} from '../model/skill';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Training} from '../model/training';
import {User} from '../model/user';
import {ContactHours} from '../model/contact-hours';
import {environment} from '../../environments/environment';
import {AuthenticationServiceService} from './authentication-service.service';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {
  getSkillsUrl: string;
  getTrainingUrl: string;
  addSkillUrl: string;
  deleteSkillUrl: string;
  deleteTrainingUrl: string;
  addTrainingUrl: string;
  getTrainersUrl: string;
  addCeUrl: string;
  getCeHour: string;
  getUsersUrl: string;
  createUserUrl: string;
  deleteUserUrl: string;

  constructor(private http: HttpClient,
              private authenticationService: AuthenticationServiceService) {
    this.getSkillsUrl = `${environment.apiUrl}/skill_admin/get_all_skills`;
    this.getTrainingUrl = `${environment.apiUrl}/skill_admin/get_all_trainings`;
    this.addSkillUrl = `${environment.apiUrl}/skill_admin/add_skill`;
    this.deleteSkillUrl = `${environment.apiUrl}/skill_admin/delete_skill`;
    this.addTrainingUrl = `${environment.apiUrl}/skill_admin/add_training`;
    this.deleteTrainingUrl = `${environment.apiUrl}/skill_admin/delete_training`;
    this.getTrainersUrl = `${environment.apiUrl}/skill_admin/get_trainer`;
    this.addCeUrl = `${environment.apiUrl}/skill_admin/add_ce`;
    this.getCeHour = `${environment.apiUrl}/skill_admin/get_ce_hrs`;
    this.getUsersUrl = `${environment.apiUrl}/user_services/get_all_users`;
    this.createUserUrl = `${environment.apiUrl}/user_services/add_user`;
    this.deleteUserUrl = `${environment.apiUrl}/user_services/delete_user`;
  }

  public getAllSkills(): Observable<Skill[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        token: this.authenticationService.currentUserValue.token
      })
    };
    return this.http.get<Skill[]>(this.getSkillsUrl, httpOptions);
  }

  public getAllTrainings(): Observable<Training[]> {
    return this.http.get<Training[]>(this.getTrainingUrl);
  }

  public addSkill(skill: Skill) {
    const headers = {'Content-Type': 'application/json'};
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
    const headers = {'Content-Type': 'application/json'};
    return this.http.post<Skill>(this.addTrainingUrl, training, {headers});
  }

  public getTrainers() {
    return this.http.get<User[]>(this.getTrainersUrl);
  }

  public addCe(ce: ContactHours) {
    const headers = {'Content-Type': 'application/json'};
    return this.http.post<Skill>(this.addCeUrl, ce, {headers});
  }

  getCeHours(ce: ContactHours) {
    const url = `${this.getCeHour}?state=${ce.state}&title=${ce.userTitle}&pos=${ce.position}`;
    return this.http.get(url);
  }

  getAllUsers() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        token: this.authenticationService.currentUserValue.token
      })
    };
    return this.http.get<User[]>(this.getUsersUrl, httpOptions);
  }

  createUser(user: User) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        token: this.authenticationService.currentUserValue.token
      })
    };
    console.log(user);
    return this.http.post<User>(this.createUserUrl, user, httpOptions);
  }

  deleteUser(selectedUser: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        token: this.authenticationService.currentUserValue.token
      })
    };
    console.log(selectedUser);
    const url = `${this.deleteUserUrl}?id=${selectedUser.id}`;
    return this.http.delete(url, httpOptions);
  }
}

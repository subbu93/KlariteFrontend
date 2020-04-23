import { Injectable } from '@angular/core';
import {User} from '../model/user';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  loginUrl: string;
  logoutUrl: string;
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    this.loginUrl = `${environment.apiUrl}/login`;
    this.logoutUrl = `${environment.apiUrl}/logout`;
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<any>(this.loginUrl, { 'username': username, 'password' : password })
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          console.log((this.currentUserValue));
        }

        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        token: this.currentUserSubject.value.token
      })
    };
    console.log(this.currentUserSubject.value);
    this.currentUserSubject.next(null);
    return this.http.post<any>(this.logoutUrl, {data: 'logout'}, httpOptions);
  }
}

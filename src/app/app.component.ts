import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {AuthenticationServiceService} from './services/authentication-service.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Roles} from './model/roles.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  public title: string;
  navbarOpen = false;
  navigationSubscription;
  public previousUrl: string = undefined;
  public currentUrl: string = undefined;
  login = true;
  displayUserName: string;
  showAssignment = true;
  showAdmin = true;
  showValidation = true;

  constructor(private router: Router,
              private authenticationService: AuthenticationServiceService) {
    this.currentUrl = this.router.url;
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initialize the component
      if (e instanceof NavigationEnd && e.url === '/home') {
        // console.log()
        this.initializeInvites();
        this.previousUrl = this.currentUrl;
        this.currentUrl = e.url;
      }
    });
  }

  initializeInvites() {
    this.title = 'DASHBOARD';
  }

  ngOnInit(): void {
    this.title = 'DASHBOARD';
    this.displayUserName = this.authenticationService.currentUserValue.firstName;
    this.showAssignment = this.checkAssignmentPrivileges();
    this.showAdmin = this.checkAdminPrivileges();
    console.log(this.authenticationService.currentUserValue);
  }

  ngOnDestroy(): void {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  logout() {
    this.authenticationService.logout().subscribe(
      (val) => {
        console.log(val);
      },
      (response: HttpErrorResponse) => {
        console.log(response);
        if (response.status === 200) {
          localStorage.removeItem('currentUser');
        }
      });
    ;
    this.router.navigateByUrl('/login');
    this.login = false;
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  private checkAssignmentPrivileges() {
    if (this.authenticationService.currentUserValue.role == Roles.SiteAdministrator ||
      this.authenticationService.currentUserValue.role == Roles.Supervisor ||
      this.authenticationService.currentUserValue.role == Roles.SuperUser) {
      return true;
    }
    return false;
  }

  private checkAdminPrivileges() {
    if (this.authenticationService.currentUserValue.role == Roles.SiteAdministrator ||
      this.authenticationService.currentUserValue.role == Roles.Supervisor) {
      return true;
    }
    return false;
  }
}

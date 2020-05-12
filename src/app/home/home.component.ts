import {Component, OnInit} from '@angular/core';
import {AppComponent} from '../app.component';
import {NavigationEnd, Router} from '@angular/router';
import {AuthenticationServiceService} from '../services/authentication-service.service';
import {Roles} from '../model/roles.enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../app.component.css']
})
export class HomeComponent implements OnInit {
  navigationSubscription;
  firstText: string;
  secondText: string;
  secondRouteLink: any;
  firstRouteLink: any;

  constructor(private appComponent: AppComponent,
              private authenticationService: AuthenticationServiceService,
              private router: Router) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initialize the component
      if (e instanceof NavigationEnd && e.url === '/home' || e.url === '/') {
        appComponent.previousUrl = appComponent.currentUrl;
        appComponent.currentUrl = e.url;
        appComponent.title = 'DASHBOARD';
        console.log(appComponent.previousUrl);
        appComponent.login = true;
      }
    });
  }

  ngOnInit(): void {
    const currentUserRole = this.authenticationService.currentUserValue.role;
    if (currentUserRole == Roles.Supervisor || currentUserRole == Roles.SiteAdministrator) {
      this.firstText = 'Assign a Skill';
      this.secondText = 'Assign a Training';
      this.firstRouteLink = '/skill-assignment';
      this.secondRouteLink = '/training-assignment';
    } else {
      this.firstText = 'Analyze Skills';
      this.secondText = 'Training Report';
      this.firstRouteLink = '/skill-analysis';
      this.secondRouteLink = '/training-report';
    }
  }

}

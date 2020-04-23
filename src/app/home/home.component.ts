import {Component, OnInit} from '@angular/core';
import {AppComponent} from '../app.component';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../app.component.css']
})
export class HomeComponent implements OnInit {
  navigationSubscription;

  constructor(private appComponent: AppComponent,
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
  }

}

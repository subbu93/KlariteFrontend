import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  public title: string;
  navbarOpen = false;
  navigationSubscription;
  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
  constructor(private router: Router) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initialize the component
      if (e instanceof NavigationEnd && e.url === '/home') {
        this.initialiseInvites();
      }
    });
  }
  initialiseInvites() {
    this.title = 'DASHBOARD';
  }

  ngOnInit(): void {
    this.title = 'DASHBOARD';
  }

  ngOnDestroy(): void {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }
}

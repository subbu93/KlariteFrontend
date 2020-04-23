import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {AuthenticationServiceService} from '../services/authentication-service.service';
import {first} from 'rxjs/operators';
import {Md5} from 'ts-md5';
import {ToastrService} from 'ngx-toastr';
import {AppComponent} from '../app.component';
import {Roles} from '../model/roles.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  navigationSubscription;

  constructor(private formBuilder: FormBuilder,
              private appComponent: AppComponent,
              private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationServiceService,
              private toastr: ToastrService) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
    appComponent.login = false;
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initialize the component
      if (e instanceof NavigationEnd && e.url === '/login') {
        appComponent.previousUrl = appComponent.currentUrl;
        appComponent.currentUrl = e.url;
        // console.log(appComponent.previousUrl);
      }
    });
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.username.value, Md5.hashStr(this.f.password.value).toString())
      .pipe(first())
      .subscribe(
        data => {
          console.log(this.returnUrl);
          this.appComponent.displayUserName = this.authenticationService.currentUserValue.firstName;
          this.appComponent.showAdmin = this.checkAdminPrivileges();
          this.appComponent.showAssignment = this.checkAssignmentPrivileges();
          this.router.navigate([this.returnUrl]);
        },
        error => {
          if (error.status === 401) {
            this.toastr.error('Invalid username or password');
          } else {
            this.toastr.error('Error while login. Please try later');
          }
          this.loading = false;
        });
  }

  checkAssignmentPrivileges() {
    if (this.authenticationService.currentUserValue.role == Roles.SiteAdministrator ||
      this.authenticationService.currentUserValue.role == Roles.Supervisor ||
      this.authenticationService.currentUserValue.role == Roles.SuperUser) {
      return true;
    }
    return false;
  }

  checkAdminPrivileges() {
    if (this.authenticationService.currentUserValue.role == Roles.SiteAdministrator ||
      this.authenticationService.currentUserValue.role == Roles.Supervisor) {
      return true;
    }
    return false;
  }
}

import { Component, OnInit } from '@angular/core';
import {User} from '../../../model/user';
import {AdminServiceService} from '../../../services/admin-service.service';
import {AppComponent} from '../../../app.component';
import {NavigationEnd, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {AuthenticationServiceService} from '../../../services/authentication-service.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css', '../../../app.component.css', '../../admin.component.css']
})
export class AdminUsersComponent implements OnInit {
  users: User[];
  private navigationSubscription;
  selectedUser: any;
  filteredItems: User[];

  constructor(private adminService: AdminServiceService,
              private appComponent: AppComponent,
              private router: Router,
              private toastr: ToastrService,
              private authService: AuthenticationServiceService) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initialize the component
      // console.log(appComponent.previousUrl);
      if (e instanceof NavigationEnd && e.url === '/admin-users' && appComponent.previousUrl !== '/admin-users') {
        appComponent.previousUrl = appComponent.currentUrl;
        appComponent.currentUrl = e.url;
        appComponent.title = 'Admin - Users';
        console.log(appComponent.previousUrl);
      }
    });

    this.adminService.getAllUsers().subscribe(data => {
      this.users = data;
      this.filteredItems = Object.assign([], data);
    });
  }

  ngOnInit(): void {
    this.assignCopy();
  }

  assignCopy() {
    // console.log(this.users);
    this.filteredItems = Object.assign([], this.users);
  }

  searchAttended(value: any) {
    if (!value) {
      this.assignCopy();
    } // when nothing has typed
    this.filteredItems = Object.assign([], this.users).filter(
      item => item.firstName.toLowerCase().indexOf(value.toLowerCase()) > -1
    );
  }

  onDelete() {
  //  Call to delete User
  }

  onEdit() {
  //  Edit user
    if (this.selectedUser) {
      console.log('selected');
      this.router.navigateByUrl('/admin-users-add', {state: {data: this.selectedUser[0]}});
    } else {
      this.toastr.error('Select a user to edit');
    }
  }

  onAdd() {
  //  Add a new User
    this.router.navigateByUrl('/admin-users-add');
  }
}

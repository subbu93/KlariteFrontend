import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AdminSkillComponent} from './admin/skill/home/admin-skill.component';
import {AdminSkillAddComponent} from './admin/skill/add/admin-skill-add.component';
import {AdminTrainingComponent} from './admin/training/home/admin-training.component';
import {AdminTrainingAddComponent} from './admin/training/add/admin-training-add.component';
import {ContactHoursComponent} from './admin/contact-hours/contact-hours.component';
import {SkillAssignmentComponent} from './skill/assignemnt/home/skill-assignment.component';
import {SkillAssignmentAddComponent} from './skill/assignemnt/add/skill-assignment-add.component';
import {TrainingAssignmentComponent} from './training/assignment/home/training-assignment.component';
import {TrainingAssignmentAddComponent} from './training/assignment/add/training-assignment-add.component';
import {TrainingReportComponent} from './training/report/training-report.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './_gaurds/auth.gaurd';
import {AdminUsersComponent} from './admin/User/home/admin-users.component';
import {AdminUsersAddComponent} from './admin/User/add/admin-users-add.component';
import {Roles} from './model/roles.enum';
import {AnalysisComponent} from './skill/analysis/analysis.component';
import {ValidationComponent} from './skill/validation/validation.component';
import {ReportComponent} from './Certification/report/report.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent,
    canActivate: [AuthGuard], data: {roles: [Roles.Supervisor, Roles.SiteAdministrator, Roles.SuperUser, Roles.Nurse]}},
  {
    path: 'admin-skill', component: AdminSkillComponent,
    canActivate: [AuthGuard], data: {roles: [Roles.Supervisor, Roles.SiteAdministrator]}
  },
  {
    path: 'admin-skill-add', component: AdminSkillAddComponent,
    canActivate: [AuthGuard], data: {roles: [Roles.Supervisor, Roles.SiteAdministrator]}
  },
  {
    path: 'admin-training', component: AdminTrainingComponent,
    canActivate: [AuthGuard], data: {roles: [Roles.Supervisor, Roles.SiteAdministrator]}
  },
  {
    path: 'admin-training-add', component: AdminTrainingAddComponent,
    canActivate: [AuthGuard], data: {roles: [Roles.Supervisor, Roles.SiteAdministrator]}
  },
  {
    path: 'admin-ce', component: ContactHoursComponent,
    canActivate: [AuthGuard], data: {roles: [Roles.Supervisor, Roles.SiteAdministrator]}
  },
  {
    path: 'admin-users', component: AdminUsersComponent,
    canActivate: [AuthGuard], data: {roles: [Roles.Supervisor, Roles.SiteAdministrator]}
  },
  {
    path: 'admin-users-add', component: AdminUsersAddComponent,
    canActivate: [AuthGuard], data: {roles: [Roles.Supervisor, Roles.SiteAdministrator]}
  },
  {
    path: 'skill-assignment', component: SkillAssignmentComponent,
    canActivate: [AuthGuard], data: {roles: [Roles.Supervisor, Roles.SiteAdministrator, Roles.SuperUser]}
  },
  {
    path: 'skill-assignment-add', component: SkillAssignmentAddComponent,
    canActivate: [AuthGuard], data: {roles: [Roles.Supervisor, Roles.SiteAdministrator, Roles.SuperUser]}
  },
  {
    path: 'training-assignment', component: TrainingAssignmentComponent,
    canActivate: [AuthGuard], data: {roles: [Roles.Supervisor, Roles.SiteAdministrator, Roles.SuperUser]}
  },
  {
    path: 'training-assignment-add', component: TrainingAssignmentAddComponent,
    canActivate: [AuthGuard], data: {roles: [Roles.Supervisor, Roles.SiteAdministrator, Roles.SuperUser]}
  },
  {
    path: 'training-report', component: TrainingReportComponent,
    canActivate: [AuthGuard], data: {roles: [Roles.Supervisor, Roles.SiteAdministrator, Roles.SuperUser, Roles.Nurse]}
  },
  {
    path: 'skill-analysis', component: AnalysisComponent,
    canActivate: [AuthGuard], data: {roles: [Roles.Supervisor, Roles.SiteAdministrator, Roles.SuperUser, Roles.Nurse]}
  },
  {
    path: 'skill-validation', component: ValidationComponent,
    canActivate: [AuthGuard], data: {roles: [Roles.Supervisor, Roles.SiteAdministrator]}
  },
  {
    path: 'certification-report', component: ReportComponent,
    canActivate: [AuthGuard], data: {roles: [Roles.Supervisor, Roles.SiteAdministrator, Roles.SuperUser, Roles.Nurse]}
  },
  {path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

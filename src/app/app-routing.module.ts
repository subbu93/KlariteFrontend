import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
// import { AboutComponent } from './about/about.component';
// import {NameListComponent} from './name-list/name-list.component';
import {AdminSkillComponent} from './admin/skill/home/admin-skill.component';
import {AdminSkillAddComponent} from './admin/skill/add/admin-skill-add.component';
import {AdminTrainingComponent} from './admin/training/home/admin-training.component';
import {AdminTrainingAddComponent} from './admin/training/add/admin-training-add.component';
import {ContactHoursComponent} from './admin/contact-hours/contact-hours.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'admin-skill', component: AdminSkillComponent},
  {path: 'admin-skill-add', component: AdminSkillAddComponent},
  {path: 'admin-training', component: AdminTrainingComponent},
  {path: 'admin-training-add', component: AdminTrainingAddComponent},
  {path: 'admin-ce', component: ContactHoursComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

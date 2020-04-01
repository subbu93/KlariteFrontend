import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AdminSkillComponent} from './admin/skill/home/admin-skill.component';
import {AdminSkillAddComponent} from './admin/skill/add/admin-skill-add.component';
import {AdminTrainingComponent} from './admin/training/home/admin-training.component';
import {AdminTrainingAddComponent} from './admin/training/add/admin-training-add.component';
import {ContactHoursComponent} from './admin/contact-hours/contact-hours.component';
import {SkillAssignmentComponent} from './skill/assignemnt/skill-assignment/home/skill-assignment.component';
import {SkillAssignmentAddComponent} from './skill/assignemnt/skill-assignment/add/skill-assignment-add.component';
import {TrainingAssignmentComponent} from './training/assignment/training-assignment/home/training-assignment.component';
import {TrainingAssignmentAddComponent} from './training/assignment/training-assignment/add/training-assignment-add.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'admin-skill', component: AdminSkillComponent},
  { path: 'admin-skill-add', component: AdminSkillAddComponent},
  { path: 'admin-training', component: AdminTrainingComponent},
  { path: 'admin-training-add', component: AdminTrainingAddComponent},
  { path: 'admin-ce', component: ContactHoursComponent},
  { path: 'skill-assignment', component: SkillAssignmentComponent},
  { path: 'skill-assignment-add', component: SkillAssignmentAddComponent},
  { path: 'training-assignment', component: TrainingAssignmentComponent},
  { path: 'training-assignment-add', component: TrainingAssignmentAddComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

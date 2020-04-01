import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HomeComponent} from './home/home.component';
import {HttpClientModule} from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AdminSkillComponent} from './admin/skill/home/admin-skill.component';
import {AdminSkillAddComponent} from './admin/skill/add/admin-skill-add.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {AdminTrainingComponent} from './admin/training/home/admin-training.component';
import {AdminTrainingAddComponent} from './admin/training/add/admin-training-add.component';
import {ContactHoursComponent} from './admin/contact-hours/contact-hours.component';
import {SkillAssignmentComponent} from './skill/assignemnt/skill-assignment/home/skill-assignment.component';
import {SkillAssignmentAddComponent} from './skill/assignemnt/skill-assignment/add/skill-assignment-add.component';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import { TrainingAssignmentComponent } from './training/assignment/training-assignment/home/training-assignment.component';
import { TrainingAssignmentAddComponent } from './training/assignment/training-assignment/add/training-assignment-add.component';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminSkillComponent,
    AdminSkillAddComponent,
    AdminTrainingComponent,
    AdminTrainingAddComponent,
    ContactHoursComponent,
    SkillAssignmentComponent,
    SkillAssignmentAddComponent,
    TrainingAssignmentComponent,
    TrainingAssignmentAddComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgMultiSelectDropDownModule,
    ReactiveFormsModule,
    QRCodeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

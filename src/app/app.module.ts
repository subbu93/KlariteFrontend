import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminSkillComponent } from './admin/skill/home/admin-skill.component';
import { AdminSkillAddComponent } from './admin/skill/add/admin-skill-add.component';
import {FormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AdminTrainingComponent } from './admin/training/home/admin-training.component';
import { AdminTrainingAddComponent } from './admin/training/add/admin-training-add.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminSkillComponent,
    AdminSkillAddComponent,
    AdminTrainingComponent,
    AdminTrainingAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

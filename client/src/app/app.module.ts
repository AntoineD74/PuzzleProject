//Imports globaux
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditorModule, SharedModule,
  GrowlModule, AccordionModule,
  MultiSelectModule, SelectButtonModule,
  AutoCompleteModule } from 'primeng/primeng';

//Imports des composants perso
import { AppRoutingModule }     from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProjectsComponent } from './projects/projects.component';
import { SigninComponent } from './signin/signin.component';
import { ContactComponent } from './contact/contact.component';
import { SignupComponent } from './signup/signup.component';
import { ProjectCreateComponent } from './project-create/project-create.component';
import { ProjectOverviewComponent } from './project-overview/project-overview.component';
import { ActusComponent } from './actus/actus.component';
import { ActuOverviewComponent } from './actu-overview/actu-overview.component';
import { ActuCreateComponent } from './actu-create/actu-create.component';

import { AuthenticationService } from './authentication.service';
import { UsersService } from './users.service';
import { GrowlMessagesService } from './growl-messages.service';
import { AdminService } from './admin.service';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminAssociationsComponent } from './admin-associations/admin-associations.component';
import { FailedAuthComponent } from './failed-auth/failed-auth.component';
import { AssociationCreateComponent } from './association-create/association-create.component';
import { ComfirmDialogComponent } from './comfirm-dialog/comfirm-dialog.component';
import { AddAssMemberDialogComponent } from './add-ass-member-dialog/add-ass-member-dialog.component';


//Déclaration du module
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProjectsComponent,
    SigninComponent,
    ContactComponent,
    SignupComponent,
    ProjectCreateComponent,
    ProjectOverviewComponent,
    ActusComponent,
    ActuOverviewComponent,
    ActuCreateComponent,
    MyProfileComponent,
    ChangePasswordComponent,
    AdminUsersComponent,
    AdminAssociationsComponent,
    FailedAuthComponent,
    AssociationCreateComponent,
    ComfirmDialogComponent,
    AddAssMemberDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    EditorModule,
    SharedModule,
    GrowlModule,
    AccordionModule,
    MultiSelectModule,
    SelectButtonModule,
    AutoCompleteModule
  ],
  providers: [
    AuthenticationService,
    UsersService,
    GrowlMessagesService,
    AdminService
  ],
  entryComponents : [
    ComfirmDialogComponent,
    AddAssMemberDialogComponent
  ],
  bootstrap: [AppComponent]
})

//Export du module
export class AppModule { }

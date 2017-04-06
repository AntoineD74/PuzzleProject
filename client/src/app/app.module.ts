//Imports globaux
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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
    ActuCreateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})

//Export du module
export class AppModule { }

//Imports nécessaires
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Imports des composants persos
import { HomeComponent } from './home/home.component';
import { ProjectsComponent } from './projects/projects.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ContactComponent } from './contact/contact.component';
import { ActusComponent } from './actus/actus.component';
import { ProjectCreateComponent } from './project-create/project-create.component';
import { ProjectOverviewComponent } from './project-overview/project-overview.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminAssociationsComponent } from './admin-associations/admin-associations.component';
import { FailedAuthComponent } from './failed-auth/failed-auth.component';
import { AssociationCreateComponent } from './association-create/association-create.component';
import { AssociationsComponent } from './associations/associations.component';
import { AssociationOverviewComponent } from './association-overview/association-overview.component';

//Gestion des routes et des redirections
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'project-create', component: ProjectCreateComponent },
  { path: 'project-overview/:id', component: ProjectOverviewComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'actus', component: ActusComponent },
  { path: 'my-profile', component: MyProfileComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'admin-users', component: AdminUsersComponent },
  { path: 'admin-associations', component: AdminAssociationsComponent },
  { path: 'associations', component: AssociationsComponent },
  { path: 'association-overview/:id', component: AssociationsComponent },
  { path: 'association-create', component: AssociationCreateComponent },
  { path: 'failed-auth', component: FailedAuthComponent }
];

//Déclaration du module de routing
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

//Export du module
export class AppRoutingModule {}

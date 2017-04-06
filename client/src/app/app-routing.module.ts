//Imports nécessaires
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Imports des composants persos
import { HomeComponent } from './home/home.component';
import { ProjectsComponent } from './projects/projects.component';
import { SigninComponent } from './signin/signin.component';
import { ContactComponent } from './contact/contact.component';

//Gestion des routes et des redirections
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'contact', component: ContactComponent }
];

//Déclaration du module de routing
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

//Export du module
export class AppRoutingModule {}

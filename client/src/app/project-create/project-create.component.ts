import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../authentication.service';
import { ProjectsService } from '../projects.service';
import { GrowlMessagesService } from '../growl-messages.service';
import { Project } from '../project';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.css']
})

export class ProjectCreateComponent implements OnInit {

  constructor(
    private AuthService: AuthenticationService,
    private GrowlService: GrowlMessagesService,
    private ProjService: ProjectsService,
    private router: Router
  ) { }

  project : Project = new Project();

  associations = [];

  text:string;

  ngOnInit() {
    this.associations = this.AuthService.getAssos();
    this.AuthService.checkAuth(this.associations.length > 0);
  }

  onSubmit(){
    let that = this;
    this.ProjService.createProject(this.project)
      .subscribe(
        function(response){
          that.GrowlService.pushMessage({severity:'success',summary:'Projet créé', detail:''});
          that.router.navigate(['/home'])
        },
        function(error){
          that.GrowlService.pushMessage({severity:'error',summary:'Erreur lors de la création du projet', detail:''});
        }
      )
  }

}

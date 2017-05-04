import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../authentication.service';
import { ProjectsService } from '../projects.service';
import { GrowlMessagesService } from '../growl-messages.service';

@Component({
  moduleId: module.id,
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  constructor(
    private AuthService: AuthenticationService,
    private GrowlService: GrowlMessagesService,
    private ProjService: ProjectsService
  ) { }

  projects = [];
  filteredProjects = [];

  titleFilter = "";

  ngOnInit() {
    let that = this;
    console.log("Getting projects");
    this.ProjService.listProjects()
      .subscribe(
        function(response){
          console.log("Getting projects response");
          console.log(response);
          that.projects = response.json().projects;
          that.filter();
        },
        function(error){
          console.log("Getting projects error");
          console.log(error);
          that.GrowlService.pushMessage({severity:'error',summary:'Erreur lors du chargement des projets', detail:''});
        }
      )
  }

  filter(){
    this.filteredProjects = [];
    for(let i in this.projects){
      if(this.projects[i].title.match(this.titleFilter)){
        this.filteredProjects.push(this.projects[i]);
      }
    }
  }

  resetFilter(){
    this.titleFilter = "";
    this.filter();
  }

}

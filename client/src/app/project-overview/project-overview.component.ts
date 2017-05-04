import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectsService } from '../projects.service';
import { GrowlMessagesService } from '../growl-messages.service';

@Component({
  moduleId: module.id,
  selector: 'app-project-overview',
  templateUrl: './project-overview.component.html',
  styleUrls: ['./project-overview.component.css']
})
export class ProjectOverviewComponent implements OnInit {

  id: number;
  private sub: any;

  project:any = {};

  constructor(
    private GrowlService: GrowlMessagesService,
    private ProjService: ProjectsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = +params['id']; // (+) converts string 'id' to a number
       this.getProject(this.id);
       // In a real app: dispatch action to load the details here.
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getProject(id){
    let that = this;
    this.ProjService.getProject(id)
      .subscribe(
        function(response){
          console.log()
          that.project = response.json();
          console.log(that.project);
          console.log(that.project.association);
        },
        function(error){

        }
      )
  }

  standby(image) {
      image.src = 'https://www.mautic.org/media/images/default_avatar.png'
  }

}

import { Component, OnInit } from '@angular/core';

import { GrowlMessagesService } from '../growl-messages.service';
import { AssociationsService } from '../associations.service';

@Component({
  moduleId: module.id,
  selector: 'app-associations',
  templateUrl: './associations.component.html',
  styleUrls: ['./associations.component.css']
})
export class AssociationsComponent implements OnInit {

  constructor(
    private AssosService :AssociationsService,
    private GrowlService : GrowlMessagesService
  ) { }

  assos = [];
  filteredAssos = [];
  nameFilter = "";

  ngOnInit() {
    this.getAssos();
  }

  getAssos(){
    let that = this;
    this.AssosService.getAssos()
      .subscribe(
        function(response){
          console.log(response);
          that.assos = response.json();
          that.filter();
        },
        function(error){
          console.log(error);
          that.GrowlService.pushMessage({severity:'error',summary:'Erreur lors du chargement des associations', detail:''});
        }
      );
  }

  filter(){
    this.filteredAssos = [];
    for(let i in this.assos){
      if(this.assos[i].name.match(this.nameFilter)){
        this.filteredAssos.push(this.assos[i]);
      }
    }
  }

  resetFilter(){
    this.nameFilter = "";
    this.filter();
  }

  standby(image) {
      image.src = 'https://www.mautic.org/media/images/default_avatar.png'
  }

}

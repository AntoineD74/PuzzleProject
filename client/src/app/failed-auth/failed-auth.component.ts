import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { GrowlMessagesService } from '../growl-messages.service';

@Component({
  moduleId: module.id,
  selector: 'app-failed-auth',
  templateUrl: './failed-auth.component.html',
  styleUrls: ['./failed-auth.component.css']
})
export class FailedAuthComponent implements OnInit {

  constructor(
    private GrowlService:GrowlMessagesService,
    private location: Location
  ) { }

  ngOnInit() {
    this.GrowlService.pushMessage({severity:'error', summary:'Autorisation requise', detail:'Une autorisation est requise pour accéder à la page demandée'});
  }

  goBack(){
    this.location.back();
  }

}

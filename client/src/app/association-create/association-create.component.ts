import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../authentication.service';
import { GrowlMessagesService } from '../growl-messages.service';
import { AdminService } from '../admin.service';

@Component({
  moduleId: module.id,
  selector: 'app-association-create',
  templateUrl: './association-create.component.html',
  styleUrls: ['./association-create.component.css']
})
export class AssociationCreateComponent implements OnInit {

  constructor(
    private AuthService:AuthenticationService,
    private GrowlService:GrowlMessagesService,
    private AdminService:AdminService,
    private router: Router
  ) { }

  ngOnInit() {
    console.log("Association Create Init");
    console.log("Admin : "+this.AuthService.isAdmin());
    let that = this;
    if(this.AuthService.checkAuth(this.AuthService.isAdmin())){

    }
  }

  asso = {};

  onSubmit(){
    let that = this;
    this.AdminService.createAsso(this.asso)
      .subscribe(
        function(response){
          console.log(response);
          that.GrowlService.pushMessage({severity:'success',summary:'Association créée', detail:''});
          that.router.navigate(['/admin-associations']);
        },
        function(error){
          console.log(error);
          that.GrowlService.pushMessage({severity:'error',summary:'La création a échouée', detail:''});
        }
      )
  }
}

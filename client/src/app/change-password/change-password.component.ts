import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { AuthenticationService } from '../authentication.service';
import { UsersService } from '../users.service';
import { GrowlMessagesService } from '../growl-messages.service';

@Component({
  moduleId: module.id,
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  oldpassword:string = "";
  newpassword:string = "";

  constructor(
    private AuthService:AuthenticationService,
    private UsersService: UsersService,
    private GrowlService:GrowlMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.AuthService.checkAuth(this.AuthService.isLoggedIn())
  }

  onSubmit(){
    let that = this;
    this.UsersService.changePassword(this.oldpassword, this.newpassword)
      .subscribe(
        function(response){
          that.GrowlService.pushMessage({severity:'success','summary':'Mot de passe mis à jour',detail:''});
          that.router.navigate(['/my-profile']);
        },
        function(error){
          that.GrowlService.pushMessage({severity:'error','summary':'Mot de passe non mis à jour',detail:'Ancien mot de passe incorrect ou serveur non connecté'});
        }
      )
  }

}

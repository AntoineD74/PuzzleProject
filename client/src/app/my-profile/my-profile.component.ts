import { Component, OnInit } from '@angular/core';

import { User } from '../user';

import { AuthenticationService } from '../authentication.service';
import { UsersService } from '../users.service';
import { GrowlMessagesService } from '../growl-messages.service';

@Component({
  moduleId: module.id,
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  user = {};


  usernameExists = false;
  emailExists = false;

  constructor(
    private AuthService:AuthenticationService,
    private UsersService : UsersService,
    private GrowlService:GrowlMessagesService
  ) {
  }

  ngOnInit() {
    let that = this;
    if(this.AuthService.checkAuth(this.AuthService.isLoggedIn())){
      this.UsersService.getProfile()
        .subscribe(
          function(response){
            that.user = response.json();
          },
          function(error){
            console.log(error);
          }
        );
    }


  }

  onSubmit(){
    let that = this;
    this.UsersService.updateProfile(this.user)
      .subscribe(
        function(response){
          console.log(response);
          that.GrowlService.pushMessage({severity:'success', summary:'Profil mis à jour !', detail:'Vos données ont été sauvegardées'});
        },
        function(error){
          console.log(error);
        }
      );
  }

}

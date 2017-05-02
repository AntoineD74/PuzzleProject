import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../user';

import { AuthenticationService } from '../authentication.service';
import { GrowlMessagesService } from '../growl-messages.service';

@Component({
  moduleId: module.id,
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user : User = new User();

  usernameExists = false;
  emailExists = false;

  constructor(
    private AuthServive:AuthenticationService,
    private GrowlService:GrowlMessagesService,
    private router: Router
  ) { }

  ngOnInit() {

  }

  onSubmit(){
    let that = this;
    console.log("Submitting new user");
    console.log(this.user);
    this.emailExists = false;
    this.usernameExists = false;
    this.AuthServive.register(this.user)
      .subscribe(
        function(response){
          console.log("New user response");
          console.log(response.json());
          that.GrowlService.pushMessage({severity:'success', summary:'Compte créé', detail:'Votre compte a été créé, connectez-vous !'});
          that.router.navigate(['/signin']);
        },
        function(error){
          console.log("New user error");
          error = error.json().error;
          console.log(error);
          if(error.details.codes.email[0]=="uniqueness"){
            console.log("Email exists");
            that.emailExists = true;
          }
          if(error.details.codes.username[0]=="uniqueness"){
            console.log("Username exists");
            that.usernameExists = true;
          }
        }
      )
  }



}

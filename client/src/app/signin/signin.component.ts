import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { AuthenticationService } from '../authentication.service';
import { GrowlMessagesService } from '../growl-messages.service';

@Component({
  moduleId: module.id,
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  email:string="";
  password:string="";

  constructor(
    private AuthServive:AuthenticationService,
    private GrowlService:GrowlMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit(){
    let that = this;
    console.log("Submitting login");
    this.AuthServive.login(this.email, this.password)
      .subscribe(
        function(response){
          console.log("Login response");
          console.log(response);
          that.GrowlService.pushMessage({severity:'success', summary:'Connexion réussie', detail:'Vous êtes maintenant connecté !'});
          that.router.navigate(['/home']);
        },
        function(error){
          console.log("Login error");
          console.log(error);
          that.GrowlService.pushMessage({severity:'error', summary:'Connexion echouée', detail:"La connexion a echouée, vérifiez l'email/mot de passe"});
        }
      )
  }

}

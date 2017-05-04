import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from './authentication.service';
import { GrowlMessagesService } from './growl-messages.service';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';

  msgs = [];

  roles = [];
  associations = [];

  username = "";

  isLoggedIn = false;

  admin = false;
  moderator = false;

  constructor(
    private AuthService: AuthenticationService,
    private GrowlService: GrowlMessagesService
  )
  {
    let that = this;
    GrowlService.pushMessageEvent.subscribe((msg) => {
      console.log("Push message event fired");
      this.pushMessage(msg);
    });

    AuthService.loggedEvent.subscribe((val) => {
        // see also
        console.log("Log in event fired");
        console.log(val);
        this.getUserInfo(val);
    });
  }

  pushMessage(msg){
    console.log(msg);
    //this.msgs.push({"severity":msg.severity, "summary":msg.summary, "detail":msg.detail});
    this.msgs = [];
    this.msgs.push({severity : msg.severity, summary : msg.summary, detail : msg.detail});
    console.log(this.msgs);
  }

  ngOnInit(){
    this.getUserInfo(undefined);
  }

  getUserInfo(user){
    console.log("Updating User Info");
    console.log(user);
    if(this.AuthService.isLoggedIn() || user != undefined){
      this.isLoggedIn = true;
      if(user){
        this.roles = user.user.roles;
        this.associations = user.user.associations;
        this.username = user.user.username;
      }else{
        this.roles = this.AuthService.getRoles();
        this.username = this.AuthService.getUsername();
        this.associations = this.AuthService.getAssos();
      }
      this.admin = this.isAdmin();
      this.moderator = this.isModerator();
    }else{
      this.isLoggedIn = false;
      this.roles = [];
      this.username = "";
      this.admin = false;
      this.moderator = false;
    }
    console.log("Logged : "+this.isLoggedIn+" User : "+this.username);
  }

  logout(){
    this.AuthService.logout();
    this.getUserInfo(undefined);
    this.pushMessage({severity:'success',summary:'Déconnexion réussie',detail:'Vous êtes déconnecté !'})
  }

  isAdmin(){
    if(typeof this.roles !== 'undefined'){
      for(let i = 0; i < this.roles.length; i++){
        if(this.roles[i].name == "admin"){
          console.log("Admin : true");
          return true;
        }
      }
    }
    console.log("Admin : false");
    return false;
  }

  isModerator(){
    if(typeof this.roles !== 'undefined'){
      for(let i = 0; i < this.roles.length; i++){
        if(this.roles[i].name == "admin" || this.roles[i].name == "moderator"){
          console.log("Moderator : true");
          return true;
        }
      }
    }
    console.log("Moderator : false");
    return false;
  }

}

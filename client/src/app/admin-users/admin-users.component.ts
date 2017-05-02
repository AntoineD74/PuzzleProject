import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../authentication.service';
import { GrowlMessagesService } from '../growl-messages.service';
import { AdminService } from '../admin.service';

@Component({
  moduleId: module.id,
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

  constructor(
    private AuthService:AuthenticationService,
    private GrowlService:GrowlMessagesService,
    private AdminService:AdminService
  ) { }

  roles = [];

  rolesFilter = [];
  usernameFilter = "";

  users:any [] = [];

  filteredUsers = [];

  ngOnInit() {
    console.log("Admin Users Init");
    console.log("Admin : "+this.AuthService.isAdmin());
    let that = this;
    if(this.AuthService.checkAuth(this.AuthService.isAdmin())){
      console.log("Getting Roles");
      this.AdminService.getRoles()
        .subscribe(
          function(response){
            console.log("Getting Roles Response");
            console.log(response.json());
            that.roles= [];
            for(let role in response.json()){
              that.roles.push({label:response.json()[role].name,value:response.json()[role].id});
            }
            that.roles.push({label:"user",value:"3"});
            console.log(that.roles);
          },
          function(error){
            console.log("Getting Roles Error");
            that.GrowlService.pushMessage({severity:error,summary:'Erreur lors dur chargement des rôles', detail:''})
          }
        )
      console.log("Getting Users");
      this.AdminService.getUsers("&filter[include]=roles")
        .subscribe(
          function(response){
            console.log("Getting Users Response");
            console.log(response.json());
            that.users = response.json();
            for(let user in that.users){
              if(that.users[user].roles.length > 0){
                that.users[user].role = that.users[user].roles[0].id;
              }else{
                that.users[user].role = 3;
              }
            }
            console.log(that.users);
            that.filteredUsers = that.users;
          },
          function(error){
            console.log("Getting Users Error");
            that.GrowlService.pushMessage({severity:'error',summary:'Erreur lors du chargement des utilisateurs', detail:''})
          }
        );
    }
  }

  filter(){
    this.filteredUsers = [];
    for(let i in this.users){
      if(this.users[i].username.match(this.usernameFilter) && this.isInRoles(this.users[i].role)){
        this.filteredUsers.push(this.users[i]);
      }
    }
  }

  isInRoles(role){
    if(this.rolesFilter.length == 0){
      return true;
    }else{
      for(let i in this.rolesFilter){
        if(role == this.rolesFilter[i]){
          return true;
        }
      }
    }
    return false;
  }

  updateRole(userId, userRole){
    if(!this.AdminService.updateRole(userId, userRole)){
      this.GrowlService.pushMessage({severity:'success',summary:'Rôle mis à jour', detail:''});
    }else{
      this.GrowlService.pushMessage({severity:'error',summary:'Erreur lors de la mise à jour du rôle', detail:''});
    }
  }

  setRole(userId, userRole){
    let that = this;
    let role = + userRole;
    this.AdminService.setRole(userId, role)
      .subscribe(
        function(response){
          that.GrowlService.pushMessage({severity:'success',summary:'Rôle mis à jour', detail:''});
        },
        function(error){
          that.GrowlService.pushMessage({severity:'error',summary:'Erreur lors de la mise à jour du rôle', detail:''})
        }
      )
  }

  resetFilter(){
    this.usernameFilter = "";
    this.rolesFilter = [];
    this.filter();
  }

  standby(image) {
      image.src = 'https://www.mautic.org/media/images/default_avatar.png'
  }

}

import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../authentication.service';
import { GrowlMessagesService } from '../growl-messages.service';
import { AdminService } from '../admin.service';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { ComfirmDialogComponent } from '../comfirm-dialog/comfirm-dialog.component';

@Component({
  moduleId: module.id,
  selector: 'app-admin-associations',
  templateUrl: './admin-associations.component.html',
  styleUrls: ['./admin-associations.component.css']
})
export class AdminAssociationsComponent implements OnInit {

  constructor(
    private AuthService:AuthenticationService,
    private GrowlService:GrowlMessagesService,
    private AdminService:AdminService,
    private modalService: NgbModal
  ) { }

  assos = [];

  users = [];
  filteredUsers = [];
  userFilter = "";

  ngOnInit() {
    console.log("Admin Associations Init");
    console.log("Admin : "+this.AuthService.isAdmin());
    let that = this;
    if(this.AuthService.checkAuth(this.AuthService.isAdmin())){
      this.getAssos();
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

  getAssos(){
    let that = this;
    this.AdminService.getAssos()
      .subscribe(
        function(response){
          console.log(response);
          that.assos = response.json();
        },
        function(error){
          console.log(error);
          that.GrowlService.pushMessage({severity:'error',summary:'Erreur lors du chargement des associations', detail:''})
        }
      );
  }

  deleteAsso(id){
    let that = this;
    this.modalService.open(ComfirmDialogComponent).result.then((result) => {
      this.AdminService.deleteAsso(id)
        .subscribe(
          function(response){
            that.GrowlService.pushMessage({severity:'success',summary:'Association supprimée', detail:''})
            that.getAssos();
          },
          function(error){
            that.GrowlService.pushMessage({severity:'error',summary:"Erreur lors de la suppression de l'association", detail:''})
          }
        )
    }, (reason) => {

    });
  }

}

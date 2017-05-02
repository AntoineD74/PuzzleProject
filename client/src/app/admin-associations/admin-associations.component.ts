import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../authentication.service';
import { GrowlMessagesService } from '../growl-messages.service';
import { AdminService } from '../admin.service';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { ComfirmDialogComponent } from '../comfirm-dialog/comfirm-dialog.component';
import { AddAssMemberDialogComponent } from '../add-ass-member-dialog/add-ass-member-dialog.component';

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
  filteredAssos = [];
  nameFilter = "";

  ngOnInit() {
    console.log("Admin Associations Init");
    console.log("Admin : "+this.AuthService.isAdmin());
    let that = this;
    if(this.AuthService.checkAuth(this.AuthService.isAdmin())){
      this.getAssos();
    }
  }

  getAssos(){
    let that = this;
    this.AdminService.getAssos()
      .subscribe(
        function(response){
          console.log(response);
          that.assos = response.json();
          that.filter();
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
            that.GrowlService.pushMessage({severity:'success',summary:'Association supprimée', detail:''});
            that.getAssos();
          },
          function(error){
            that.GrowlService.pushMessage({severity:'error',summary:"Erreur lors de la suppression de l'association", detail:''})
          }
        )
    }, (reason) => {

    });
  }

  addMember(asso){
    let that = this;
    const modalRef = this.modalService.open(AddAssMemberDialogComponent);
    modalRef.componentInstance.asso = asso;
    modalRef.result.then((result) => {
      this.AdminService.addMember(result.userId, result.assoId)
        .subscribe(
          function(response){
            that.GrowlService.pushMessage({severity:'success',summary:'Membre ajouté', detail:''});
            asso.users.push(result.user);
          },
          function(error){
            that.GrowlService.pushMessage({severity:'error',summary:"Erreur lors de l'ajout d'un membre", detail:''})
          }
        );
    },
    (reason) => {

    });
  }

  standby(image) {
      image.src = 'https://www.mautic.org/media/images/default_avatar.png'
  }

  removeMember(asso, user){
    let that = this;
    this.modalService.open(ComfirmDialogComponent).result.then((result) => {
      this.AdminService.removeMember(user.id, asso.id)
        .subscribe(
          function(response){
            that.GrowlService.pushMessage({severity:'success',summary:'Membre supprimé', detail:''});
            let id = asso.users.indexOf(user);
            if (id > -1) {
              asso.users.splice(id, 1);
            }
          },
          function(error){
            that.GrowlService.pushMessage({severity:'error',summary:"Erreur lors de la suppression du membre", detail:''})
          }
        )
    }, (reason) => {

    });
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

}

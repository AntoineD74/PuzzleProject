import { Component, OnInit, Input } from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from '../admin.service';
import { GrowlMessagesService } from '../growl-messages.service';

@Component({
  moduleId: module.id,
  selector: 'app-add-ass-member-dialog',
  templateUrl: './add-ass-member-dialog.component.html',
  styleUrls: ['./add-ass-member-dialog.component.css']
})
export class AddAssMemberDialogComponent implements OnInit {

  @Input() asso;

  users = [];
  filteredUsers = [];
  userFilter:any;

  constructor(
    public activeModal: NgbActiveModal,
    private GrowlService:GrowlMessagesService,
    private AdminService:AdminService
  ) { }

  ngOnInit() {
    let that = this;
    console.log("Getting Users");
    this.AdminService.getUsers("")
      .subscribe(
        function(response){
          console.log("Getting Users Response");
          console.log(response.json());
          that.users = response.json();

          console.log(that.users);
          that.filteredUsers = that.users;
        },
        function(error){
          console.log("Getting Users Error");
          that.GrowlService.pushMessage({severity:'error',summary:'Erreur lors du chargement des utilisateurs', detail:''})
        }
      );
  }

  filter(event){
    this.filteredUsers = [];
    for(let i in this.users){
      if(this.users[i].username.match(this.userFilter)){
        this.filteredUsers.push(this.users[i]);
      }
    }
  }

  isSelected(){
    return (this.userFilter !== null) && (typeof this.userFilter == 'object');
  }

  onSelect(){
    console.log("Selected value :");
    console.log(this.userFilter);
  }

  standby(image) {
      image.src = 'https://www.mautic.org/media/images/default_avatar.png'
  }

  comfirm(){
    if((this.userFilter !== null) && (typeof this.userFilter == 'object')){
      this.activeModal.close({userId: this.userFilter.id, assoId: this.asso.id, user: this.userFilter});
    }
  }

}

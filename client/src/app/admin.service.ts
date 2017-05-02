import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';

import { AuthenticationService } from './authentication.service';

@Injectable()
export class AdminService {

  constructor(
    private http: Http,
    private Auth: AuthenticationService
  ) { }

  getUsers(filter:string){
    let headers = new Headers();
      headers.append('Content-Type', 'application/json');
    let route = 'http://localhost:3000/api/users'+
      '?access_token='+
      this.Auth.getAccessToken()+filter;
      console.log("Route : "+route);
    return this.http.get(route, {headers : headers})
      .map((response: Response) => {
          return response;
      })
      .catch(this.Auth.handleError);
  }

  getRoles(){
    let headers = new Headers();
      headers.append('Content-Type', 'application/json');
    let route = 'http://localhost:3000/api/roles'+
      '?access_token='+
      this.Auth.getAccessToken()+
      '&filter[fields][id]=true&filter[fields][name]=true';
    return this.http.get(route, {headers : headers})
      .map((response: Response) => {
          return response;
      })
      .catch(this.Auth.handleError);
  }

  updateRole(userId, roleId){
    let headers = new Headers();
      headers.append('Content-Type', 'application/json');

    let route = 'http://localhost:3000/api/users/'+userId+'/roleMappings'+
      '?access_token='+
      this.Auth.getAccessToken();
    console.log("Updating role");
    console.log("Deleting existing role");
    this.http.delete(route, {headers : headers})
      .subscribe(
        function(response){
          console.log(response);
        },
        function(error){
          console.log(error);
        }
      );
    if(roleId != 3){
      console.log("Creating role");
      let body = { "principalType" : "USER", "principalId" : userId, "roleId" : roleId };
      this.http.post(route, body, {headers : headers})
        .subscribe(function(response){
          console.log(response);
          return true;
        },function(error){
          console.log(error);
          return false;
        });
    }


  }

  setRole(userId:number, roleId:number){
    let headers = new Headers();
      headers.append('Content-Type', 'application/json');

    let route = 'http://localhost:3000/api/users/setrole'+
      '?access_token='+
      this.Auth.getAccessToken();
    let body = { userId : userId, roleId : roleId };
    console.log(body);
    return this.http.post(route, body, {headers : headers});
  }

  createAsso(asso){
    let headers = new Headers();
      headers.append('Content-Type', 'application/json');

    let route = 'http://localhost:3000/api/associations'+
      '?access_token='+
      this.Auth.getAccessToken();
    return this.http.post(route, asso, {headers : headers});
  }

  getAssos(){
    let headers = new Headers();
      headers.append('Content-Type', 'application/json');

    let route = 'http://localhost:3000/api/associations'+
      '?access_token='+
      this.Auth.getAccessToken();
    return this.http.get(route, {headers : headers});
  }

  deleteAsso(id){
    let headers = new Headers();
      headers.append('Content-Type', 'application/json');

    let route = 'http://localhost:3000/api/associations/'+
      id+
      '?access_token='+
      this.Auth.getAccessToken();
    return this.http.delete(route, {headers : headers});
  }

}

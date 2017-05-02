import { Injectable } from '@angular/core';

import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';

import { AuthenticationService } from './authentication.service';

@Injectable()
export class UsersService {

  constructor(
    private http: Http,
    private Auth: AuthenticationService
  ) { }

  getProfile(){
    let headers = new Headers();
      headers.append('Content-Type', 'application/json');
    let route = 'http://localhost:3000/api/users/'+
      this.Auth.getUserId()+
      '?access_token='+
      this.Auth.getAccessToken();
    return this.http.get(route, {headers : headers})
      .map((response: Response) => {
          return response;
      })
      .catch(this.Auth.handleError);
  }

  updateProfile(profile){
    let headers = new Headers();
      headers.append('Content-Type', 'application/json');
    let route = 'http://localhost:3000/api/users/'+
      this.Auth.getUserId()+
      '?access_token='+
      this.Auth.getAccessToken();
    return this.http.patch(route, profile, {headers : headers})
      .map((response: Response) => {
          return response;
      })
      .catch(this.Auth.handleError);
  }

  changePassword(oldPwd, newPwd){
    let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let body = "oldPassword="+oldPwd+"&newPassword="+newPwd;
    let route = 'http://localhost:3000/api/users/change-password'+
      '?access_token='+
      this.Auth.getAccessToken();
    return this.http.post(route, body, {headers : headers})
      .map((response: Response) => {
          return response;
      })
      .catch(this.Auth.handleError);
  }

}

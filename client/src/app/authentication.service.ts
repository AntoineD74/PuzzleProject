import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';

import { User } from './user';

@Injectable()
export class AuthenticationService {

  public token;

  public user;

  loggedEvent: EventEmitter<any>;

  constructor(private http: Http, private router: Router) {
      // set token if saved in local storage
      this.loggedEvent = new EventEmitter();
      var currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.token = currentUser && currentUser.token;
      this.user = currentUser && currentUser.user;
  }

  isLoggedIn() :boolean{
    if (localStorage.getItem('currentUser')) {
        // logged in so return true
        return true;
    }
    return false;
  }

  checkAuth(res:boolean){
    console.log("Checking authorization");
    if(!res){
      console.log("Authorization failed, redirecting");
      this.router.navigate(['/failed-auth']);
      return false;
    }
    return true;
  }

  register(user:User){
    let headers = new Headers();
      headers.append('Content-Type', 'application/json');
    let body = JSON.stringify(user);
    return this.http.post('http://localhost:3000/api/users', body, {headers : headers})
        .map((response: Response) => {
            return response;
        })
        .catch(this.handleError);
  }

  login(email, password) {
      let headers = new Headers();
        headers.append('Content-Type', 'application/json');
      let body = JSON.stringify({email : email, password : password});
      return this.http.post('http://localhost:3000/api/users/login', body, {headers : headers})
          .map((response: Response) => {
              // login successful if there's a jwt token in the response
              console.log("Printing response");
              console.log(response.json());
              if(!response.json().Error){
                this.getProfile(response.json());

              }
              return response;
          })
          .catch(this.handleError);
  }

  getProfile(loginResponse){
    let token = loginResponse;
    let that = this;
    console.log("Getting profile");
    if (token) {
        // set token property
      this.token = token;
      this.http.get('http://localhost:3000/api/users/profile?id='+loginResponse.userId)
        .map(
          (response:Response) => {
            that.user = response.json();
            console.log("Profile");
            console.log(that.user);
            this.loggedEvent.emit(that.user);
            localStorage.setItem('currentUser', JSON.stringify({ user: response.json().user, token: token }));
          }
        ).subscribe();

      // store username and jwt token in local storage to keep user logged in between page refreshes

      console.log("Token");
      console.log(this.token);
    }
  }

  logout(): void {
      // clear token remove user from local storage to log user out
      this.token = null;
      this.user = null;
      localStorage.removeItem('currentUser');
      this.router.navigate(['/home']);
  }

  getAccessToken(): any{
    console.log("Asking for access Token : "+this.token.id);
    return this.token.id;
  }

  getUserId(){
    console.log("Asking for User Id : "+this.token.userId);
    return this.token.userId
  }

  getUsername(){
    console.log("Asking for Username : "+this.user.username);
    return this.user.username;
  }

  getRoles(){
    console.log("Asking for Roles : "+this.user.roles);
    return this.user.roles;
  }

  getAssos(){
    console.log("Asking for Associations : "+this.user.associations);
    return this.user.associations;
  }

  isAdmin(){
    if(this.user !== null && typeof this.user.roles !== 'undefined'){
      for(let i = 0; i < this.user.roles.length; i++){
        if(this.user.roles[i].name == "admin"){
          console.log("Admin : true");
          return true;
        }
      }
    }
    console.log("Admin : false");
    return false;
  }

  isModerator(){
    if(this.user !== null && typeof this.user.roles !== 'undefined'){
      for(let i = 0; i < this.user.roles.length; i++){
        if(this.user.roles[i].name == "admin" || this.user.roles[i].name == "moderator"){
          console.log("Moderator : true");
          return true;
        }
      }
    }
    console.log("Moderator : false");
    return false;
  }

  public handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(error);
  }

}

import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';

import { AuthenticationService } from './authentication.service';

@Injectable()
export class ProjectsService {

  constructor(
    private http: Http,
    private Auth: AuthenticationService
  ) { }

  createProject(project){
    let headers = new Headers();
      headers.append('Content-Type', 'application/json');
    let route = 'http://localhost:3000/api/users/'+
      this.Auth.getUserId()+
      '/projects?access_token='+
      this.Auth.getAccessToken();
    return this.http.post(route, project, {headers : headers})
      .map((response: Response) => {
          return response;
      })
      .catch(this.Auth.handleError);
  }

  listProjects(){
    let headers = new Headers();
      headers.append('Content-Type', 'application/json');
    let route = 'http://localhost:3000/api/projects/list-projects'+
      '?access_token='+
      this.Auth.getAccessToken();
    return this.http.get(route, {headers : headers})
      .map((response: Response) => {
          return response;
      })
      .catch(this.Auth.handleError);
  }

  getProject(id){
    let headers = new Headers();
      headers.append('Content-Type', 'application/json');
    let route = 'http://localhost:3000/api/projects/'+id+
      '?access_token='+
      this.Auth.getAccessToken()+
      '&filter[include]=association&filter[include]=users';
    return this.http.get(route, {headers : headers})
      .map((response: Response) => {
          return response;
      })
      .catch(this.Auth.handleError);
  }

}

import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';

import { AuthenticationService } from './authentication.service';

@Injectable()
export class AssociationsService {

  constructor(
    private http: Http,
    private Auth: AuthenticationService
  ) { }

  getAssos(){
    let headers = new Headers();
      headers.append('Content-Type', 'application/json');

    let route = 'http://localhost:3000/api/associations'+
      '?access_token='+
      this.Auth.getAccessToken()+
      '&filter[include]=users';
    return this.http.get(route, {headers : headers});
  }

}

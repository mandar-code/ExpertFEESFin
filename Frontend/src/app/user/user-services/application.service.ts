import { Application } from './../../admin/admin-services/user.model';

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { User } from 'src/app/admin/admin-services/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };
 

  constructor(private http: HttpClient) { }
  postApplicationform(Application:Application){
    return this.http.post(environment.apiBaseUrl+'/applicationform',Application);
  }

  getapplicationform(){
    return this.http.get(environment.apiBaseUrl +'/getapplicationform');
  }

  updateapplicationform(Application:Application){
    return this.http.put(environment.apiBaseUrl + '/updateapplicationform',Application);
  }

  uploaddocs(Application:Application){
    return this.http.post(environment.apiBaseUrl+'/upload',Application);
  }








}
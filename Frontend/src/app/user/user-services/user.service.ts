import { Application } from './../../admin/admin-services/user.model';

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { User } from 'src/app/admin/admin-services/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };
 

  constructor(private http: HttpClient) { }

  //HttpMethods

  postUser(user: User){
   let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(environment.apiBaseUrl+'/register',user,{headers: headers});  }

   login(authCredentials){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(environment.apiBaseUrl + '/authenticate', authCredentials, {headers: headers});  }

  getUsers(){
   
    return this.http.get(environment.apiBaseUrl + '/getUsers')  }
    
  getUserProfile() {
    return this.http.get(environment.apiBaseUrl + '/userProfile');  }


  updateUserProfile(user:User){
    // let headers = new HttpHeaders();
    // headers.append('Content-Type', 'application/json');
    // this.getToken();
    //  return this.http.put(environment.apiBaseUrl+'/updateProfile',user, {headers: headers});
  }

  

  forgotpassword(user:User){
    return this.http.post(environment.apiBaseUrl+'/forgotpassword',user,this.noAuthHeader);
  }

  resetpassword(resetPasswordToken):Observable < any > {
    return this.http.post(environment.apiBaseUrl+'/resetpassword/:token',resetPasswordToken).pipe(
      catchError((error: HttpErrorResponse) => throwError(error))
    )
  }
  updatepassword(user:User){
    return this.http.post(environment.apiBaseUrl+'/updatepassword',user);
  }

 


  setToken(token: string) {localStorage.setItem('token', token);}

   getToken() {return localStorage.getItem('token');}


  deleteToken() {localStorage.removeItem('token'); }

  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload)
      return userPayload.exp > Date.now() / 1000;
    else
      return false;
  }



  
 
}



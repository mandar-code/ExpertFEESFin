import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AdminService {
  adminAuthToken: any;
  admin: any;
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };
  
  constructor(private http: HttpClient) { }

  adminlogin(authCredentials){
    return this.http.post(environment.apiBaseUrl+'/adminlogin',authCredentials,this.noAuthHeader);
  }
  setToken(adminAuthToken:string) {
    localStorage.setItem('token', adminAuthToken);
  }

  getUserProfile() {
    return this.http.get(environment.apiBaseUrl + '/userProfile');
  }
  
  getToken() {
   return localStorage.getItem('token');
  }
  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var AdminPayload = atob(token.split('.')[1]);
      return JSON.parse(AdminPayload);
    }
    else
      return null;
  }

  isLoggedIn() {
    var AdminPayload = this.getUserPayload();
    if (AdminPayload)
      return AdminPayload.exp > Date.now() / 1000;
    else
      return false;
  }

  adminLogout() {
    this.adminAuthToken = null;
    this.admin = null;
    localStorage.clear();
  }
 
}

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminService } from '../admin/admin-services/admin.service';


@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  
  constructor(private adminService : AdminService,private router : Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (this.adminService.isLoggedIn()) {
        return true;
      }
      else
      {
        this.router.navigateByUrl('/institute-login'); 
        this.adminService.adminLogout();
        return false;
      }
     
  }
}

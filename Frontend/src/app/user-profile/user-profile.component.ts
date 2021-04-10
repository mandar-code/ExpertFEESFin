import { Component, OnInit } from '@angular/core';

import { Router } from "@angular/router";
import { Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { BreakpointObserver } from '@angular/cdk/layout';
import { UserService } from '../user/user-services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userDetails;

  constructor(private breakpointObserver: BreakpointObserver,private userService: UserService, private router: Router) {}

   isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
   .pipe(
     map(result => result.matches),
     shareReplay()
   );

  ngOnInit() {
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['data'];
      },
      err => {
        console.log(err);
      }
    );
  }

  onLogout(){
    if(!confirm("Are you sure want to logout? ")) return
    
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }

}

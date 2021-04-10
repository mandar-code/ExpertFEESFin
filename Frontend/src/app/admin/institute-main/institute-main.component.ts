
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user/user-services/user.service';
import { AdminService } from '../admin-services/admin.service';

@Component({
  selector: 'app-institute-main',
  templateUrl: './institute-main.component.html',
  styleUrls: ['./institute-main.component.css']
})
export class InstituteMainComponent implements OnInit {
Admindetails;
users;
  constructor(private userService: UserService,private adminService:AdminService,private router : Router) { }

  ngOnInit(): void {
    this.adminService.getUserProfile().subscribe(
      res => {
        this.Admindetails = res['data'];
      },
      err => {
        console.log(err);
      }
    );
    this.userService.getUsers()
    .subscribe(users => {
      this.users = users ;
      },
      err => {
       console.log(err);
      }
    );
  }

  logout(){
    if(!confirm("Are you sure want to logout? ")) return
     this.adminService.adminLogout();
    this.router.navigate(['/institute-login']);
  }
}

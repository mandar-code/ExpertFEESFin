import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/admin/admin-services/user.model';
import { UserService } from 'src/app/user/user-services/user.service';

@Component({
  selector: 'app-paidfees',
  templateUrl: './paidfees.component.html',
  styleUrls: ['./paidfees.component.css'],
  providers:[UserService]
})
export class PaidfeesComponent implements OnInit {
  users;
  email:string;
  mobileNo:string;
  


  constructor(private breakpointObserver: BreakpointObserver,private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.getUsers()
    .subscribe(users => {
      this.users = users ;
      },
      err => {
       console.log(err);
      }
    );
                                     

}
}
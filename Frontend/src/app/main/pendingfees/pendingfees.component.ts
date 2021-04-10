import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user/user-services/user.service';


@Component({
  selector: 'app-pendingfees',
  templateUrl: './pendingfees.component.html',
  styleUrls: ['./pendingfees.component.css']
})
export class PendingfeesComponent implements OnInit {
  userDetails: any;

  constructor(private userService: UserService,) { }

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

}

// this.userService.getUserProfile().subscribe(
  //   res => {
  //     this.userDetails = res['data'];
  //     this.userDetails.user.forEach(element => {
  //       if (element.role === 'User') {
  //         this.genUsers.push(element)
  //       }        
  //     })
  //     console.log('genUsers',this.genUsers);
      
  //   },
   
  // );}
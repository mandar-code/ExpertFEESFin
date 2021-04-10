import { ApplicationService } from 'src/app/user/user-services/application.service';
import { Application } from '../../admin/admin-services/user.model';

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { UserService } from 'src/app/user/user-services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
applicationForm;

ApplicationForm:Application;
token;
  userDetails: any;
  constructor(private userService:UserService,private application:ApplicationService) { }

  ngOnInit() {
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['data'];
      },
      err => {
        console.log(err);
      }
    );
    this.application.getapplicationform().subscribe(
      res => {
        this.applicationForm = res['data'];
        console.log(res);
        console.log(this.applicationForm);
      },
      err => {
        console.log(err);
      });
  }
  }



import { Component, OnInit } from '@angular/core';
import { UserService } from '../user-services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
userDetails;
  constructor(private userService:UserService) { }

  ngOnInit() {
   
  }

}

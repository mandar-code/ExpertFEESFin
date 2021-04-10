import { UserService } from 'src/app/user/user-services/user.service';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../admin-services/admin.service';




@Component({
  selector: 'app-institute-login',
  templateUrl: './institute-login.component.html',
  styleUrls: ['./institute-login.component.css']
})
export class InstituteLoginComponent implements OnInit {
  hide = true;
  admin:any;
  instituteForm: FormGroup;
  constructor( private adminService:AdminService, private userService:UserService, private router : Router,public fb: FormBuilder) { }


  ngOnInit() {
    this.BooksignInForm();
    if (this.userService.isLoggedIn()) {
      this.router.navigate(['institute-main']);
    }
  }

  BooksignInForm(){
    this.instituteForm = this.fb.group({
     userid: ['', [Validators.required,]],
      password: ['', [Validators.required,Validators.minLength(4)]],
    });
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.instituteForm.controls[controlName].hasError(errorName);
  } 
  
  
  onSubmit(){
       this.adminService.adminlogin(this.instituteForm.value).subscribe(
      res => {
        this.adminService.setToken(res['token']);
        this.router.navigateByUrl('institute-main');
        window.alert('Log In Successfully')
      },
      err => {
        window.alert('User Id or Password is Wrong');
       
      }
    );
  }
  // loginAdmin(){
  //   const admin = {
  //     username: this.username,
  //     password: this.password
  //   }
  //   console.log('trying to authenticate with api');    
  //   this.authService.authenticateUser(admin).subscribe(data => {
  //     if (data.success && data.user.role === "Admin") {        
  //       this.authService.storeAdminData(data.token, data.user);                
  //       this.ngFlashMessageService.showFlashMessage({          
  //         messages: ["You have succefully logged in"],         
  //         dismissible: true,           
  //         timeout: 4000,          
  //         type: 'info'
  //       }); 
  //       this.router.navigate(['/admin-books']);
  //     } else {
  //       this.ngFlashMessageService.showFlashMessage({          
  //         messages: [data.msg],           
  //         dismissible: true,           
  //         timeout: 4000,          
  //         type: 'danger'
  //       });
  //       this.router.navigate(['/admin/login']);
  //       this.username = null
  //       this.password = null
  //     }
  //   })   
  // }


}

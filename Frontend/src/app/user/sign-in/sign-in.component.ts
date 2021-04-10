import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user-services/user.service';




@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
hide = true;
userDetails;
signInForm: FormGroup;
loading=false;
  constructor(private userService: UserService,private router : Router,public fb: FormBuilder,private route: ActivatedRoute) {}


  ngOnInit() {
    this.BooksignInForm();
    if (this.userService.isLoggedIn()) {
      this.router.navigate(['userprofile/admissionform']);
    }  
  }

  BooksignInForm(){
    this.signInForm = this.fb.group({
      userid: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.signInForm.controls[controlName].hasError(errorName);
  } 

  onSubmit(){
    this.loading=true;
    this.userService.login(this.signInForm.value).subscribe(
      res => {
        this.userService.setToken(res['token']);
        this.router.navigateByUrl('userprofile/admissionform');
      },
      err => {
        window.alert('User Id or Password is Wrong');
        this.loading=false;
      }
    );
  }

}

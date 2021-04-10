
import { Component, OnInit } from '@angular/core';
import { stringToKeyValue } from '@angular/flex-layout/extended/typings/style/style-transforms';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user-services/user.service';




@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  hide=true;
  hide2=true;

  constructor(public userService: UserService,private router : Router, public fb: FormBuilder) { }

  ngOnInit() {
    this.BooksignUpForm();
  }

  checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (signUpForm: FormGroup) => {
      let passwordInput = signUpForm.controls[passwordKey],
          passwordConfirmationInput = signUpForm.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({notEquivalent: true})
      }
      else {
          return passwordConfirmationInput.setErrors(null);
      }
    }
  }
  BooksignUpForm(){
    this.signUpForm = this.fb.group({
      mobileNo: ['', [Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
      userid: ['', [Validators.required,Validators.minLength(4),Validators.maxLength(15)]],
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required,Validators.minLength(8),Validators.maxLength(15)]],
      confirmpassword: ['', [Validators.required,Validators.minLength(8),Validators.maxLength(15)]],
      },{validator: this.checkIfMatchingPasswords('password', 'confirmpassword')});
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.signUpForm.controls[controlName].hasError(errorName);
  } 
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
  onSubmit() {
    this.userService.postUser(this.signUpForm.value).subscribe(
      res => {
       window.alert('You have sucessfully registered! ');
       this.clearForm();
        this.router.navigateByUrl('/login');
     
      },
      err => {
        if (err.status === 422) {
          window.alert('Fullname/EmailId/Password field cannot be empty or EmailId is already registered')
        }
        else
          window.alert('Something went wrong please contact admin!')
      }
    );
  }

  clearForm() {
    this.signUpForm.reset({
          'email': '',
          'userid': '',
          'mobileNo': '',
          'password': '',        
         });
    }


}







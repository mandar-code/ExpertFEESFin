import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user-services/user.service';


@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  loading=false;
  forgotpasswordForm: FormGroup;
  EmailSent=false;
  constructor(private userService: UserService,private router : Router,public fb: FormBuilder) { 
   
  }


  ngOnInit() {
    this.BooksignInForm();
  }

  BooksignInForm(){
    this.forgotpasswordForm = this.fb.group({
      userid: ['', [Validators.required]],
     
    });
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.forgotpasswordForm.controls[controlName].hasError(errorName);
  } 
  onSubmit(){
    this.loading=true;
    this.userService.forgotpassword(this.forgotpasswordForm.value).subscribe(
      res => {
        window.alert('Reset Link is Successfully sent to your Email. Please follow the instructions');
        console.log(res);
        this.loading=false;
        // this.router.navigate(['/login']);
        this.EmailSent=true;
        
      },
      err => {
        window.alert('User is not Exist ');
        this.loading=false;
        console.log(err);
        
      }
     
    
    );
  }
 

}

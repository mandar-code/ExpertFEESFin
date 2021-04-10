
import { tokenize } from '@angular/compiler/src/ml_parser/lexer';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user-services/user.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  resetpasswordForm: FormGroup;
  resetPasswordToken: string;
  userDetails;
  CurrentState: string;

  constructor(private userService: UserService, private router: Router,
    private route: ActivatedRoute,public fb: FormBuilder) {
      this.CurrentState = 'Wait';
      this.route.params.subscribe(params => {
        this.resetPasswordToken = params.token;
        console.log(this.resetPasswordToken);
        this.VerifyToken();
      });
  }
  
  ngOnInit() {this.BooksignInForm();}
   
  VerifyToken() {
    this.userService.resetpassword({ reset_password_token: this.resetPasswordToken }).subscribe(
      data => {
        this.CurrentState = 'Verified';
        console.log(data);
      },
      err => {
        this.CurrentState = 'NotVerified';
        console.log(err);
      }
    );
  }

  BooksignInForm(){
    this.resetpasswordForm = this.fb.group({
      resetPasswordToken:[this.resetPasswordToken],
      password: ['', [Validators.required,Validators.minLength(8)],],
     });
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.resetpasswordForm.controls[controlName].hasError(errorName);
  }

  onSubmit(){
    this.userService.updatepassword(this.resetpasswordForm.value).subscribe(
      res => {
        window.alert('Password Upadated Successfully!');
        console.log(res);
        this.router.navigate(['/login']);
      },
      err => {
        window.alert('Something went wrong please contact admin');
        console.log(err);
      },
      
     
     
    );
  }

}

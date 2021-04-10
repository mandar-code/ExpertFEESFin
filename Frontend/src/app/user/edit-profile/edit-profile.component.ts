import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user-services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  userDetails;
  EditForm: FormGroup;
  updateToken:string;
  id:string;

  constructor(public userService: UserService,private router : Router, public fb: FormBuilder, private route: ActivatedRoute) { 
    this.route.params.subscribe(params => {
      this.id = params.token;
      console.log(this.id);
  })
}
  
  ngOnInit() {
    this.BooksignUpForm();
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['data'];
      },
      err => {
        console.log(err);
      }
    );
  }



  BooksignUpForm(){
    this.EditForm = this.fb.group({
      mobileNo: ['', [Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
      userid: ['', [Validators.required,Validators.minLength(4)]],
      email: ['', [Validators.required,Validators.email]]
    });
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.EditForm.controls[controlName].hasError(errorName);
  } 

  // onSubmit() {
  //   this.userService.updateUserProfile(this.EditForm.value).subscribe(
  //     res => {
  //      window.alert('Updated successfully');
  //      console.log(res);
  //     },
  //     err => {
  //       if (err.status === 422) {
  //         window.alert('Fullname/EmailId/Password field cannot be empty');
  //         console.log(err);
  //       }
  //       else
  //         window.alert('Something went wrong please contact admin!');
  //         console.log(err);
  //     }
  //   );
  // }

}

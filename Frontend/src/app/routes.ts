import { ProfileComponent } from './main/profile/profile.component';
import { EditProfileComponent } from './user/edit-profile/edit-profile.component';
import { ResetpasswordComponent } from './user/resetpassword/resetpassword.component';
import { NavbarComponent } from './user/navbar/navbar.component';
import { AppComponent } from './app.component';
import { Routes } from '@angular/router';
import {SignUpComponent} from './user/sign-up/sign-up.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AdmissionformComponent } from './main/admissionform/admissionform.component';
import { PendingfeesComponent } from './main/pendingfees/pendingfees.component';
import { SubmittedformsComponent } from './main/submittedforms/submittedforms.component';
import { PaidfeesComponent } from './main/paidfees/paidfees.component';

import { ForgotpasswordComponent } from './user/forgotpassword/forgotpassword.component';
import { InstituteLoginComponent } from './admin/institute-login/institute-login.component';
import { InstituteMainComponent } from './admin/institute-main/institute-main.component';
import { SignInComponent } from './user/sign-in/sign-in.component';

import { PaymentsummaryComponent } from './main/paymentsummary/paymentsummary.component';
import { AdminGuard } from './auth-guards/admin.guard';
import { AuthGuard } from './auth-guards/auth.guard';



export const appRoutes: Routes = [
     {path: '', redirectTo: '/login', pathMatch: 'full'},
     {path: 'register', component: SignUpComponent },
     {path: 'login', component: SignInComponent},
     {path:'forgotpassword',component:ForgotpasswordComponent},
     {path:'resetpassword/:token',component:ResetpasswordComponent},
     {path:'institute-login',component:InstituteLoginComponent},
     {path:'institute-main',component:InstituteMainComponent,canActivate:[AdminGuard]},
     {path: 'userprofile', component: UserProfileComponent,canActivate:[AuthGuard],
      children:[
      {path:'admissionform',component:AdmissionformComponent,},
      {path:'pendingfees',component:PendingfeesComponent},
      {path:'submittedforms',component:SubmittedformsComponent},
      {path:'paidfees',component:PaidfeesComponent,},
      {path:'paymentsummary',component:PaymentsummaryComponent},
      {path:'edit-profile',component:EditProfileComponent},
      {path:'profile',component:ProfileComponent}]
  },


];

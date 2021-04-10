// built-in

import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';

// components
import { AppComponent } from './app.component';
import { AdmissionformComponent } from './main/admissionform/admissionform.component';
import { SubmittedformsComponent } from './main/submittedforms/submittedforms.component';
import { PendingfeesComponent } from './main/pendingfees/pendingfees.component';
import { PaidfeesComponent } from './main/paidfees/paidfees.component';


//routes
import { appRoutes } from './routes';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import {SignUpComponent} from './user/sign-up/sign-up.component';

//other


import { BreakPointRegistry, FlexLayoutModule, FlexStyleBuilder, LayoutAlignStyleBuilder, LayoutStyleBuilder, MediaMarshaller, PrintHook, StylesheetMap, StyleUtils, ɵMatchMedia, } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

//material

import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTabsModule} from '@angular/material/tabs';
import { MatNativeDateModule } from '@angular/material/core';

import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import { ForgotpasswordComponent } from './user/forgotpassword/forgotpassword.component';
import { InstituteLoginComponent } from './admin/institute-login/institute-login.component';
import { InstituteMainComponent } from './admin/institute-main/institute-main.component';

import { NavbarComponent } from './user/navbar/navbar.component';
import { ResetpasswordComponent } from './user/resetpassword/resetpassword.component';
import { EditProfileComponent } from './user/edit-profile/edit-profile.component';
import { ProfileComponent } from './main/profile/profile.component';

import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { LayoutModule } from '@angular/cdk/layout';
import { UserService } from './user/user-services/user.service';
import { AdminService } from './admin/admin-services/admin.service';
import { PaymentsummaryComponent } from './main/paymentsummary/paymentsummary.component';
import { AuthInterceptor } from './auth-guards/auth.interceptor';
import { AdminGuard } from './auth-guards/admin.guard';
import { AuthGuard } from './auth-guards/auth.guard';


@NgModule({
  declarations: [
    AppComponent,
  

    UserProfileComponent,
    SignInComponent,
    SignUpComponent,
    AdmissionformComponent,
    SubmittedformsComponent,
    PendingfeesComponent,
    PaidfeesComponent,
    PaymentsummaryComponent,
    ForgotpasswordComponent,
    InstituteLoginComponent,
    InstituteMainComponent,
    NavbarComponent,
    ResetpasswordComponent,
    EditProfileComponent,
    ProfileComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    //material
    MatCheckboxModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatStepperModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    LayoutModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    PrintHook,
    StyleUtils,
    StyleSheet,
    StylesheetMap,
    LayoutAlignStyleBuilder,
    LayoutStyleBuilder,
    FlexStyleBuilder,
    MediaMarshaller,
    ɵMatchMedia,
    BreakPointRegistry,{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },
  AuthGuard,
  AdminGuard,
  UserService,
  AdminService

],
  bootstrap: [AppComponent]
})
export class AppModule { }

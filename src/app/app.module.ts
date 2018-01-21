import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ClaimService } from './claim.service';
import { UserService } from './user.service';
import { UploadService } from './upload.service';
import { LoginService } from './login.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { ClaimComponent } from './claim/claim.component';
import { LoginComponent } from './login/login.component';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ClaimCreateComponent } from './claim-create/claim-create.component';
import { ClaimDetailComponent } from './claim-detail/claim-detail.component';
import { ClaimEditComponent } from './claim-edit/claim-edit.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UploadComponent } from './upload/upload.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const ROUTES = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'claims', component: ClaimComponent },
  { path: 'claim-detail/:id', component: ClaimDetailComponent },
  { path: 'claim-create', component: ClaimCreateComponent },
  { path: 'claim-edit/:id', component: ClaimEditComponent },
  { path: 'claim-upload' , component: UploadComponent },
  { path: 'user-create', component: UserCreateComponent },
  { path: 'dashboard', component: DashboardComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ClaimComponent,
    LoginComponent,
    ClaimCreateComponent,
    ClaimDetailComponent,
    ClaimEditComponent,
    UserCreateComponent,
    UploadComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [UserService, ClaimService, UploadService, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }

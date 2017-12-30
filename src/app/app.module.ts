import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ClaimService } from './claim.service';
import { UserService } from './user.service';
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
import { ClaimEditComponent } from './claim-edit/claim-edit.component'; // error 404

const ROUTES = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'claims', component: ClaimComponent },
  { path: 'claim-detail/:id', component: ClaimDetailComponent },
  { path: 'claim-create', component: ClaimCreateComponent },
  { path: 'claim-edit/:id', component: ClaimEditComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ClaimComponent,
    LoginComponent,
    ClaimCreateComponent,
    ClaimDetailComponent,
    ClaimEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [UserService, ClaimService,  {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }

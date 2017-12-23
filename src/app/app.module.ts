import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ClaimService } from './claim.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { ClaimComponent } from './claim/claim.component';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ClaimCreateComponent } from './claim-create/claim-create.component'; // error 404

const ROUTES = [
  { path: '', redirectTo: 'claims', pathMatch: 'full' },
  { path: 'claims', component: ClaimComponent },
  { path: 'claim-create', component: ClaimCreateComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ClaimComponent,
    ClaimCreateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [ClaimService,  {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }

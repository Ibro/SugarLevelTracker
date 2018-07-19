import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatButtonModule, MatCardModule, MatInputModule, MatListModule, MatToolbarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { OktaAuthModule, OktaCallbackComponent } from '@okta/okta-angular';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import SugarLevelListComponent from './sugarlevel-list/sugarlevel-list.component';
import SugarLevelEditComponent from './sugarlevel-edit/sugar-level-edit.component';
import SugarLevelService from './shared/api/sugar-level.service';

const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'sugarlevel-list',
    component: SugarLevelListComponent
  },
  {
    path: 'sugarlevel-add',
    component: SugarLevelEditComponent
  },
  {
    path: 'sugarlevel-edit/:id',
    component: SugarLevelEditComponent
  },
  {
    path: 'implicit/callback',
    component: OktaCallbackComponent
  }
];

const config = {
  issuer: 'https://{yourOktaDomain}/oauth2/default',
  redirectUri: 'http://localhost:4200/implicit/callback',
  clientId: '{clientId}'
};

@NgModule({
  declarations: [
    AppComponent,
    SugarLevelListComponent,
    SugarLevelEditComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    OktaAuthModule.initAuth(config)
  ],
  providers: [
    SugarLevelService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

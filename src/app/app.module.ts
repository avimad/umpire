import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { UmpireScheduleComponent } from './umpire-schedule/umpire-schedule.component';
import { UmpireInfoComponent } from './umpire-info/umpire-info.component';
import { LandingComponent } from './landing/landing.component';
import { AppRoutingModule } from './app-routing.module';

import {
  MatTableModule, MatSelectModule, MatInputModule, MatDatepickerModule,
  MatNativeDateModule, MatButtonModule, MatCardModule
} from '@angular/material';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UmpDropdownComponent } from './shared/components/ump-dropdown/ump-dropdown.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from '../environments/environment';
import { MsalModule, MsalInterceptor } from '@azure/msal-angular';
import { SignupComponent } from './signup/signup.component';

export function loggerCallback(logLevel, message, piiEnabled) {
  console.log('client logging' + message);
}

export const protectedResourceMap: [string, string[]][] = [['',
  ['api://eb3e3c40-0442-40e1-ad5a-59889e15b439/access_as_user']], ['https://graph.microsoft.com/v1.0/me', ['user.read']]];

const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    UmpireScheduleComponent,
    UmpireInfoComponent,
    LandingComponent,
    UmpDropdownComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatTableModule,
    MatInputModule,
    MatSelectModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatCardModule,
    MatButtonModule,
    HttpClientModule,
    MsalModule.forRoot({
      clientID: 'd42ecbea-4a88-4eb5-985f-0cdb8fa4c547',
      authority: 'https://login.microsoftonline.com/tfp/sflumpires.onmicrosoft.com/B2C_1_signupsignin1',
      validateAuthority: true,
      redirectUri: environment.redirectUri,
      cacheLocation: 'localStorage',
      storeAuthStateInCookie: isIE, // set to true for IE 11
      postLogoutRedirectUri: environment.redirectUri,
      navigateToLoginRequestUrl: true,
      popUp: !isIE,
     // consentScopes: ['user.read', 'openid', 'profile', 'api://eb3e3c40-0442-40e1-ad5a-59889e15b439/access_as_user'],
      unprotectedResources: ['https://www.microsoft.com/en-us/'],
      // tslint:disable-next-line:object-literal-shorthand
     // protectedResourceMap: protectedResourceMap,
      logger: loggerCallback,
      correlationId: '1234',
      piiLoggingEnabled: true
    }
    ),
  ],
  providers: [
    { provide: 'BASE_API_URL', useValue: environment.baseUrl },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { Client } from '@microsoft/microsoft-graph-client';
import { OAuthSettings } from 'src/oauth';
import { UserInfo } from '../models/user-info';
import { userInfo } from 'os';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public authenticated: boolean;
  public userInfo: UserInfo;

  constructor(
    private msalService: MsalService) {

    this.authenticated = this.msalService.getUser() != null;
    this.getUser().then((user) => {
      this.userInfo = user;
    });
  }

  // Prompt the user to sign in and
  // grant consent to the requested permission scopes
  async signIn(): Promise<void> {
    const result = await this.msalService.loginPopup(OAuthSettings.scopes)
      .catch((reason) => {
        console.log(reason);
        // this.alertsService.add('Login failed', JSON.stringify(reason, null, 2));
      });

    if (result) {
      this.authenticated = true;
      this.userInfo = await this.getUser();
    }
  }

  // Sign out
  signOut(): void {
    this.msalService.logout();
    // this.user = null;
    this.authenticated = false;
    localStorage.clear();
  }

  // Silently request an access token
  async getAccessToken(): Promise<string> {
    const result = await this.msalService.acquireTokenSilent(OAuthSettings.scopes)
      .catch((reason) => {
        // this.alertsService.add('Get token failed', JSON.stringify(reason, null, 2));
      });
    localStorage.setItem('token', result);
    return result;
  }

  private async getUser() {
    if (!this.authenticated) {
      return null;
    }

    const graphClient = Client.init({
      // Initialize the Graph client with an auth
      // provider that requests the token from the
      // auth service
      authProvider: async (done) => {
        const token = await this.getAccessToken()
          .catch((reason) => {
            done(reason, null);
          });
        console.log('access Token', token);
        if (token) {
          done(null, token);
        } else {
          done('Could not get an access token', null);
        }
      }
    });

    // Get the user from Graph (GET /me)
    const graphUser = await graphClient.api('/me').get().catch((err) => console.log(err));
    console.log('graphUser', graphUser);
    this.userInfo = {};
    this.userInfo.Name = graphUser.displayName;
    this.userInfo.Email = graphUser.userPrincipalName;
    this.userInfo.Role = graphUser.jobTitle;
    localStorage.setItem('userRole', this.userInfo.Role);
    localStorage.setItem('userName', this.userInfo.Name);
    // user.displayName = graphUser.displayName;
    // Prefer the mail property, but fall back to userPrincipalName
    //  user.email = graphUser.mail || graphUser.userPrincipalName;

    return this.userInfo;
  }
  getRole() {
    return localStorage.getItem('userRole').toLowerCase();
  }
  getUserName() {
    return localStorage.getItem('userName');
  }
}

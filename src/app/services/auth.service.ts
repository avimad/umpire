import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { Client } from '@microsoft/microsoft-graph-client';
import { OAuthSettings } from 'src/oauth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public authenticated: boolean;

  constructor(
    private msalService: MsalService) {

    this.authenticated = this.msalService.getUser() != null;
    this.getUser().then((user) => {
      // this.user = user
      console.log(user);
    });
  }

  // Prompt the user to sign in and
  // grant consent to the requested permission scopes
  async signIn(): Promise<void> {
    const result = await this.msalService.loginPopup(OAuthSettings.scopes)
      .catch((reason) => {
        // this.alertsService.add('Login failed', JSON.stringify(reason, null, 2));
      });

    if (result) {
      this.authenticated = true;
      // this.user = await this.getUser();
      console.log('user', this.getUser());
    }
  }

  // Sign out
  signOut(): void {
    this.msalService.logout();
    // this.user = null;
    this.authenticated = false;
  }

  // Silently request an access token
  async getAccessToken(): Promise<string> {
    const result = await this.msalService.acquireTokenSilent(OAuthSettings.scopes)
      .catch((reason) => {
        // this.alertsService.add('Get token failed', JSON.stringify(reason, null, 2));
      });

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

        if (token) {
          done(null, token);
        } else {
          done('Could not get an access token', null);
        }
      }
    });

    // Get the user from Graph (GET /me)
    const graphUser = await graphClient.api('/me').get();
    console.log('graphUser', graphUser);
    //  let user = new User();
    // user.displayName = graphUser.displayName;
    // Prefer the mail property, but fall back to userPrincipalName
    //  user.email = graphUser.mail || graphUser.userPrincipalName;

    return graphUser;
  }
}

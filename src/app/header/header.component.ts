import { Component, OnInit, OnDestroy } from '@angular/core';
import { MsalService, BroadcastService } from '@azure/msal-angular';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
 // loggedIn = false;
  constructor(private msalservice: MsalService, private broadcastService: BroadcastService,
              private authservice: AuthService) { }

  ngOnInit() {
    // if (!this.authservice.authenticated) {

    //   // this.loggedIn = false;
    // } else {
    //  //  this.loggedIn = true;
    // }



    this.broadcastService.subscribe('msal:loginFailure', (payload) => {
      // console.log('login failure ' + JSON.stringify(payload));
    //  this.loggedIn = false;

    });

    this.broadcastService.subscribe('msal:loginSuccess', (payload) => {
   //   console.log('login success ' + JSON.stringify(payload));
      //  localStorage.setItem('accessToken', payload._token);
     // this.loggedIn = true;
    });
    this.subscription = this.broadcastService.subscribe('msal:acquireTokenFailure', (payload) => {
     // this.loggedIn = false;
    });
  }
  login() {
    this.authservice.signIn();
  }
  logout() {
    this.authservice.signOut();
   // this.loggedIn = false;
  }
  ngOnDestroy() {
    this.broadcastService.getMSALSubject().next(1);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

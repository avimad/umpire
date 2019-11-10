import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { UmpireInfoComponent } from './umpire-info/umpire-info.component';
import { UmpireScheduleComponent } from './umpire-schedule/umpire-schedule.component';
import { SignupComponent } from './signup/signup.component';
import { MsalGuard } from '@azure/msal-angular';
import { LocationMapComponent } from './location-map/location-map.component';


const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'umpire-info', component: UmpireInfoComponent, canActivate: [MsalGuard] },
  { path: 'umpire-schedule', component: UmpireScheduleComponent, canActivate: [MsalGuard] },
  { path: 'location-map/:id', component: LocationMapComponent },
  { path: 'sign-up', component: SignupComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

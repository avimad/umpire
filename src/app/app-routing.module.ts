import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { UmpireInfoComponent } from './umpire-info/umpire-info.component';
import { UmpireScheduleComponent } from './umpire-schedule/umpire-schedule.component';


const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'umpire-info', component: UmpireInfoComponent },
  { path: 'umpire-schedule', component: UmpireScheduleComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

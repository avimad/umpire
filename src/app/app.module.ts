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

import { MatTableModule, MatSelectModule, MatInputModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    UmpireScheduleComponent,
    UmpireInfoComponent,
    LandingComponent
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
    MatDatepickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

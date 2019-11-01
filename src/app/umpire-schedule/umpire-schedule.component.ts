import { Component, OnInit } from '@angular/core';
import { Observable, of, forkJoin } from 'rxjs';
import { UmpireService } from '../services/umpire.service';
import { DropdownModel } from '../shared/models/dropdown-model';
import { map, mergeMap, flatMap } from 'rxjs/operators';
import { AddSchedule } from '../models/schedule';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-umpire-schedule',
  templateUrl: './umpire-schedule.component.html',
  styleUrls: ['./umpire-schedule.component.scss']
})
export class UmpireScheduleComponent implements OnInit {

  locations$: Observable<DropdownModel[]>;
  umpires$: Observable<DropdownModel[]>;
  locationHeaders: Observable<number[]>;
  schedules: FormGroup[] = [];

  arrayItems: Observable<number[]>;

  timeArray$: Observable<DropdownModel[]>;
  addSchArray: AddSchedule[] = [];
  addSch: AddSchedule = { TeamID: 1 };

  mainForm: FormGroup;
  timeForm: FormGroup;


  constructor(private umpService: UmpireService, private fb: FormBuilder, public  authservice: AuthService) {
    this.createForm();
    this.locationHeaders = of(Array(12).fill(0).map((x, i) => i));
    this.arrayItems = of(Array(2).fill(0).map((x, i) => i));

  }

  ngOnInit() {
    forkJoin(this.umpService.getUmpires(), this.umpService.getLocation()).subscribe(res => {
      res[0].unshift({ FirstName: '#select umpire', ID: 0 });
      res[1].unshift({ LocationName: '#select location', ID: 0 });
      this.umpires$ = of(res[0]).pipe(
        map(r => r.map(v => ({ label: v.FirstName, value: v.ID }) as DropdownModel)),
      );
      this.locations$ = of(res[1]).pipe(
        map(r => r.map(v => ({ label: v.LocationName, value: v.ID }) as DropdownModel))
      );
    });
    this.getTimeArray();

  }

  // main form
  createForm() {
    this.mainForm = this.fb.group({
      scheduleDate: ['', Validators.required],
      locations: this.fb.array([this.createLocationForm()]),
      scheduleTime: this.fb.array([this.createTimeForm()])
    });
    this.mainForm.valueChanges.subscribe(res => {
      console.log(res);
    });
    const locArray = this.mainForm.get('locations') as FormArray;
    for (let i = 0; i <= 10; i++) {
      locArray.push(this.createLocationForm());

    }
    return this.mainForm;
  }

  // time form
  createTimeForm() {
    this.timeForm = this.fb.group({
      schTime: ['8:00 AM', Validators.required],
      lu: this.fb.array([this.createUmpireForm()])

    });
    this.timeForm.valueChanges.subscribe(res => {
      // console.log(res);
    });
    const umpArray = this.timeForm.get('lu') as FormArray;
    for (let i = 0; i <= 10; i++) {
      umpArray.push(this.createUmpireForm());

    }
    return this.timeForm;

  }
  // location and umpire
  createLocationForm() {
    return this.fb.group({
      location: ['0', Validators.required]
    });
  }
  createUmpireForm() {
    return this.fb.group({
      umpire: ['0', Validators.required]
    });
  }
  // select change location ,umpire,time
  selectedLocation(e, i, j) {

    // this.addSch.LocationID = Number(e);
  }
  selectedUmpire(time, umpire, date, location) {
    console.log(time, umpire, date, location);
    // this.addSch.ScheduleDate = ;
    // this.addSch.UmpireID = Number(e);
    // console.log(this.addSch);
    // this.umpService.addSchedule(this.addSch).subscribe();
  }
  selectedTime(e, x) {
    // this.mainForm.get('scheduleTime')[0]['schTime'].va
    // this.addSch.ScheduleTime = e;
  }
  dateChanged(e) {
    // this.addSch.ScheduleDate = e.value;
  }


  addRow() {
    const timeArray = this.mainForm.get('scheduleTime') as FormArray;
    timeArray.push(this.createTimeForm());
  }

  // addition functions

  getTimeArray() {
    let hours;
    let mints;
    let ampm;
    const times = [];
    for (let i = 480; i < 1140; i += 5) {
      hours = Math.floor(i / 60);
      mints = i % 60;
      if (mints < 10) {
        mints = '0' + mints;
      }
      ampm = hours % 24 < 12 ? 'AM' : 'PM';
      hours = hours % 12;
      if (hours === 0) {
        hours = 12;
      }
      const str = hours + ':' + mints + ' ' + ampm;
      times.push(str);
    }
    this.timeArray$ = of(times).pipe(
      map(r => r.map(v => ({ label: v, value: v }) as DropdownModel)),
    );
  }
  get scheduleTime() {
    return this.mainForm.get('scheduleTime') as FormArray;
  }
  get lu() {
    console.log(this.timeForm.get('lu') as FormArray);
    return this.timeForm.get('lu') as FormArray;
  }
}


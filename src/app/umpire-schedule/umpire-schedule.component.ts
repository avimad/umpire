import { Component, OnInit } from '@angular/core';
import { Observable, of, forkJoin, from, zip } from 'rxjs';
import { UmpireService } from '../services/umpire.service';
import { DropdownModel } from '../shared/models/dropdown-model';
import { map, mergeMap, flatMap, groupBy, toArray, reduce } from 'rxjs/operators';
import { AddSchedule, Schedule, Time } from '../models/schedule';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { MatDialog } from '@angular/material';
import { LocationMapComponent } from '../location-map/location-map.component';
import { Router } from '@angular/router';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-umpire-schedule',
  templateUrl: './umpire-schedule.component.html',
  styleUrls: ['./umpire-schedule.component.scss']
})
export class UmpireScheduleComponent implements OnInit {

  locations$: Observable<DropdownModel[]>;
  umpires$: Observable<DropdownModel[]>;
  locationHeaders: Observable<number[]>;
  // schedules: FormGroup[] = [];

  arrayItems: Observable<number[]>;

  timeArray$: Observable<DropdownModel[]>;
  addSchArray: AddSchedule[] = [];
  addSch: AddSchedule = { TeamID: 1 };

  isDisable = false;

  mainForm: FormGroup;
  timeForm: FormGroup;
  umpireForm: FormGroup;
  locationForm: FormGroup;

  scheduleForm: FormGroup[] = [];

  schedules: Schedule[] = [];
  schedule: Schedule = {};

  isLoading = false;


  constructor(private umpService: UmpireService, private fb: FormBuilder, public authservice: AuthService,
    private dilaog: MatDialog, private router: Router, public dialog: MatDialog, private toastr: ToastrService) {
    this.createForm();
    this.locationHeaders = of(Array(12).fill(0).map((x, i) => i));
    this.arrayItems = of(Array(2).fill(0).map((x, i) => i));

  }

  ngOnInit() {

    const role = this.authservice.getRole();
    if (role) {
      if (role === 'admin') {
        forkJoin(this.umpService.getUmpires(), this.umpService.getLocation()).subscribe(res => {
          res[0].unshift({ FirstName: '#select', LastName: 'umpire', ID: 0 });
          res[1].unshift({ LocationName: '#select location', ID: 0 });
          this.umpires$ = of(res[0]).pipe(
            map(r => r.map(v => ({ label: v.FirstName + ' ' + v.LastName, value: v.ID }) as DropdownModel)),
          );
          this.locations$ = of(res[1]).pipe(
            map(r => r.map(v => ({ label: v.LocationName, value: v.ID }) as DropdownModel))
          );
        });
        this.getTimeArray();
        this.getAllSchedule();
        this.isDisable = false;
      } else {
        this.getAllScheduleByEmail();
        //  this.getAllScheduleByEmail();
        this.isDisable = true;

      }
    }


  }

  // main form
  createForm() {
    this.mainForm = this.fb.group({
      scheduleDate: ['', Validators.required],
      locations: this.fb.array([this.createLocationForm()]),
      scheduleTime: this.fb.array([])
    });
    this.mainForm.valueChanges.subscribe(res => {
    });
    const locArray = this.mainForm.get('locations') as FormArray;
    for (let i = 0; i <= 10; i++) {
      locArray.push(this.createLocationForm());

    }

    //  return this.mainForm;
  }
  // time form
  createTimeForm() {
    this.timeForm = this.fb.group({
      schTime: ['', Validators.required],
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
    this.locationForm = this.fb.group({
      location: ['0', Validators.required]
    });
    return this.locationForm;
  }
  createUmpireForm() {
    this.umpireForm = this.fb.group({
      umpire: ['0', Validators.required]
    });

    return this.umpireForm;
  }

  getAllSchedule() {
    this.isLoading = true;
    this.umpService.getAllSchedule().subscribe(res => {
      if (res.length > 0) {
        // tslint:disable-next-line:no-string-literal
        const sch = from(res);
        const group = sch.pipe(
          // tslint:disable-next-line:no-string-literal
          groupBy(p => p.ScheduleDate),
          mergeMap(group$ =>
            group$.pipe(reduce((acc, cur) => [...acc, cur], [`${group$.key}`]))
          ),
          // mergeMap(g => zip(of(g.key), g.pipe(toArray())),
          map(arr => ({ ScheduleDate: arr[0], schtime: arr.slice(1) } as Schedule))
        )
          .subscribe(sched => {
            this.schedule = {};
            this.schedule.schtime = [];
            this.schedule.location = [];
            this.schedule.ScheduleDate = sched.ScheduleDate;
            this.groupTime(sched.schtime);
            this.groupLocation(sched.schtime);
            //  this.schedule.schtime.push();
            this.schedules.push(this.schedule);

          });
        this.schedules.forEach((ele, i) => {
          this.createForm();
          this.mainForm.controls.scheduleDate.setValue(new Date(this.schedules[i].ScheduleDate));

          const timeArray = this.mainForm.get('scheduleTime') as FormArray;
          const locationArray = this.mainForm.get('locations') as FormArray;
          this.schedules[i].location.forEach((e, x) => {
            this.createLocationForm();
            this.locationForm.controls.location.setValue(e);
            locationArray.controls[x] = this.locationForm;
          });
          // timeArray.removeAt(0);
          this.schedules[i].schtime.forEach((elem, j) => {
            this.createTimeForm();
            const umpireArray = this.timeForm.get('lu') as FormArray;

            this.timeForm.controls.schTime.setValue(elem.ScheduleTime);

            timeArray.push(this.timeForm);

            elem.schUmpire.forEach((el, k) => {
              this.createUmpireForm();
              this.umpireForm.controls.umpire.setValue(el.UmpireID);
              umpireArray.controls[this.schedules[i].location.findIndex(loc=>loc=== parseInt(el.LocationID))] = this.umpireForm;
            });

          });
          this.scheduleForm.push(this.mainForm);
        });
      } else {
        this.scheduleForm.push(this.mainForm);
      }
      this.isLoading = false;

    });
  }

  getAllScheduleByEmail() {
    this.isLoading = true;
    this.umpService.getAllScheduleByUser(this.authservice.getUserName()).subscribe(res => {
      this.isLoading = false;
      this.addSchArray = res;
    });
  }
  groupTime(res: Time[]) {
    const sch = from(res);
    let time;
    const group = sch.pipe(
      // tslint:disable-next-line:no-string-literal
      groupBy(p => p.ScheduleTime),
      mergeMap(group$ =>
        group$.pipe(reduce((acc, cur) => [...acc, cur], [`${group$.key}`]))
      ),
      // mergeMap(g => zip(of(g.key), g.pipe(toArray())),
      map(arr => ({ ScheduleTime: arr[0], schUmpire: arr.slice(1) } as Time))
    )
      .subscribe(sched => {
        time = sched;
        this.schedule.schtime.push(time);
      });
    return time;
  }
  groupLocation(res: Time[]) {
    const sch = from(res);
    sch.pipe(
      // tslint:disable-next-line:no-string-literal
      groupBy(p => p.LocationID),
      mergeMap(group$ =>
        group$.pipe(reduce((acc, cur) => [...acc, cur], [`${group$.key}`]))
      ),
      // mergeMap(g => zip(of(g.key), g.pipe(toArray())),
      map(arr => ({ ScheduleTime: arr[0], schUmpire: arr.slice(1) } as Time))
    )
      .subscribe(sched => {
        this.schedule.location.push(Number(sched.ScheduleTime));
      });

  }

  // select change location ,umpire,time
  selectedLocation(e, i, j) {

    // this.addSch.LocationID = Number(e);
  }
  selectedUmpire(time, umpire, date, location) {

    if (time && umpire && date && location) {
      const dialogRef = this.dialog.open(ConfirmationComponent, {
        width: '200px'
      }).afterClosed().subscribe(res => {
        if (res === 'save') {
          this.addSch.ScheduleDate = date;
          this.addSch.UmpireID = umpire;
          this.addSch.LocationID = location;
          this.addSch.ScheduleTime = time;
          this.umpService.addSchedule(this.addSch).subscribe(() => {
            this.toastr.success('Umpire updated successfully');

          });
        }
      });

    }


  }
  selectedTime(e, x) {
    // this.mainForm.get('scheduleTime')[0]['schTime'].va
    // this.addSch.ScheduleTime = e;
  }

  addSchedule() {
    this.createForm();
    this.scheduleForm.push(this.mainForm);
  }
  dateChanged(e) {
    // this.addSch.ScheduleDate = e.value;
  }


  addRow(index) {
    const timeArray = this.scheduleForm[index].get('scheduleTime') as FormArray;
    timeArray.push(this.createTimeForm());
  }

  // addition functions

  getTimeArray() {
    let hours;
    let mints;
    let ampm;
    const times = [];
    for (let i = 480; i <= 1140; i += 5) {
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
    return this.timeForm.get('lu') as FormArray;
  }


  loc(e) {
    this.router.navigate(['location-map', e]);
  }
}


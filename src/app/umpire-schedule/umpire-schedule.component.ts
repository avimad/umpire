import { Component, OnInit } from '@angular/core';
import { Observable, of, forkJoin } from 'rxjs';
import { UmpireService } from '../services/umpire.service';
import { DropdownModel } from '../shared/models/dropdown-model';
import { map, mergeMap, flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-umpire-schedule',
  templateUrl: './umpire-schedule.component.html',
  styleUrls: ['./umpire-schedule.component.scss']
})
export class UmpireScheduleComponent implements OnInit {

  locations$: Observable<DropdownModel[]>;
  umpires$: Observable<DropdownModel[]>;
  locationHeaders: Observable<number[]>;

  arrayItems: Observable<number[]>;


  constructor(private umpService: UmpireService) {

    this.locationHeaders = of(Array(10).fill(0).map((x, i) => i));
    this.arrayItems = of(Array(2).fill(0).map((x, i) => i));
  }

  ngOnInit() {
    forkJoin(this.umpService.getUmpires(), this.umpService.getLocation()).subscribe(res => {
      this.umpires$ = of(res[0]).pipe(
        map(r => r.map(v => ({ label: v.FirstName, value: v.ID }) as DropdownModel))
      );
      this.locations$ = of(res[1]).pipe(
        map(r => r.map(v => ({ label: v.LocationName, value: v.ID }) as DropdownModel))
      );
    });

  }
  initSection() {

  }
  initSchedule() {
    // return new Form
  }
  addRow() {
    this.arrayItems.subscribe(res => {
      res.push(res.length + 1);
      this.arrayItems = of(res);
      console.log(this.arrayItems);
    });
  }
}


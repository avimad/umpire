import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, FormBuilder } from '@angular/forms';
import { LOCATIONS } from '../models/location';
import { UMPIRES } from '../models/umpire';

@Component({
  selector: 'app-umpire-schedule',
  templateUrl: './umpire-schedule.component.html',
  styleUrls: ['./umpire-schedule.component.scss']
})
export class UmpireScheduleComponent implements OnInit {
  displayedColumns = ['Time', 'LocationDropBox1', 'LocationDropBox2', 'LocationDropBox3', 'LocationDropBox4'];
  activeList = ['Yes', 'No'];
  dataSource = ELEMENT_DATA;
  locations = LOCATIONS;
  umpires = UMPIRES;

  form: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      test: this.createFormArray()
    });
    console.log(this.form)
  }

  ngOnInit() {
  }
  createFormArray(): FormArray {
    return new FormArray(this.dataSource.map(item => new FormGroup({
      time: new FormControl(item.Time),
      location1: new FormControl(),
      location2: new FormControl(),
      location3: new FormControl(),
      location4: new FormControl(),
      umpire1: new FormControl(item.UmpireBox1),
      umpire2: new FormControl(item.UmpireBox2),
      umpire3: new FormControl(item.UmpireBox3),
      umpire4: new FormControl(item.UmpireBox4)
    })));
  }

}
export interface Element {
  Time: string;
  UmpireBox1: string;
  UmpireBox2: string;
  UmpireBox3: string;
  UmpireBox4: string;
}

const ELEMENT_DATA: Element[] = [
  {
    Time: '6:30 AM', UmpireBox1: '#UmpireDropBox1',
    UmpireBox2: '#UmpireDropBox1', UmpireBox3: '#UmpireDropBox1', UmpireBox4: '#UmpireDropBox1'
  },

];

import { Component, OnInit, Input, OnChanges, Inject } from '@angular/core';
import { UmpireService } from '../services/umpire.service';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-location-map',
  templateUrl: './location-map.component.html',
  styleUrls: ['./location-map.component.scss']
})
export class LocationMapComponent implements OnInit, OnChanges {

  constructor(private umpService: UmpireService, private router: ActivatedRoute) { }
  res: any = {};
  ngOnChanges(): void {
  }
  ngOnInit() {
    this.router.params.subscribe(param => {
      this.umpService.getLocationById(param.id).subscribe(res => {
        console.log(res);
        this.res = res;
      });
    });
  }
  getNumber(data) {
    return Number(data);
  }


}

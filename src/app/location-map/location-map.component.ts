import { Component, OnInit, Input, OnChanges, Inject } from '@angular/core';
import { UmpireService } from '../services/umpire.service';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-location-map',
  templateUrl: './location-map.component.html',
  styleUrls: ['./location-map.component.scss']
})
export class LocationMapComponent implements OnInit, OnChanges {

  constructor(private umpService: UmpireService, private router: ActivatedRoute) { }
  res: any = {};
  public lat = 24.799448;
  public lng = 120.979021;
  public origin: any;
  public destination: any;
  ngOnChanges(): void {
  }
  ngOnInit() {
    this.umpService.getPosition().subscribe((res: Position) => {
      this.origin = { lat: res.coords.latitude, lng: res.coords.longitude };
    });
    // this.destination = { lat: 24.799524, lng: 120.975017 };
    this.router.params.subscribe(param => {
      this.umpService.getLocationById(param.id).subscribe(res => {

        // tslint:disable-next-line:no-string-literal
        this.destination = { lat: Number(res['latitude']), lng: Number(res['longitude']) };
        this.res = res;
      });
    });

  }

  getNumber(data) {
    return Number(data);
  }


}

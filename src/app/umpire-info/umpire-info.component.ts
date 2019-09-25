import { Component, OnInit } from '@angular/core';
import { UmpireInfoModel } from '../models/umpire-info-model';
import { UmpireService } from '../services/umpire.service';
import { Umpire } from '../models/umpire';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-umpire-info',
  templateUrl: './umpire-info.component.html',
  styleUrls: ['./umpire-info.component.scss']
})
export class UmpireInfoComponent implements OnInit {
  displayedColumns: string[] = ['FirstName', 'LastName', 'PhoneNumber'];
  umpiresInfo$: Observable<Umpire[]>;
  constructor(private umpireService: UmpireService) { }

  ngOnInit() {
    this.umpireService.getUmpires().subscribe(res => {
      this.umpiresInfo$ = of(res);
    });
  }

}

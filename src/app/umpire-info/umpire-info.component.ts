import { Component, OnInit } from '@angular/core';
import { UmpireInfoModel } from '../models/umpire-info-model';
import { UmpireService } from '../services/umpire.service';
import { Umpire } from '../models/umpire';
import { Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material';
import { AddUmpireComponent } from '../add-umpire/add-umpire.component';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-umpire-info',
  templateUrl: './umpire-info.component.html',
  styleUrls: ['./umpire-info.component.scss']
})
export class UmpireInfoComponent implements OnInit {
  displayedColumns: string[] = ['FirstName', 'LastName', 'PhoneNumber'];
  umpiresInfo$: Observable<Umpire[]>;
  constructor(private umpireService: UmpireService,
              private dialog: MatDialog, private authservice: AuthService, private toastr: ToastrService) { }

  ngOnInit() {
    this.getUmpires();
  }
  openAddUmpire() {
    const dialofRef = this.dialog.open(AddUmpireComponent, {
      width: '500px'
    });
    dialofRef.afterClosed().subscribe(res => {
      if (res) {
        this.toastr.success('Umpire added successfully');
        this.getUmpires();
      }
    });
  }
  getUmpires() {
    this.umpireService.getUmpires().subscribe(res => {
      this.umpiresInfo$ = of(res);
    });
  }
}

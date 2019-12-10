import { Component, OnInit } from '@angular/core';
import { UmpireInfoModel } from '../models/umpire-info-model';
import { UmpireService } from '../services/umpire.service';
import { Umpire } from '../models/umpire';
import { Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material';
import { AddUmpireComponent } from '../add-umpire/add-umpire.component';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationComponent } from '../confirmation/confirmation.component';

@Component({
  selector: 'app-umpire-info',
  templateUrl: './umpire-info.component.html',
  styleUrls: ['./umpire-info.component.scss']
})
export class UmpireInfoComponent implements OnInit {
  displayedColumns: string[];
  umpiresInfo$: Observable<Umpire[]>;
  constructor(private umpireService: UmpireService,
    private dialog: MatDialog, public authservice: AuthService, private toastr: ToastrService) { }

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
      if (this.authservice.getRole() === 'admin') {
       this.displayedColumns = ['FirstName', 'LastName', 'PhoneNumber', 'Action'];
      } else {
        this.displayedColumns = ['FirstName', 'LastName', 'PhoneNumber'];
      }
      this.umpiresInfo$ = of(res);
    });
  }
  deleteUmpire(umpire: Umpire) {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '200px'
    }).afterClosed().subscribe(res => {
      if (res === 'save') {
        this.umpireService.deleteUmpire(umpire.ID).subscribe(res => {
          this.getUmpires();
        });
      }
    });

  }
}

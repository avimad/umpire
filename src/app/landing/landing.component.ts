import { Component, OnInit } from '@angular/core';
import { UmpireService } from '../services/umpire.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor(private service: UmpireService) { }
  ebll = '';
  sful = '';
  bb = '';
  brl1 = '';
  cdc1 = '';
  dbl1 = '';
  ll1 = '';
  ub1 = '';
  wbb1 = '';
  ngOnInit() {
    this.service.getFiles().subscribe(res => {
      this.ebll = 'data:image/png;base64,' + res['East Boynton Little League.png'];
      this.sful = 'data:image/png;base64,' + res['South Florida UMPS logo2.jpg'];
      this.bb = 'data:image/png;base64,' + res['basball_background.jpg'];
      this.brl1 = 'data:image/png;base64,' + res['brl1.png'];
      this.cdc1 = 'data:image/png;base64,' + res['cdc1.png'];
      this.dbl1 = 'data:image/png;base64,' + res['dbl1.jpg'];
      this.ll1 = 'data:image/png;base64,' + res['ll1.jpg'];
      this.ub1 = 'data:image/png;base64,' + res['ub1.png'];
      this.wbb1 = 'data:image/png;base64,' + res['wbb1.png'];
      console.log(res['East Boynton Little League.png']);
    });
  }

}

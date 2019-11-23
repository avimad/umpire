import { Component, OnInit } from '@angular/core';
import { UmpireService } from '../services/umpire.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  color2: any;
  constructor(private service: UmpireService) { }

  ngOnInit() {
    this.service.getColor().subscribe(res => {
      this.color2 = res;
    });
  }
  changeColor(e) {
    this.color2 = e;

  }
  saveColor() {
    this.service.setColor(this.color2).subscribe(res => {
      document.getElementsByClassName('bg-secondary')[0]['style'].background = this.color2;
    });
  }

}

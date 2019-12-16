import { Component, OnInit } from '@angular/core';
import { UmpireService } from '../services/umpire.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  color2: any;
  constructor(private service: UmpireService, private toastr: ToastrService) { }

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
  upload(files, name) {
    console.log(files);
    if (files.length === 0) {
      return;
    }
    const formData = new FormData();

    for (const file of files) {
      formData.append(name, file, file.name);
    }
    console.log(formData);
    this.service.uploadpic(formData).subscribe(() => {
      this.toastr.success('logo updated');
    }, err => {
     this.toastr.error('Error');
    });
  }
}

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
  selectedFile: File;
  imageType: string;
  constructor(private service: UmpireService, private toastr: ToastrService) { }

  ngOnInit() {
    this.service.getColor().subscribe(res => {
      this.color2 = res;
    });
    this.imageType="Image Type";
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0]
  }
  imageTypeChangeHandler(event)
  {
    this.imageType = event.target.value;

  }

  changeColor(e) {
    this.color2 = e;

  }
  saveColor() {
    this.service.setColor(this.color2).subscribe(res => {
      document.getElementsByClassName('bg-secondary')[0]['style'].background = this.color2;
    });
  }
  upload() {
    if (this.selectedFile.size === 0) {
      return this.toastr.error('Select Image');
    }
    debugger;
    if(this.imageType=="NotSelected" || this.imageType=="Image Type")
    {
      
     return this.toastr.error('Select Image Type');
       
    }
    const formData = new FormData();
    //console.log("Image Type",this.imageType);
    formData.append(this.imageType, this.selectedFile, this.selectedFile.name);
    this.service.uploadpic(formData).subscribe(() => {
      this.toastr.success('Image Uploaded');
    }, err => {
     this.toastr.error('Error! Please Try Again');
    });
  }
}

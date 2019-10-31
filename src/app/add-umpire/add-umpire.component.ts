import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UmpireService } from '../services/umpire.service';
import { Umpire } from '../models/umpire';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-umpire',
  templateUrl: './add-umpire.component.html',
  styleUrls: ['./add-umpire.component.scss']
})
export class AddUmpireComponent implements OnInit {
  umpireForm: FormGroup;
  umpire: Umpire = {};

  constructor(private fb: FormBuilder, private umpservice: UmpireService,
              private dialogRef: MatDialogRef<AddUmpireComponent>) { }

  ngOnInit() {
    this.umpireForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneno: ['', [Validators.required]]
    });
  }
  submit() {
    if (this.umpireForm.valid) {
      this.umpire.FirstName = this.umpireForm.value.firstname;
      this.umpire.LastName = this.umpireForm.value.lastname;
      this.umpire.PhoneNumber = this.umpireForm.value.phoneno;
      this.umpire.EmailAddress = this.umpireForm.value.email;
      this.umpire.UserType = 'umpire';

      this.umpservice.addUmpire(this.umpire).subscribe(res => {
        this.dialogRef.close(true);
      });
    }
  }
}

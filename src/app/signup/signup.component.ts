import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UmpireService } from '../services/umpire.service';
import { Users } from '../models/users';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  user: Users = {};
  isSuccess = false;
  message = '';

  constructor(private fb: FormBuilder, private umpservice: UmpireService) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneno: ['', [Validators.required]],
      description: ['']
    });

  }
  submit() {
    this.user.FirstName = this.signupForm.controls.firstname.value;
    this.user.LastName = this.signupForm.controls.lastname.value;
    this.user.Email = this.signupForm.controls.email.value;
    this.user.PhoneNumber = this.signupForm.controls.phoneno.value;
    this.user.Description = this.signupForm.controls.description.value;

    this.umpservice.signUp(this.user).subscribe(res => {
      this.message = res['message'];
      this.isSuccess = true;
    });
  }

}

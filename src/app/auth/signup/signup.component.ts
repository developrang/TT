import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  successMessage:string;
  errorMessage:string;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.successMessage
    .subscribe(
      (data) => {
        this.successMessage = data;
      }
    );

    this.authService.errorMessage
    .subscribe(
      (data) => {
        this.errorMessage = data;
      }
    );
  }

  onSignup(form: NgForm) {
    const fname = form.value.fname;
    const lname = form.value.lname;
    const email = form.value.email;
    const password = form.value.password;
    this.authService.signupUser(fname, lname, email, password);
  }

}

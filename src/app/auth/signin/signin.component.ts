import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  message:string;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.loginError
    .subscribe(
      (error) => {
        this.message = error;
      }
    );
  }

  onSignin(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.authService.signinUser(email, password);  
  }
  
}

import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'    
  })
}; 

@Injectable()
export class AuthService {
  token;
  message;
  loginError = new EventEmitter<string>();
  successMessage = new EventEmitter<string>();
  errorMessage = new EventEmitter<string>();
  Authenticated = new EventEmitter<boolean>();
  
  api:string = 'http://192.168.0.103:8080/TimeTrackerApp/';

  constructor(private router: Router, private http: HttpClient) {}

  signupUser(fname:string, lname:string, email: string, password: string) {
    const user = {"firstName":fname, "lastName":lname, "emailId":email, "password":password};   
    this.http.post(this.api + 'register', user, httpOptions)
    .subscribe( data => {
      this.successMessage.next("User added Successfully!");
    },
    err => {
      this.errorMessage.next("Email ID already exist!");
    }
  )
    
  }

  signinUser(email: string, password: string) {
    const user = {"emailId":email, "password":password};   
    this.http.post(this.api + 'login', user, httpOptions)
    .subscribe( token => {
      this.token = token;      
      localStorage.setItem('TtToken', JSON.stringify(token));
      this.Authenticated.next(this.isAuthenticated());
      this.router.navigate(['/']);
    },
    err => {
      this.loginError.next("Invalid Email ID or Password");      
    }
  )
   
  }

  logout() {        
    this.token = null;      
    localStorage.removeItem('TtToken');    
    this.Authenticated.next(this.isAuthenticated());
    this.router.navigate(['/']);
  }

  getToken() {     
    return localStorage.getItem('TtToken'); 
  }

  isAuthenticated() {
    // return this.token != null;
    return localStorage.getItem('TtToken') != null;
  }
}

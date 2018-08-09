import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import Employee from '../employees/employee.model';
import Attendance from '../attendance/attendance.model';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  recordsForm: FormGroup;
  constructor(private http: HttpClient) { }

  employee : Employee;
  attendance : Attendance[] = [];

  api:string = 'http://192.168.0.103:8080/TimeTrackerApp/attendance/';

  ngOnInit() {     
      let emailId = '';
      let quantity;     
      
      this.recordsForm = new FormGroup({
        'email': new FormControl(emailId, Validators.required),
        'quantity' : new FormControl(quantity)      
      });
  }

  onSubmit() {    
    this.getRecords(this.recordsForm.value);  
  }

 

  getRecords(record):Attendance[] {  
    let params = new HttpParams()
    params = params.append ('emailId', record.email); 
    params = params.append('quantity', record.quantity || 0);  

    this.http.get<Attendance[]>(this.api + 'getByEmail' , {params:params})
       .subscribe(
       data => {  
         this.attendance = data;  
         console.log(this.attendance);
       }      
     );             
     return this.attendance.slice();
   }



  
}

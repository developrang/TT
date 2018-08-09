import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Attendance from './attendance.model';
import  Employee  from '../employees/employee.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'    
  })
}; 

@Injectable()
export class AttendanceService {
  recordsChanged = new EventEmitter<Attendance[]>();
  employees : Employee[] = [];
  api:string = 'http://192.168.0.103:8080/TimeTrackerApp/attendance/';
    

  private records: Attendance[] = [];

  constructor(private http: HttpClient) {
     this.getRecords();        
     this.getEmployees();   
     this.recordsChanged.next(this.records.slice()); 
  }  

  getEmployees():Employee[] {     
    this.http.get<Employee[]>('http://192.168.0.103:8080/TimeTrackerApp/employee/')
       .subscribe(
       data => {          
        this.employees = data;          
       }      
     );        
     return this.employees.slice();
   }

  setRecords(records: Attendance[]) {    
    this.records = records;   
    this.recordsChanged.next(this.records.slice());
  }

  getRecords():Attendance[] {     
   this.http.get<Attendance[]>(this.api)
      .subscribe(
      data => {  
        this.setRecords(data);          
      }      
    );   
    this.recordsChanged.next(this.records.slice());
    return this.records.slice();
  }
  

  getRecord(index: number) {   
    let cRec = this.records.filter(rec => {     
      return rec.id == index;
    });    
    return cRec;
  }

   addRecord (record: Attendance) {
    const rec = JSON.stringify(record);    
     this.http.post<Attendance>(this.api, rec, httpOptions)
      .subscribe(
        () => {
          this.getRecords();   
        },
        err => {
          console.log("Error occured" + err);
        }
      );   
  }

  updateRecord(index: number, newRecord: Attendance) {
    const record = JSON.stringify(newRecord);   
     this.http.put<Attendance>(this.api + index, record, httpOptions)
      .subscribe(
        () => {
          this.getRecords();    
        },
        err => {
          console.log("Error occured" + err);
        }
      );   
  }

  deleteRecord(index: number) {
    this.http.delete(this.api + index)
    .subscribe(
      () => {       
        this.getRecords();        
      },
      err => {
        console.log(err);
      }
    );  
  }
}

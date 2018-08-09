import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import  Employee  from './employee.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'    
  })
}; 


@Injectable()
export class EmployeeService {
    employeesChanged = new EventEmitter<Employee[]>();

  private employees: Employee[] = [ ];
  api:string = 'http://192.168.0.103:8080/TimeTrackerApp/employee/';

  constructor(private http: HttpClient) {
     this.getEmployees();
     this.employeesChanged.next(this.employees.slice());
  }  


  setEmployees(employees: Employee[]) {
    this.employees = employees;
    this.employeesChanged.next(this.employees.slice());
  }

  getEmployees():Employee[] {     
   this.http.get<Employee[]>(this.api)
      .subscribe(
      data => {          
        this.setEmployees(data);          
      }      
    );   
    this.employeesChanged.next(this.employees.slice());
    return this.employees.slice();
  }
  

  getEmployee(index: number) {   
    let cEmp = this.employees.filter(emp => {     
      return emp.id == index;
    });    
    return cEmp;
  }
  

  addEmployee (employee: Employee) {
    const emp = JSON.stringify(employee);
    console.log(emp);
     this.http.post<Employee>(this.api, emp, httpOptions)
      .subscribe(
        () => {
          this.getEmployees();   
        },
        err => {
          console.log("Error occured" + err);
        }
      );   
  }

  updateEmployee(index: number, newEmployee: Employee) {    
    const emp = JSON.stringify(newEmployee);   
     this.http.put<Employee>(this.api + index, emp, httpOptions)
      .subscribe(
        () => {
          this.getEmployees();   
        },
        err => {
          console.log("Error occured" + err);
        }
      );   
  }

  deleteEmployee(index: number) {
    this.http.delete(this.api + index)
    .subscribe(
      () => {       
        this.getEmployees();
        console.log("res called!");
      },
      err => {
        console.log(err);
      }
    );    
   
   
  }
}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Employee from '../employee.model';
import { EmployeeService } from '../employees.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
searchText:string = '';
employees: Employee[] = [];

  constructor( private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.employeeService.employeesChanged
    .subscribe(
      (employees:Employee[]) => {
        this.employees = employees;
      }
    );
    this.employees = this.employeeService.getEmployees();   
    
  }

  onNewEmployee(){
     this.router.navigate(['new'], {relativeTo: this.route});
  }

  onEmployeeSelected(ID){
    this.router.navigate([ID], {relativeTo: this.route});
  }
}

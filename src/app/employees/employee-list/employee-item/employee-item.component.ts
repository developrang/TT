import { Component, OnInit, Input } from '@angular/core';

import Employee from '../../employee.model';

@Component({
  selector: '[app-employee-item]',
  templateUrl: './employee-item.component.html',
  styleUrls: ['./employee-item.component.css']
})
export class EmployeeItemComponent implements OnInit {
@Input() employee : Employee;

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AttendanceService } from '../attendance.service';
import Employee from '../../employees/employee.model';

@Component({
  selector: 'app-attendance-edit',
  templateUrl: './attendance-edit.component.html',
  styleUrls: ['./attendance-edit.component.css']
})
export class AttendanceEditComponent implements OnInit {
  id: number;
  editMode = false;
  attendanceForm: FormGroup;
  employees : Employee[];
  constructor(private route: ActivatedRoute,
              private attendanceService: AttendanceService,
              private router: Router) {
  }
  ngOnInit() {
    this.employees = this.attendanceService.employees;    
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        }
      );
  }

  onSubmit() {    
    if (this.editMode) {
      this.attendanceService.updateRecord(this.id, this.attendanceForm.value);
    } else {
      this.attendanceService.addRecord(this.attendanceForm.value);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() {
    let recEmailId = '';
    let recStartTime = '';
    let recEndTime = '';   
    
    

    if (this.editMode) {
      const Record = this.attendanceService.getRecord(this.id)[0];
      recEmailId = Record.employee.emailId;
      recStartTime = Record.startTime;
      recEndTime = Record.endTime;     
    }  

    this.attendanceForm = new FormGroup({
      'emailId': new FormControl(recEmailId, Validators.required),
      'startTime' : new FormControl(recStartTime, Validators.required),
      'endTime': new FormControl(recEndTime, Validators.required),
      
    });
  }

}

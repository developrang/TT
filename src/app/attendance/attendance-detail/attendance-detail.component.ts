import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import  Attendance  from '../attendance.model';
import { AttendanceService } from '../attendance.service';


@Component({
  selector: 'app-attendance-detail',
  templateUrl: './attendance-detail.component.html',
  styleUrls: ['./attendance-detail.component.css']
})
export class AttendanceDetailComponent implements OnInit {

  record: Attendance;
  id: number;  

  constructor(private attendanceService: AttendanceService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];         
          this.record = this.attendanceService.getRecord(this.id)[0];          
        }
      );
  }

  onEditRecord() {
    this.router.navigate(['edit'], {relativeTo: this.route});
   
  }

  onDeleteRecord() {
    this.attendanceService.deleteRecord(this.id);
    this.router.navigate(['/attendance']);
  }
}

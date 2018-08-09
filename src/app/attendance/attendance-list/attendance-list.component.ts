import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AttendanceService } from '../attendance.service';
import { HttpClient } from '@angular/common/http';
import Attendance from '../attendance.model';

@Component({
  selector: 'app-attendance-list',
  templateUrl: './attendance-list.component.html',
  styleUrls: ['./attendance-list.component.css']
})
export class AttendanceListComponent implements OnInit {

  searchRecord:string;
  records: Attendance[] = [];

  constructor( private attendanceService: AttendanceService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.attendanceService.recordsChanged
    .subscribe(
      (records:Attendance[]) => {
        this.records = records;
      }
    );
    this.records = this.attendanceService.getRecords();   
    
  }

  onNewRecord(){
     this.router.navigate(['new'], {relativeTo: this.route});
  }

  onRecordSelected(ID){
    this.router.navigate([ID], {relativeTo: this.route});
  }
}

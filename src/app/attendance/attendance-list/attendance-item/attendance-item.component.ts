import { Component, OnInit, Input } from '@angular/core';
import Attendance from '../../attendance.model';

@Component({
  selector: '[app-attendance-item]',
  templateUrl: './attendance-item.component.html',
  styleUrls: ['./attendance-item.component.css']
})
export class AttendanceItemComponent implements OnInit {
 @Input() record : Attendance;

 start;
 end;
 workingHours;

 constructor() { }

 timeConvert(n) {
  var num = n;
  var hours = (num / 60);
  var rhours = Math.floor(hours);
  var minutes = (hours - rhours) * 60;  
  var rminutes:any = Math.round(minutes);
  rminutes = rminutes < 10 ? '0'+rminutes : rminutes;  
  return rhours + ":" + rminutes ;
  }

  ngOnInit() {
    this.start = new Date(this.record.startTime).getTime();
    this.end = new Date(this.record.endTime).getTime();   
    this.workingHours = this.timeConvert((Math.abs(this.end - this.start) / 60000));

  }

}

import  Employee  from '../employees/employee.model';
class Attendance {
    public employee: Employee;
    public startTime: string;
    public endTime: string;
    public id? : number;
  
    constructor(employee: Employee, startTime: string, 
        endTime: string, id?:number) {
      this.employee = employee;
      this.startTime = startTime;
      this.endTime = endTime;     
      this.id = id;
      
    }
  }

  export default Attendance;
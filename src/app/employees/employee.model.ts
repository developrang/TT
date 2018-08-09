 class Employee {
    public firstName: string;
    public lastName: string;
    public imagePath: string;
    public emailId: string;
    public gender: string;
    public id? : number;
  
    constructor(firstName: string, lastName: string, 
                imagePath: string, emailId: string, 
                gender:string, id?:number) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.imagePath = imagePath;
      this.emailId = emailId;
      this.gender = gender;
      this.id = id;
      
    }
  }

  export default Employee;
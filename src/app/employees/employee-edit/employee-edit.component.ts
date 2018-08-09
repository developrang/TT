import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { EmployeeService } from '../employees.service';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {

  id: number;
  editMode = false;
  employeeForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private employeeService: EmployeeService,
              private router: Router) {
  }

  ngOnInit() {
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
    // const newRecipe = new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingredients']);
    if (this.editMode) {
      this.employeeService.updateEmployee(this.id, this.employeeForm.value);
    } else {
      this.employeeService.addEmployee(this.employeeForm.value);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() {
    let empFirstName = '';
    let empLastName = '';
    let empImagePath = '';
    let empGender = '';
    let empEmailId = '';
    

    if (this.editMode) {
      const employee = this.employeeService.getEmployee(this.id)[0];
      empFirstName = employee.firstName;
      empLastName = employee.lastName;
      empImagePath = employee.imagePath;
      empGender = employee.gender;
      empEmailId = employee.emailId;
    }  

    this.employeeForm = new FormGroup({
      'firstName': new FormControl(empFirstName, Validators.required),
      'lastName' : new FormControl(empLastName, Validators.required),
      'imagePath': new FormControl(empImagePath, Validators.required),
      'emailId': new FormControl(empEmailId, Validators.required),
      'gender': new FormControl(empGender, Validators.required)
    });
  }

}

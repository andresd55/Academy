import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/core/services/shared/shared.service';

declare var $: any;

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css']
})
export class CreateStudentComponent implements OnInit {
  registerFormLogin: FormGroup;
  userCreated = false;
  showErrorText = "";
  showError = false;
  submitted = false;

  Grades = [
    {
      code: '1',
      name: 'Sexto', 
    },
    {
      code: '2',
      name: 'Septimo', 
    },
    {
      code: '3',
      name: 'Octavo', 
    },
    {
      code: '4',
      name: 'Noveno', 
    },
    {
      code: '5',
      name: 'Decimo', 
    },
    {
      code: '11',
      name: 'Once', 
    },
  ];

  Courses = [
    {
      code: '1',
      name: 'A', 
    },
    {
      code: '2',
      name: 'B', 
    },
    {
      code: '3',
      name: 'C', 
    }
  ];

  constructor(private router: Router, private formBuilder: FormBuilder, 
    private sharedService: SharedService) { }

  ngOnInit(): void {
    this.getFormLoginUser();
  }

  get f() {
    return this.registerFormLogin.controls;
  }

  private getFormLoginUser() {
    return (this.registerFormLogin = this.formBuilder.group({
      nombres: ['', [Validators.required]],
      apellidos: ['', Validators.required],
      correo: ['', Validators.required],
      genero: ['', Validators.required],
      idGrado: ['', Validators.required],
      idCurso: ['', Validators.required]
    }));
  }

  createStudent() {
    this.submitted = true;
    console.log(this.registerFormLogin.value);
    if(this.registerFormLogin.valid) {
      this.sharedService.createStudent(this.registerFormLogin.value).subscribe(
        (response) => {
          if (response) {
            this.userCreated = true;
          } 
        },
        (error) => {
          this.showError = true;
          this.showErrorText = error.error.message;
        }
      );
     
    }
  }

  IsValid(control: string): boolean {
    return this.registerFormLogin.get(control).valid;
  }

  closeConfirmation() {
    this.userCreated = false;
    this.router.navigate(['home/notes']);
  }

  handleFileInput(target: any) {
  } 

}

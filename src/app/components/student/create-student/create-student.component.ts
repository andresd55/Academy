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

  Grades = [];

  Courses = [];

  Subjects = [];

  constructor(private router: Router, private formBuilder: FormBuilder, 
    private sharedService: SharedService) { }

  ngOnInit(): void {
    this.getGrades();
    this.getCourses();
    this.getSubjects();
    this.getFormLoginUser();
  }

  getGrades() {
    this.sharedService.getGrados().subscribe(
      (response) => {
        this.Grades = response;
      },
      (error) => {
      }
    );
  }

  getCourses() {
    this.sharedService.getCursos().subscribe(
      (response) => {
        this.Courses = response;
      },
      (error) => {
      }
    );
  }

  getSubjects() {
    this.sharedService.getMaterias().subscribe(
      (response) => {
        this.Subjects = response;
      },
      (error) => {
      }
    );
  }

  get f() {
    return this.registerFormLogin.controls;
  }

  private getFormLoginUser() {
    return (this.registerFormLogin = this.formBuilder.group({
      nombres: ['', [Validators.required]],
      apellidos: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      genero: ['', Validators.required],
      idGrado: ['', Validators.required],
      idCurso: ['', Validators.required],
      idMateriaDocente: ['', Validators.required],
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

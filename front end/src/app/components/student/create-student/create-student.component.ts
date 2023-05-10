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

  Students = [];

  Grades = [];

  Courses = [];

  Subjects = [];

  constructor(private router: Router, private formBuilder: FormBuilder, 
    private sharedService: SharedService) { }

  ngOnInit(): void {
    this.getGrades();
    this.getCourses();
    this.getSubjects();
    this.getStudents();
    this.getFormLoginUser();
  }

  getStudents() {
    this.sharedService.getStudents().subscribe(
      (response) => {
        const idDefaultValueCurso = 2;
        const idDefaultValue = 1;
        this.Students = response.filter(x => x.curso.idCurso == idDefaultValueCurso
          && x.grado.idGrado == idDefaultValue);
        this.Students = this.Students.map((estudiante: any) => {
          return {
            ...estudiante,
            displayLabel: estudiante.usuario.identificacion + ' - ' + estudiante.usuario.nombres + ' ' + estudiante.usuario.apellidos 
          };
        });
        console.log(this.Students);
      },
      (error) => {
      }
    );
  }

  getGrades() {
    this.sharedService.getGrados().subscribe(
      (response) => {
        const idDefaultValue = 1;
        this.Grades = response.filter(x => x.idGrado != idDefaultValue);
      },
      (error) => {
      }
    );
  }

  getCourses() {
    this.sharedService.getCursos().subscribe(
      (response) => {
        const idDefaultValue = 2;
        this.Courses = response.filter(x => x.idCurso != idDefaultValue);
      },
      (error) => {
      }
    );
  }

  getSubjects() {
    this.sharedService.getMaterias().subscribe(
      (response) => {
        this.Subjects = response;
        console.log(this.Subjects)
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
      idEstudiante: ['', Validators.required],
      idGrado: ['', Validators.required],
      idCurso: ['', Validators.required],
      idUsuario: ['', []],
      arrayIdMaterias: ['', Validators.required],
    }));
  }

  createStudent() {
    this.submitted = true;
    console.log(this.registerFormLogin.value);
    if(this.registerFormLogin.valid) {
      const usuario = this.Students.filter(student => student.idEstudiante == 
        this.registerFormLogin.controls.idEstudiante.value);
      this.registerFormLogin.controls.idUsuario.setValue(usuario[0].idUsuario);
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

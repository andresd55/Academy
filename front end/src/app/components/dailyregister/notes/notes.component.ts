import { AfterContentChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ExcelService } from 'src/app/core/services/excel/excel.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { environment } from 'src/environments/environment';
import { SharedService } from 'src/app/core/services/shared/shared.service';

declare var $: any;

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit, AfterContentChecked {
  registerFormFails: FormGroup;
  registerFormGrades: FormGroup;
  registerFormComment: FormGroup;
  registerFormFilter: FormGroup;
  itemsBreadcrumb = [
    { label: 'Home', url: '/home' },
    { label: 'Registro Diario', url: 'notes' },
    {
      label: 'Notas, Asistencias, Observaciones',
      url: 'notes',
      current: true,
    },
  ];
  showfilters = false;
  students = [];
  displayFails: boolean = false;
  displayGrades: boolean = false;
  displayComments: boolean = false;
  displayConfirmComment: boolean = false;
  indicatorButtonComment = false;
  lang = 'en';
  submitted: boolean;
  indicatorButton = false;
  customers = [];
  totalRecords: number = 0;
  currentPage: number = 1;
  pageLenght = environment.pageLenght;
  notDownloadExcel = false;
  materiaEstudiante: any;
  student: any; 
  currentUserAplication: any;

  Grades = [];

  Courses = [];

  Subjects = [];

  landscape = window.matchMedia("(orientation: landscape)");

  constructor(
    private formBuilder: FormBuilder,
    private excelService: ExcelService,
    private ref: ChangeDetectorRef,
    private sharedService: SharedService
  ) { 
    this.landscape.addEventListener("change", ev => {
      window.location.reload();
    });
  }
 
  ngOnInit(): void {
    //From
    this.getFormFilter();
    this.getFormFails();
    this.getFormGrades();
    this.getFormComment();
    this.getGrades();
    this.getCourses();
    this.getSubjects();
    //Services
    this.currentUserAplication = JSON.parse(localStorage.getItem('user'));
    const idRolEstuidiante = 2;
    let parameters = '';
    if(this.currentUserAplication.rol == idRolEstuidiante){
      parameters += '?idMateria=0&idGrado=0&idCurso=0&usuario='+this.currentUserAplication.usuario;;
    } else {
      parameters += '';
    }
    this.getStudents(parameters);
  }

  filter() {
    let parameters = '';
    if(this.registerFormFilter.controls.idMateria.value) {
      parameters += '?idMateria='+this.registerFormFilter.controls.idMateria.value;
    } else {
      parameters += '?idMateria=0';
    }
    if(this.registerFormFilter.controls.idGrado.value) {
        parameters += '&idGrado='+this.registerFormFilter.controls.idGrado.value;
    } else {
      parameters += '&idGrado=0';
    }
    if(this.registerFormFilter.controls.idCurso.value) {
        parameters += '&idCurso='+this.registerFormFilter.controls.idCurso.value;
    } else {
      parameters += '&idCurso=0';
    }
    const idRolDocente = 1;
    if(this.currentUserAplication.rol != idRolDocente){
      parameters += '&usuario='+this.currentUserAplication.usuario;
    } else {
      parameters += '&usuario=';
    }
    console.log(parameters);
    this.getStudents(parameters);
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
      },
      (error) => {
      }
    );
  }

  getStudents(parameters) {
    this.sharedService.getReport(parameters).subscribe(
      (response) => {
        const idDefaultValueCurso = 2;
        const idDefaultValue = 1;
        this.students = response.filter(x => x.estudiante.curso.idCurso != idDefaultValueCurso
          && x.estudiante.grado.idGrado != idDefaultValue);

        this.filterTable();
      },
      (error) => {
      }
    );
  }
  
  
  filterTable(){
    $("app-search-selector-principal input").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $("table tbody tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
  }
  
  
  ngAfterContentChecked(): void {
    this.ref.detectChanges();
  }

  getFormFails(){
    return (this.registerFormFails = this.formBuilder.group({
      faltas: ['', [Validators.max(10), Validators.required]]
    }));
  }

  getFormGrades(){
    return (this.registerFormGrades = this.formBuilder.group({
      nota1: ['', [Validators.max(10),Validators.nullValidator]],
      nota2: ['', [Validators.max(10),Validators.nullValidator]],
      nota3: ['', [Validators.max(10),Validators.nullValidator]]
    }));
  }

  getFormComment() {
    return (this.registerFormComment = this.formBuilder.group({
      observation: ['', [Validators.maxLength(1000), Validators.required]]
    }));
  }

  getFormFilter() {
    return (this.registerFormFilter = this.formBuilder.group({
      idMateria: ['', Validators.nullValidator],
      idGrado: ['', Validators.nullValidator],
      idCurso: ['', Validators.nullValidator]
    }));
  }

  closeConfirmation(): void {
    this.displayConfirmComment = false;
  }

  onSubmitFails(): void {
    this.displayFails = false;
    this.materiaEstudiante.faltas = this.registerFormFails.controls.faltas.value;
    this.saveMateriaEstudiante();
  }

  onSubmitGrades(): void {
    this.displayGrades = false;
    this.materiaEstudiante.nota1 = this.registerFormGrades.controls.nota1.value;
    this.materiaEstudiante.nota2 = this.registerFormGrades.controls.nota2.value;
    this.materiaEstudiante.nota3 = this.registerFormGrades.controls.nota3.value;
    this.saveMateriaEstudiante();
  }

  onSubmitCommet(): void {
    this.displayComments = false;
    this.materiaEstudiante.observacion = this.registerFormComment.controls.observation.value;
    this.saveMateriaEstudiante();
  }

  saveMateriaEstudiante() {
    console.log(this.materiaEstudiante);
    this.sharedService.updateMateriaEstudiante(this.materiaEstudiante).subscribe(
      (response) => {
        this.displayConfirmComment = true;
        this.getStudents('');
      },
      (error) => {
      }
    );
  }

  public showPanelFilter() {
    this.showfilters = !this.showfilters;
  }

  showPanelFails(dato: any) {
    this.displayFails = true;
    this.registerFormFails.controls.faltas.setValue(dato.faltas);
    this.mapMateriaEstudiante(dato);
  }

  showPanelGrades(dato: any) {
    this.displayGrades = true;
    this.registerFormGrades.controls.nota1.setValue(dato.nota1);
    this.registerFormGrades.controls.nota2.setValue(dato.nota2);
    this.registerFormGrades.controls.nota3.setValue(dato.nota3);
    this.mapMateriaEstudiante(dato);
  }

  showPanelComment(dato: any) {
    this.displayComments = true;
    this.registerFormComment.controls.observation.setValue(dato.observacion);
    this.mapMateriaEstudiante(dato);
  }

  mapMateriaEstudiante(dato) {
    this.student = dato;
    this.materiaEstudiante = { 
      idMateriaEstudiante: dato.idMateriaEstudiante,
      idEstudiante: dato.idEstudiante,
      idMateriaDocente: dato.idMateriaDocente,
      faltas: dato.faltas,
      nota1: dato.nota1,
      nota2: dato.nota2,
      nota3: dato.nota3,
      observacion : dato.observacion
    };
  }

  clearFilter() {
    this.registerFormFilter.reset();
  }

  paginate(event) {
    this.currentPage = event.page + 1;
    this.pageLenght = event.rows;
  }

  exportAs(type: string): void {
    const columns = [
      { title: "Nombre Estudiante", dataKey: "Nombre" },
      { title: "Grado", dataKey: "Grado" },
      { title: "Curso", dataKey: "Curso" },
      { title: "Materia", dataKey: "Materia" },
      { title: "Faltas", dataKey: "Fallas" },
      { title: "Nota 1", dataKey: "Nota 1" },
      { title: "Nota 2", dataKey: "Nota 2" },
      { title: "Nota 3", dataKey: "Nota 3" },
      { title: "Observaciones", dataKey: "Observaciones" }
    ];
    let body: any[] = [];

    this.students.map((s) => {
      body.push({
        'Nombre': s.estudiante.nombres + ' ' + s.estudiante.apellidos,
        'Grado': s.estudiante.grado.nombre,
        'Curso': s.estudiante.curso.nombre,
        'Materia': s.idMateriaEstudiante,
        'Fallas': s.faltas,
        'Nota 1': s.nota1,
        'Nota 2': s.nota2,
        'Nota 3': s.nota3,
        'Observaciones': s.observacion,
      });
    });
    this.notDownloadExcel = !(this.students.length > 0)!;
    if (this.students.length > 0) {
      if(type === 'PDF') {
        this.excelService.exportPdf(columns, body, 'Reporte De Estudiantes');
      } else {
        this.excelService.exportAsExcelFile(body, 'Resultado Busqueda');
      }
    }
  }
}

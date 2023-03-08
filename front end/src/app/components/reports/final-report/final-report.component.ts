import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExcelService } from 'src/app/core/services/excel/excel.service';
import { environment } from 'src/environments/environment';
import { SharedService } from 'src/app/core/services/shared/shared.service';

declare var $: any;

@Component({
  selector: 'app-final-report',
  templateUrl: './final-report.component.html',
  styleUrls: ['./final-report.component.css']
})
export class FinalReportComponent implements OnInit {
  registerFormFilter: FormGroup;
  itemsBreadcrumb = [
    { label: 'Home', url: '/home' },
    { label: 'Reportes Académicos', url: 'final_report' },
    {
      label: 'Reportes Finales',
      url: 'final_report',
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
    this.getGrades();
    this.getCourses();
    this.getSubjects();
    this.getFormFilter();
    //Services
    this.getReport('');
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
    this.getReport(parameters);
  }

  getReport(parameters) {
    this.sharedService.getFinalReport(parameters).subscribe(
      (response) => {
        this.students = response;
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

  public showPanelFilter() {
    this.showfilters = !this.showfilters;
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
      { title: "Nombre", dataKey: "Nombre" },
      { title: "Curso", dataKey: "Curso" },
      { title: "Grado", dataKey: "Grado" },
      { title: "Materia", dataKey: "Materia" },
      { title: "Nota 1", dataKey: "Nota 1" },
      { title: "Nota 2", dataKey: "Nota 2" },
      { title: "Nota 3", dataKey: "Nota 3" },
      { title: "Nota Final", dataKey: "NotaFinal" },
      { title: "Promedio", dataKey: "Promedio" },
      { title: "Puesto", dataKey: "Puesto" },
    ];
    let body: any[] = [];

    this.students.map((s) => {
      body.push({
        'Nombre': s.estudiante,
        'Curso': s.curso,
        'Grado': s.grado,
        'Materia': s.materia,
        'Nota 1': s.nota1,
        'Nota 2': s.nota2,
        'Nota 3': s.nota3,
        'NotaFinal': s.notaFinal,
        'Promedio': s.promedio,
        'Puesto': s.puesto,
      });
    });
    this.notDownloadExcel = !(this.students.length > 0)!;
    if (this.students.length > 0) {
      if(type === 'PDF') {
        this.excelService.exportPdf(columns, body, 'Reporte Final De Estudiantes');
      } else {
        this.excelService.exportAsExcelFile(body, 'Resultado Busqueda');
      }
    }
  }

}

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExcelService } from 'src/app/core/services/excel/excel.service';
import { environment } from 'src/environments/environment';
import { SharedService } from 'src/app/core/services/shared/shared.service';

declare var $: any;

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {
  insertForm: FormGroup;
  updateForm: FormGroup;
  itemsBreadcrumb = [
    { label: 'Home', url: '/home' },
    { label: 'Parametrización', url: 'cursos' },
    {
      label: 'Cursos',
      url: 'cursos',
      current: true,
    },
  ];
  displayInsert: boolean = false;
  displayUpdate: boolean = false;
  displayDelete: boolean = false;
  displayConfirmComment: boolean = false;
  displayConfirmDelete: boolean = false;
  totalRecords: number = 0;
  currentPage: number = 1;
  pageLenght = environment.pageLenght;
  notDownloadExcel = false;
  curso: any;

  Courses = [];

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
    this.getFormInsert();
    this.getFormUpdate();
    this.getCourses();
  }

  getFormInsert(){
    return (this.insertForm = this.formBuilder.group({
      nombre: ['', [Validators.max(30), Validators.required]]
    }));
  }

  getFormUpdate(){
    return (this.updateForm = this.formBuilder.group({
      nombre: ['', [Validators.max(30), Validators.required]]
    }));
  }

  showPanelInsert() {
    this.displayInsert = true;
  }

  showPanelUpdate(dato: any) {
    this.displayUpdate = true;
    this.updateForm.controls.nombre.setValue(dato.nombre);
    this.curso = dato;
  }

  showPanelDelete(dato: any) {
    this.displayDelete = true;
    this.curso = dato;
  }

  onSubmitInsert(): void {
    this.displayInsert = false;
    this.saveCourse();
  }

  onSubmitUpdate(): void {
    this.displayUpdate = false;
    this.updateCourse();
  }

  deleteCourse(): void {
    this.displayDelete = false;
    this.sharedService.deleteCourse(this.curso.idCurso).subscribe(
      (response) => {
        this.displayConfirmDelete = true;
        this.getCourses();
      },
      (error) => {
      }
    );
  }

  saveCourse() {
    let cursoInsert = { 
      nombre: this.insertForm.controls.nombre.value
    };
    this.sharedService.createCourse(cursoInsert).subscribe(
      (response) => {
        this.displayConfirmComment = true;
        this.getCourses();
      },
      (error) => {
      }
    );
  }

  updateCourse() {
    this.curso.nombre = this.updateForm.controls.nombre.value;
    this.sharedService.updateCourse(this.curso).subscribe(
      (response) => {
        this.displayConfirmComment = true;
        this.getCourses();
      },
      (error) => {
      }
    );
  }

  getCourses() {
    this.sharedService.getCursos().subscribe(
      (response) => {
        this.Courses = response;
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

  closeConfirmation(): void {
    this.displayConfirmComment = false;
  }

  paginate(event) {
    this.currentPage = event.page + 1;
    this.pageLenght = event.rows;
  }

  exportAs(type: string): void {
    const columns = [
      { title: "Nombre", dataKey: "Nombre" },
    ];
    let body: any[] = [];

    this.Courses.map((s) => {
      body.push({
        'Nombre': s.nombre,
      });
    });
    this.notDownloadExcel = !(this.Courses.length > 0)!;
    if (this.Courses.length > 0) {
      if(type === 'PDF') {
        this.excelService.exportPdf(columns, body, 'Cursos');
      } else {
        this.excelService.exportAsExcelFile(body, 'Resultado Busqueda');
      }
    }
  }

}


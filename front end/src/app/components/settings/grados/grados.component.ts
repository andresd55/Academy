import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExcelService } from 'src/app/core/services/excel/excel.service';
import { environment } from 'src/environments/environment';
import { SharedService } from 'src/app/core/services/shared/shared.service';

declare var $: any;

@Component({
  selector: 'app-grados',
  templateUrl: './grados.component.html',
  styleUrls: ['./grados.component.css']
})
export class GradosComponent implements OnInit {
  insertForm: FormGroup;
  updateForm: FormGroup;
  itemsBreadcrumb = [
    { label: 'Home', url: '/home' },
    { label: 'Parametrización', url: 'grados' },
    {
      label: 'Grados',
      url: 'grados',
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
  grado: any;

  Grades = [];

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
    this.getGrades();
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
    this.grado = dato;
  }

  showPanelDelete(dato: any) {
    this.displayDelete = true;
    this.grado = dato;
  }

  onSubmitInsert(): void {
    this.displayInsert = false;
    this.saveGrade();
  }

  onSubmitUpdate(): void {
    this.displayUpdate = false;
    this.updateGrade();
  }

  deleteGrade(): void {
    this.displayDelete = false;
    this.sharedService.deleteGrade(this.grado.idGrado).subscribe(
      (response) => {
        this.displayConfirmDelete = true;
        this.getGrades();
      },
      (error) => {
      }
    );
  }

  saveGrade() {
    let gradoInsert = { 
      nombre: this.insertForm.controls.nombre.value
    };
    this.insertForm.controls.nombre.setValue('');
    this.sharedService.createGrade(gradoInsert).subscribe(
      (response) => {
        this.displayConfirmComment = true;
        this.getGrades();
      },
      (error) => {
      }
    );
  }

  updateGrade() {
    this.grado.nombre = this.updateForm.controls.nombre.value;
    this.sharedService.updateGrade(this.grado).subscribe(
      (response) => {
        this.displayConfirmComment = true;
        this.getGrades();
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

    this.Grades.map((s) => {
      body.push({
        'Nombre': s.nombre,
      });
    });
    this.notDownloadExcel = !(this.Grades.length > 0)!;
    if (this.Grades.length > 0) {
      if(type === 'PDF') {
        this.excelService.exportPdf(columns, body, 'Grados');
      } else {
        this.excelService.exportAsExcelFile(body, 'Resultado Busqueda');
      }
    }
  }

}

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExcelService } from 'src/app/core/services/excel/excel.service';
import { environment } from 'src/environments/environment';
import { SharedService } from 'src/app/core/services/shared/shared.service';

declare var $: any;

@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.css']
})
export class MateriasComponent implements OnInit {
  insertForm: FormGroup;
  updateForm: FormGroup;
  itemsBreadcrumb = [
    { label: 'Home', url: '/home' },
    { label: 'Parametrización', url: 'materias' },
    {
      label: 'Materias',
      url: 'materias',
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
  materia: any;

  Materias = [];

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
    this.getMaterias();
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
    this.materia = dato;
  }

  showPanelDelete(dato: any) {
    this.displayDelete = true;
    this.materia = dato;
  }

  onSubmitInsert(): void {
    this.displayInsert = false;
    this.saveMateria();
  }

  onSubmitUpdate(): void {
    this.displayUpdate = false;
    this.updateMateria();
  }

  deleteMateria(): void {
    this.displayDelete = false;
    this.sharedService.deleteMateria(this.materia.idMateria).subscribe(
      (response) => {
        this.displayConfirmDelete = true;
        this.getMaterias();
      },
      (error) => {
      }
    );
  }

  saveMateria() {
    let materiaInsert = { 
      nombre: this.insertForm.controls.nombre.value
    };
    this.sharedService.createMateria(materiaInsert).subscribe(
      (response) => {
        this.displayConfirmComment = true;
        this.getMaterias();
      },
      (error) => {
      }
    );
  }

  updateMateria() {
    this.materia.nombre = this.updateForm.controls.nombre.value;
    this.sharedService.updateMateria(this.materia).subscribe(
      (response) => {
        this.displayConfirmComment = true;
        this.getMaterias();
      },
      (error) => {
      }
    );
  }

  getMaterias() {
    this.sharedService.getMaterias().subscribe(
      (response) => {
        this.Materias = response;
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

    this.Materias.map((s) => {
      body.push({
        'Nombre': s.nombre,
      });
    });
    this.notDownloadExcel = !(this.Materias.length > 0)!;
    if (this.Materias.length > 0) {
      if(type === 'PDF') {
        this.excelService.exportPdf(columns, body, 'Materias');
      } else {
        this.excelService.exportAsExcelFile(body, 'Resultado Busqueda');
      }
    }
  }

}

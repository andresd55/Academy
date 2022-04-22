import { DatePipe } from '@angular/common';
import { AfterContentChecked, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CustomerService } from 'src/app/core/services/customer/customer.service';
import { ExcelService } from 'src/app/core/services/excel/excel.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { MessageService } from 'src/app/shared/framework-ui/primeng/api/public_api';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import { Subscription } from 'rxjs';

declare var $: any;

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
  providers: [MessageService, DatePipe],
})
export class NotesComponent implements OnInit, AfterContentChecked {
  @ViewChild('ngForm') ngForm: FormGroupDirective;
  @ViewChild('ngFormFinotex') ngFormFinotex: FormGroupDirective;

  registerFormComment: FormGroup;
  registerFormFilter: FormGroup;
  registerFormFilterUserFinotex: FormGroup;
  subscription: Subscription;
  itemsBreadcrumb = [
    { label: 'Home', url: '/home' },
    { label: 'Registro Diario', url: '/home/artworks_history' },
    {
      label: 'Notas, Asistencias, Observaciones',
      url: '/home/artworks_history',
      current: true,
    },
  ];
  showfilters = false;
  showfiltersFinotex = false;
  students = [
    {
      name: 'Pepito Perez',
      grade: 'Sexto', 
      course: 'A', 
      subject: 'Inglés', 
      absence: '1', 
      note1: '3', 
      note2: '4.2', 
      note3: '4.9', 
      onservations: 'lorem ipsum', 
    },
    {
      name: 'Angie Carretero',
      grade: 'Sexto', 
      course: 'A', 
      subject: 'Inglés', 
      absence: '1', 
      note1: '3', 
      note2: '4.2', 
      note3: '4.9', 
      onservations: 'lorem ipsum', 
    },
    {
      name: 'Carlos Gonzáles',
      grade: 'Sexto', 
      course: 'A', 
      subject: 'Inglés', 
      absence: '1', 
      note1: '3', 
      note2: '4.2', 
      note3: '4.9', 
      onservations: 'lorem ipsum', 
    },
  ];
  keyword = 'name';
  display: boolean = false;
  displayConfirmComment: boolean = false;
  indicatorButtonComment = false;
  status = [];
  productType = [];
  lang = 'en';
  submitted: boolean;
  sketchStatusId = 0;
  createdByUser = '';
  commentSketchResponse: any = {};
  description = '';
  indicatorButton = false;
  customers = [];
  indicatorCommentPublic = true;
  roleProfileCustomer = true;
  totalRecords: number = 0;
  currentPage: number = 1;
  pageLenght = environment.pageLenght;
  notDownloadExcel = false;
  statusDefault = environment.statusDefaultArtWorksHistory;
  paramCustomerId: string;

  settingsDates = {
    minDate: new Date(2021, 1 - 1, 1),
    isRange: true,
    required: false,
    dateFormat: this.lang == 'en' ? 'M/dd/yy' : 'dd/M/yy',
    ids: ['filter_date'],
    labels: 'samples.lblDate',
  };

  Grades = [
    {
      code: '6',
      name: 'Sexto', 
    },
    {
      code: '7',
      name: 'Septimo', 
    },
    {
      code: '8',
      name: 'Octavo', 
    },
    {
      code: '9',
      name: 'Noveno', 
    },
    {
      code: '10',
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

  Subjects = [
    {
      code: '1',
      name: 'Inglés', 
    },
    {
      code: '2',
      name: 'Matemáticas', 
    },
    {
      code: '3',
      name: 'Religión', 
    }
  ];

  landscape = window.matchMedia("(orientation: landscape)");

  constructor(
    private formBuilder: FormBuilder,
    private storageService: StorageService,
    private router: Router,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute,
    private customerService: CustomerService,
    private datePipe: DatePipe,
    private translate: TranslateService,
    private excelService: ExcelService,
    private ref: ChangeDetectorRef,
  ) { 
    this.landscape.addEventListener("change", ev => {
      window.location.reload();
    });
  }
 
  ngOnInit(): void {
    //From
    this.getFormFilter();
    this.getFormFilterFinotex();
    this.getFormComment();

    //Services
    this.getStatusFilter();
    this.loadArtworksInformationByQueryStringParameter();
  }
  
  ngAfterContentChecked(): void {
    this.ref.detectChanges();
  }

  loadArtworksInformationByQueryStringParameter() {
    this.subscription = this.activatedRoute.paramMap.subscribe((params) => {
      this.paramCustomerId = params.get('customerId');
    });
  }


  getFormComment() {
    return (this.registerFormComment = this.formBuilder.group({
      sketchId: { value: null, disabled: true },
      description: { value: null, disabled: true },
      sketchStatusId: ['', Validators.nullValidator],
      businessId: ['', Validators.nullValidator],
      language: ['', Validators.nullValidator],
      createdByUser: ['', Validators.nullValidator],
      observation: ['', Validators.required],
      sketchObservationId: ['', Validators.nullValidator],
      public: ['', Validators.nullValidator],
      typeComment: ['', Validators.nullValidator],
    }));
  }

  getFormFilter() {
    return (this.registerFormFilter = this.formBuilder.group({
      CustomerId: ['', Validators.nullValidator],
      progress_status: ['', Validators.nullValidator],
      RequestNumber: ['', Validators.nullValidator],
      Description: ['', Validators.nullValidator],
      Status: ['', Validators.nullValidator],
      TypeOfDate: ['', Validators.nullValidator],
      filter_date: ['', Validators.nullValidator],
      StartDate: ['', Validators.nullValidator],
      EndDate: ['', Validators.nullValidator],
      SemaphoreId: ['', Validators.nullValidator],
      businessId: ['', Validators.nullValidator],
      language: ['', Validators.nullValidator],
      page: [0, Validators.nullValidator],
      limit: [10, Validators.nullValidator],
      orderBy: ['', Validators.nullValidator],
      ordAscendingerBy: [false, Validators.nullValidator],
    }));
  }

  getFormFilterFinotex() {
    return (this.registerFormFilterUserFinotex = this.formBuilder.group({
      CustomerId: ['', Validators.nullValidator],
      Status: ['', Validators.nullValidator],
      TypeOfDate: ['', Validators.nullValidator],
      Description: ['', Validators.nullValidator],
      RequestNumber: ['', Validators.nullValidator],
      filter_date_fonotex: ['', Validators.nullValidator],
      StartDate: ['', Validators.nullValidator],
      EndDate: ['', Validators.nullValidator],
      businessId: ['', Validators.nullValidator],
      language: ['', Validators.nullValidator],
      page: [0, Validators.nullValidator],
      limit: [10, Validators.nullValidator],
      orderBy: ['', Validators.nullValidator],
      ordAscendingerBy: [false, Validators.nullValidator],
    }));
  }

  openNewComment(): void {
    this.router.navigate(['home/artworks_new', 'add']);
  }

  showDetails(skecht: any): void {
    this.router.navigate(['home/artworks_details', skecht.sketchId]);
  }

  showEdit(skecht: any): void {
    this.router.navigate(['home/artworks_edit', skecht.sketchId]);
  }

  closeConfirmation(): void {
    this.displayConfirmComment = false;
  }

  onSubmitCommet(): void {
    this.display = false;
    this.displayConfirmComment = true;
    // this.indicatorButtonComment = true;
    // const user = this.storageService.getUser();
    // this.createdByUser = user.username;
    // this.registerFormComment.patchValue({
    //   sketchObservationId: 0,
    //   public:
    //     this.registerFormComment.get('public').value == '1' ? true : false,
    //   createdByUser: this.createdByUser,
    //   sketchStatusId: this.sketchStatusId,
    // });
  }

  public showPanelFilter() {
    this.showfilters = !this.showfilters;
  }

  showPanelDialog(dato: any) {
    this.display = true;
    this.registerFormComment.reset();
    this.registerFormComment.patchValue({
      sketchId: dato.sketchId,
      description: dato.sketchName,
    });
    this.sketchStatusId = dato.sketchStatusId;
    this.createdByUser = dato.createdByUser;
    this.description = dato.sketchName;
    this.registerFormComment.get('public').setValue('1');
  }

  getStatusFilter() {
  }

  sketchFilterService(): void {
    this.indicatorButton = true;
    let parameterFilter: any;
  }

  filterStatus(id: number): string {
    const filtro = this.status.filter((lista) => lista.sketchStatusId === id);
    return filtro[0].sketchStatusName;
  }

  public formatDate(fecha: any) {
    moment.locale(this.storageService.getLanguage());
    return moment(fecha, 'YYYY-MM-DD').format('MMM/DD/YYYY');
  }

  clearFilter() {
    this.registerFormFilter.reset();
  }

  clearFilterFinotex() {
    this.registerFormFilterUserFinotex.reset();
  }

  onSubmitFilter(): void {
    moment.locale(this.storageService.getLanguage());

    this.registerFormFilter.patchValue({
      CustomerId: this.storageService.getGrup(),
      RequestNumber: this.registerFormFilter.get('RequestNumber').value
        ? this.registerFormFilter.get('RequestNumber').value
        : null,
      Description: this.registerFormFilter.get('Description').value
        ? this.registerFormFilter.get('Description').value
        : null,
      Status: this.registerFormFilter.get('Status').value
        ? this.registerFormFilter.get('Status').value
        : null,
      TypeOfDate: this.registerFormFilter.get('TypeOfDate').value
        ? this.registerFormFilter.get('TypeOfDate').value
        : null,
      StartDate: this.registerFormFilter.get('filter_date').value
        ? moment(
          this.registerFormFilter
            .get('filter_date')
            .value.split(' - ')[0],
          'MMM/DD/YYYY'
        ).format('YYYY-MM-DD') + ' 00:00:01'
        : null,
      EndDate: this.registerFormFilter.get('filter_date').value
        ? moment(
          this.registerFormFilter
            .get('filter_date')
            .value.split(' - ')[1],
          'MMM/DD/YYYY'
        ).format('YYYY-MM-DD') + ' 23:59:59'
        : null,
      SemaphoreId: this.registerFormFilter.get('progress_status').value
        ? this.registerFormFilter.get('progress_status').value
        : null,
      page: this.currentPage,
      limit: this.pageLenght,
      orderBy: 'SketchId',
      ordAscendingerBy: false,
    });

    this.sketchFilterService();
  }

  onSubmitFilterFinotex(): void {
    moment.locale(this.storageService.getLanguage());
    this.registerFormFilterUserFinotex.patchValue({
      CustomerId: this.registerFormFilterUserFinotex.get('CustomerId').value
        ? this.registerFormFilterUserFinotex.get('CustomerId').value
        : null,
      RequestNumber: this.registerFormFilterUserFinotex.get('RequestNumber')
        .value
        ? this.registerFormFilterUserFinotex.get('RequestNumber').value
        : null,
      Description: this.registerFormFilterUserFinotex.get('Description').value
        ? this.registerFormFilterUserFinotex.get('Description').value
        : null,
      Status: this.registerFormFilterUserFinotex.get('Status').value
        ? this.registerFormFilterUserFinotex.get('Status').value
        : null,
      TypeOfDate: this.registerFormFilterUserFinotex.get('TypeOfDate').value
        ? this.registerFormFilterUserFinotex.get('TypeOfDate').value
        : null,
      StartDate: this.registerFormFilterUserFinotex.get('filter_date_fonotex')
        .value
        ? moment(
          this.registerFormFilterUserFinotex
            .get('filter_date_fonotex')
            .value.split(' - ')[0],
          'MMM/DD/YYYY'
        ).format('YYYY-MM-DD') + ' 00:00:01'
        : null,
      EndDate: this.registerFormFilterUserFinotex.get('filter_date_fonotex')
        .value
        ? moment(
          this.registerFormFilterUserFinotex
            .get('filter_date_fonotex')
            .value.split(' - ')[1],
          'MMM/DD/YYYY'
        ).format('YYYY-MM-DD') + ' 23:59:59'
        : null,
      page: this.currentPage,
      limit: this.pageLenght,
      orderBy: 'SketchId',
      ordAscendingerBy: false,
    });
    this.sketchFilterService();
  }

  serviceCustomers() {
    const data = {
      zones: this.storageService.getGrupId() ? this.storageService.getGrupId().zoneIds : null,
      salesExecutives: this.storageService.getGrupId() ? this.storageService.getGrupId().salesExecutiveGroupIds : null,
    };
  }

  downloadFileDesigner(sketchId: any) {
    let designerFile: any;
    const data = {
      sketchId: sketchId,
    };
  }

  downloadFile(file) {
    if (file) {
      const link = document.createElement('a');
      if (file.fileTemporal) {
        link.href = file.fileTemporal;
        link.download = file.fileName;
        link.click();
      }
    }
  }

  paginate(event) {
    this.currentPage = event.page + 1;
    this.pageLenght = event.rows;
  }

  callDefaultArtworks() {
    this.sketchFilterService();
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
        'Nombre': s.name,
        'Grado': s.grade,
        'Curso': s.course,
        'Materia': s.subject,
        'Fallas': s.absence,
        'Nota 1': s.note1,
        'Nota 2': s.note2,
        'Nota 3': s.note3,
        'Observaciones': s.onservations,
      });
    });
    this.notDownloadExcel = !(this.students.length > 0)!;
    if (this.students.length > 0) {
      if(type === 'PDF') {
        this.excelService.exportPdf(columns, body, 'Estudiantes');
      } else {
        this.excelService.exportAsExcelFile(body, 'Resultado Busqueda');
      }
    }
  }

  onSubmitFilterSearch(data: string) {
    const formDataFilterSearch = {
      page: this.currentPage,
      limit: this.pageLenght,
      orderBy: '',
      ordAscendingerBy: true,
      textToFilter: data,
    };
  }

}

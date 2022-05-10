import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/core/services/shared/shared.service';
import { FileUpload } from 'src/app/shared/models/fileUpload';
import { environment } from 'src/environments/environment';

declare var $: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  registerFormLogin: FormGroup;
  showError = false;
  userCreated = false;
  file: any;
  fileList: FileUpload[] = new Array<FileUpload>();
  allowedFileTypes = [
    'image/png',
    'image/jpeg',
    'image/bmp',
    'image/gif',
    'image/tiff'
  ];
  hideErrorType: boolean;
  hideErrorSize: boolean;
  stateFabricType: boolean;
  displayInvalidateFileMessage: boolean;
  maxSize: string;
  showErrorText = "";
  submitted = false;

  Subjects = [
    {
      code: '1',
      name: 'Calculo', 
    },
    {
      code: '2',
      name: 'Programacion', 
    }
  ];

  constructor(private router: Router, private formBuilder: FormBuilder, 
    private sharedService: SharedService) { }

  ngOnInit(): void {
    this.getFormLoginUser();
    this.configUploadFiles();
  }

  configUploadFiles() {
    let jQueryInstance = this;

    $('input[id^=file]').hide();

    $('#btnupload').click(function () {
      $(this).
        prev('input').click();
    });

    $('#fotoName').on(
      'dragover',
      function (e) {
        e.preventDefault();
        e.stopPropagation();
      }
    )

    $('#fotoName').on(
      'dragenter',
      function (e) {
        e.preventDefault();
        e.stopPropagation();
      }
    )

    $('#fotoName').on(
      'drop',
      function (e) {
        if (e.originalEvent.dataTransfer) {
          if (e.originalEvent.dataTransfer.files.length) {
            e.preventDefault();
            e.stopPropagation();
            /*UPLOAD FILES HERE*/
            let file = e.originalEvent.dataTransfer.files[0];
            let fileName = file.name;
            jQueryInstance.upload(fileName, file, jQueryInstance.allowedFileTypes);
          }
        }
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
      correo: ['', Validators.required],
      foto: ['', Validators.required],
      genero: ['', Validators.required],
      usuario: ['', Validators.required],
      password: ['', Validators.required],
      idMateria: ['', Validators.required],
    }));
  }

  enableButtonDocument(target: any) {
    $('#lblFuArchivo').html($('#fileupload')[0].files[0].name);
  }

  handleFileInput(target: any) {
  }

  register() {
    this.submitted = true;
    console.log(this.registerFormLogin.value);
    if(this.registerFormLogin.valid) {
      this.sharedService.registerTeacher(this.registerFormLogin.value).subscribe(
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
    this.router.navigate(['/login']);
  }

  public resetFiles() {
    this.f.foto.setValue('');
    $('#fotoName').val('');

    this.fileList.forEach((item, index) => {
          this.fileList.splice(index, 1);
    });
  }

  async fileChanged(e) {
    this.file = e.target.files[0];
    await this.upload(this.file.name, this.file, this.allowedFileTypes);
  }

  async upload(fileName: string, fileContent: any, validator: string[]) {
    if (await this.validateUploadedFile(fileContent, validator)) {
      await this.convertFileToBase64(fileContent);
    }
  }

  async validateUploadedFile(fileContent: any, validator: string[]) {
    this.hideErrorType = true;
    this.hideErrorSize = true;
    this.displayInvalidateFileMessage = false;

    this.maxSize = environment.max_file_size + 'MB'
    if (validator.indexOf(fileContent.type) == -1) {
      this.hideErrorType = false;
    }
    if (fileContent.size > (environment.max_file_size * 1000000) ||
      fileContent.size == 0) {
      this.hideErrorSize = false;
    }
    this.displayInvalidateFileMessage = !this.hideErrorSize || !this.hideErrorType;
    return !this.displayInvalidateFileMessage;
  }

  async convertFileToBase64(file) {
    var self = this;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      let fileFU: FileUpload = {
        fileName: file.name,
        fileType: file.type,
        fileUrl: 'Finotex',
        fileTemporal: reader.result.toString().split(',')[1],
      }

      self.fileList.push(fileFU);
      self.updateFileList();
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  updateFileList() {

    let filesUpload = this.fileList[0].fileTemporal;

    $('#fotoName').val(this.fileList[0].fileName);
      
    this.f.foto.setValue(filesUpload);
  }

}

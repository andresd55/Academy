import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css']
})
export class CreateStudentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  enableButtonDocument(target: any) {
    $('#lblFuArchivo').html($('#fileupload')[0].files[0].name);
  }

  handleFileInput(target: any) {
  } 

}

import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  enableButtonDocument(target: any) {
    $('#lblFuArchivo').html($('#fileupload')[0].files[0].name);
  }

  handleFileInput(target: any) {
  }

}

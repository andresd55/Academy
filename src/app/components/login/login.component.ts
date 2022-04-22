import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  registerForm!: FormGroup;
  registerFormLogin: FormGroup;
  displayLogin = false;
  showError = false;
  showErrorText = "";
  titleLogin = "";

  userType = [
    {
      code: '2',
      name: 'Finotex team'
    }
  ]

  constructor(
    private router: Router,
    private formBuilder: FormBuilder) { }

  get formControls() {
    return this.registerForm.controls;
  }

  ngOnInit(): void {
    // this.getFormTypeUser();
    // this.getFormLoginUser();
  }

  private getFormTypeUser() {
    return (this.registerForm = this.formBuilder.group({
      user_type: ['2', Validators.required]
    }));
  }

  private getFormLoginUser() {
    return (this.registerFormLogin = this.formBuilder.group({
      username: ['', Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")],
      password: ['', Validators.required]
    }));
  }

  onSubmitTypeUser(): void {
    this.displayLogin = true;
    this.titleLogin = this.formControls.user_type.value == 1 ? "Finotex customer" : "Finotex team";
  }
}

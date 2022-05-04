import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/core/services/shared/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  registerFormLogin: FormGroup;
  displayLogin = false;
  showError = false;
  showInvalidPassword = false;
  showErrorText = "";
  titleLogin = "";
  submitted = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private sharedService: SharedService) { }

  ngOnInit(): void {
    this.getFormLoginUser();
  }

  private getFormLoginUser() {
    return (this.registerFormLogin = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required]
    }));
  }

  IsValid(control: string): boolean {
    return this.registerFormLogin.get(control).valid;
  }

  login() {
    this.submitted = true;
    if(this.registerFormLogin.valid) {
      console.log(this.registerFormLogin.value);
      this.sharedService.login(this.registerFormLogin.value).subscribe(
        (response) => {
          if (response) {
            localStorage.setItem('user', JSON.stringify(response));
            this.router.navigate(['../home']);
          } else {
            this.showInvalidPassword = true;
          }
        },
        (error) => {
          this.showInvalidPassword = true;
        },
        () => { this.displayLogin = false; }
      );
     
    }
  }
}

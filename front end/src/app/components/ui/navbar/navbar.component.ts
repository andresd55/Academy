import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { NotificationDto } from 'src/app/shared/models/notification-dto';
import {DomSanitizer} from '@angular/platform-browser';
import { SharedService } from 'src/app/core/services/shared/shared.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit, OnDestroy {
  notifications: Array<NotificationDto>;
  notificationActive: NotificationDto;
  title = 'Microsoft identity platform';
  isIframe = false;
  loginDisplay = false;
  isEnglish = true;
  currentUserAplication: any;
  private readonly _destroying$ = new Subject<void>();
  configService: any;
  display: boolean;
  public imgUrl = '';

  registerForm!: FormGroup;

  countrys = [];
  business = [];
  profile = [];
  securityUsersId = 0;
  indicatorButton = false;

  isOperator = false;

  constructor(
    public translate: TranslateService,
    private sharedService: SharedService,
    public DomSanitizer: DomSanitizer,
    private storageService: StorageService,
    private formBuilder: FormBuilder
  ) {

  }

  ngOnInit(): void {
    this.currentUserAplication = JSON.parse(localStorage.getItem('user'));
    this.imgUrl = this.currentUserAplication.foto ? ('data:image/png;base64, ' + this.currentUserAplication.foto) : '../../../../assets/images/user.jpg';
  }
  logout() {
    this.storageService.logoutUser();
  }

  setLoginDisplay() {
    // this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }

  switchLang(lang: string, reload = true) {
    this.isEnglish = true;
    this.storageService.addLanguage(lang);
    this.isEnglish = !(this.translate.currentLang == "es");
    if (reload) {
      this.translate.use(lang);
      window.location.reload();
    }
  }

  private getForm() {
    return (this.registerForm = this.formBuilder.group({
      countrys: ['', Validators.required],
      business_facility: ['', Validators.required],
      profile_role: ['', Validators.required]
    }));
  }

  onChangeContrys(event: any) {
    this.business = [];
    this.profile = [];
    const filter = this.countrys.filter(
      (list) => list.countryId === event.value
    );
    this.business = filter[0].business;
  }

  onChangeBusiness(event: any) {
    this.profile = [];
    const filter = this.business.filter(
      (list) => list.businessId === event.value
    );
    this.profile = filter[0].groups;
  }

  onSubmitRole(): void {
    this.prfileUserGrup(this.registerForm.get('business_facility').value, this.securityUsersId);
  }

  prfileUserGrup(businessId: any, securityUsersId: any): void {
    const data = {
      "businessId": businessId,
      "role": this.registerForm.get('profile_role').value
    }
    this.storageService.addProfiles(data);
    this.indicatorButton = true;
    
    this.sharedService.zoneIdSalesExecutiveGroupIdGet(businessId, securityUsersId).subscribe(
      (response) => {
        console.log(response)
        if (response.status) {
          this.storageService.addGrup(response.data);
          window.location.reload();
        } else {
          this.indicatorButton = false;
        }
      },
      (error) => {
        this.indicatorButton = false;
      },
      () => {
        this.indicatorButton = false;
      }
    );

  }
}
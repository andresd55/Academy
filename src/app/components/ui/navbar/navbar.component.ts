import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import * as signalR from '@microsoft/signalr';
import { NotificationDto } from 'src/app/shared/models/notification-dto';
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment';
import { SharedService } from 'src/app/core/services/shared/shared.service';
import { MessageService } from 'src/app/shared/framework-ui/primeng/api/messageservice';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleProfileInternal } from 'src/app/shared/constant/roleProfile';

declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [MessageService, DatePipe]
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

  registerForm!: FormGroup;

  countrys = [];
  business = [];
  profile = [];
  securityUsersId = 0;
  indicatorButton = false;

  isOperator = false;

  constructor(
    private datePipe: DatePipe,
    public translate: TranslateService,
    private sharedService: SharedService,
    private router: Router,
    private messageService: MessageService,
    private storageService: StorageService,
    private formBuilder: FormBuilder
  ) {

  }

  ngOnInit(): void {
    this.currentUserAplication = this.storageService.getUser();
    if (this.currentUserAplication != null) {
      let currentLang: string;
      currentLang = this.storageService.getLanguage() ? this.storageService.getLanguage() : 'en';
      this.translate.addLangs(['en', 'es']);
      this.translate.setDefaultLang(currentLang);
      this.translate.use(currentLang);
      this.isEnglish = !(this.storageService.getLanguage() == 'es');
      this.notifications = JSON.parse(localStorage.getItem('notifications'));
      this.isIframe = window !== window.parent && !window.opener;
      this.setLoginDisplay();
      this.getForm();     
    }
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
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response.message });
        }
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message });
        this.indicatorButton = false;
      },
      () => {
        this.indicatorButton = false;
      }
    );

  }

  refreshToken(){
    let that = this;
    let refreshToken = that.currentUserAplication.refresh_token;
    let seconds = that.currentUserAplication.expires_in;
    let currentTime = new Date();
    currentTime.setSeconds(seconds);     
    if(that.isOperator){
      setInterval(function () {
        if(new Date() > currentTime){
          that.sharedService.refreshTokenB2b(refreshToken).subscribe(
            (response) => {
              currentTime = new Date();
              if (response.status) {
                refreshToken = response.data.refresh_token;
                seconds = response.data.expires_in;
                currentTime.setSeconds(seconds);
                that.storageService.refreshToken(response.data.access_token,response.data.expires_in,response.data.refresh_token);                
              } else {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: response.message });
              }
            },
            (error) => {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message });
            },
            () => {
            }
          );
        }
      }, environment.refreshTokenTime)
    }
  }
}
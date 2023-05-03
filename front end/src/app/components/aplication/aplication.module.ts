// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { LoginComponent } from '../login/login.component';
// import { HomeComponent } from '../home/home.component';
// import { BrowserModule } from '@angular/platform-browser';
// import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { SidebarComponent } from '../ui/sidebar/sidebar.component';
// import { FooterComponent } from '../ui/footer/footer.component';
// import { NavbarComponent } from '../ui/navbar/navbar.component';
// import { DashboardComponent } from '../dashboard/dashboard.component';
// import { RouterModule } from '@angular/router';
// import { ButtonModule } from 'src/app/shared/framework-ui/primeng/button/button';
// import { CoreModule } from 'src/app/core/core/core.module';
// import { CardModule } from 'src/app/shared/framework-ui/primeng/card/public_api';
// import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
// import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// import { TableModule } from 'src/app/shared/framework-ui/primeng/table/public_api';
// import { InputTextModule } from 'src/app/shared/framework-ui/primeng/inputtext/inputtext';
// import { AutocompleteLibModule } from 'angular-ng-autocomplete';
// import { DropdownModule } from 'src/app/shared/framework-ui/primeng/dropdown/public_api';
// import { DatepickerComponentModule } from 'src/app/shared/framework-ui/custom/datepicker/datepicker.component';
// import { TooltipModule } from 'src/app/shared/framework-ui/primeng/tooltip/tooltip';
// import { DialogModule } from 'src/app/shared/framework-ui/primeng/dialog/public_api';
// import { InputTextareaModule } from 'src/app/shared/framework-ui/primeng/inputtextarea/public_api';
// import { MultiSelectModule } from 'src/app/shared/framework-ui/primeng/multiselect/public_api';
// import { RippleModule } from 'src/app/shared/framework-ui/primeng/ripple/public_api';
// import { AccordionModule } from 'src/app/shared/framework-ui/primeng/accordion/accordion';
// import { InteractionType, IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';
// import { ProfilesComponent } from '../login/profiles/profiles.component';
// import { CheckboxModule } from 'src/app/shared/framework-ui/primeng/checkbox/public_api';
// import { ToastModule } from 'src/app/shared/framework-ui/primeng/toast/public_api';
// import { MsalService, MsalModule, MsalRedirectComponent, MsalInterceptorConfiguration, MsalInterceptor, MSAL_INTERCEPTOR_CONFIG, MSAL_INSTANCE } from '@azure/msal-angular';
// import { AppComponent } from 'src/app/app.component';
// import { RadioButtonModule } from 'src/app/shared/framework-ui/primeng/radiobutton/public_api';
// import { PaginatorModule } from 'src/app/shared/framework-ui/primeng/paginator/paginator';
// import { InterceptorsTokenService } from 'src/app/core/services/interceptors/interceptors-token.service';
// import { BreadcrumbModule } from 'src/app/shared/framework-ui/primeng/breadcrumb/public_api';
// import { TimelineModule } from 'src/app/shared/framework-ui/primeng/timeline/public_api';
// import { ContextMenuModule } from 'src/app/shared/framework-ui/primeng/contextmenu/contextmenu';
// import { environment } from 'src/environments/environment';
// import { CalendarModule } from 'src/app/shared/framework-ui/primeng/calendar/calendar';
// import { OrdersListComponent } from '../floorcontrol/orders-list/orders-list.component';
// import { NgQrScannerModule } from 'angular2-qrscanner';
// import { FloorControlLoginComponent } from '../floorcontrol/floor-control-login/floor-control-login.component';

// import { SearchSelectorFinotexModule } from 'src/app/shared/framework-ui/custom/search-selector/search-selector.component';
// import { DragDropModule } from '@angular/cdk/drag-drop';
// import { CodebarComponent } from '../floorcontrol/codebar/codebar.component';
// import { ZXingScannerModule } from '@zxing/ngx-scanner';
// import { viewerModule } from 'src/app/shared/framework-ui/custom/viewer/viewer.component';
// import { scannerModule } from 'src/app/shared/framework-ui/custom/scanner/scanner';
// import { ResourceTimeComponent } from '../floorcontrol/resource-time/resource-time.component';




import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from '../ui/footer/footer.component';
import { NavbarComponent } from '../ui/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { CoreModule } from 'src/app/core/core/core.module';
import { AppComponent } from 'src/app/app.component';
import { BreadcrumbModule } from 'src/app/shared/framework-ui/primeng/breadcrumb/public_api';
import { ImageDirective } from 'src/app/shared/framework-ui/custom/appImage/appImage.directive';
import { ButtonModule } from 'src/app/shared/framework-ui/primeng/button/button';
import { SearchSelectorFinotexModule } from 'src/app/shared/framework-ui/custom/search-selector/search-selector.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { CreateStudentComponent } from '../student/create-student/create-student.component';
import { SidebarComponent } from '../ui/sidebar/sidebar.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DialogModule } from 'src/app/shared/framework-ui/primeng/dialog/dialog';
import { DropdownModule } from 'src/app/shared/framework-ui/primeng/dropdown/dropdown';
import { ToastModule } from 'src/app/shared/framework-ui/primeng/toast/toast';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NotesComponent } from '../dailyregister/notes/notes.component';
import { FinalReportComponent } from '../reports/final-report/final-report.component';
import { PaginatorModule } from 'src/app/shared/framework-ui/primeng/paginator/paginator';
import { TableModule } from 'src/app/shared/framework-ui/primeng/table/table';
import { DatepickerComponentModule } from 'src/app/shared/framework-ui/custom/datepicker/datepicker.component';
import { MultiSelectModule } from 'src/app/shared/framework-ui/primeng/multiselect/public_api';
import { ButtonFinotexModule } from 'src/app/shared/framework-ui/custom/button-finotex/button-finotex.component';
import { CursosComponent } from '../settings/cursos/cursos.component';
import { GradosComponent } from '../settings/grados/grados.component';
import { MateriasComponent } from '../settings/materias/materias.component';

export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    SidebarComponent,
    FooterComponent,
    NavbarComponent,
    DashboardComponent,
    ImageDirective,
    CreateStudentComponent,
    NotesComponent, 
    FinalReportComponent,
    CursosComponent,
    GradosComponent,
    MateriasComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule,
    CoreModule,
    BreadcrumbModule,
    ButtonModule,
    DialogModule,
    DropdownModule,
    TableModule,
    PaginatorModule,
    ToastModule,
    DatepickerComponentModule,
    SearchSelectorFinotexModule,
    MultiSelectModule,
    ButtonFinotexModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AplicationModule { }


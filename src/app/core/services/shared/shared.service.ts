import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ResponseBase } from 'src/app/shared/models/response-base';
import { environment } from 'src/environments/environment';

declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(public http: HttpClient) { }

  login(body): Observable<ResponseBase> {
    return this.http.post<ResponseBase>(
      `${environment.baseUrl.url}/Login`,
      body
    );
  }

  registerTeacher(body): Observable<ResponseBase> {
    return this.http.post<ResponseBase>(
      `${environment.baseUrl.url}/Docentes`,
      body
    );
  }

  createStudent(body): Observable<ResponseBase> {
    return this.http.post<ResponseBase>(
      `${environment.baseUrl.url}/Estudiantes`,
      body
    );
  }

  getReport(parameters): Observable<any> {
    return this.http.get<any>(
      `${environment.baseUrl.url}/MateriaEstudiante` + parameters
    );
  }

  getFinalReport(parameters): Observable<any> {
    return this.http.get<any>(
      `${environment.baseUrl.url}/Reportes` + parameters
    );
  }

  updateMateriaEstudiante(body): Observable<any> {
    return this.http.put<any>(
      `${environment.baseUrl.url}/MateriaEstudiante`,
      body
    );
  }

  ​zoneIdSalesExecutiveGroupIdGet(countryId: any, securityUsersId: any): Observable<ResponseBase> { 
    return this.http.get<ResponseBase>(
      `${environment.baseUrl.url}${environment.baseUrl.url}/Login`
    );
  }

  getMaterias(): Observable<any> {
    return this.http.get<any>(
      `${environment.baseUrl.url}/Materias` 
    );
  }

  getCursos(): Observable<any> {
    return this.http.get<any>(
      `${environment.baseUrl.url}/Cursos` 
    );
  }

  getGrados(): Observable<any> {
    return this.http.get<any>(
      `${environment.baseUrl.url}/Grados` 
    );
  }
}

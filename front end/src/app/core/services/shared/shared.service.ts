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

  getCursos(): Observable<any> {
    return this.http.get<any>(
      `${environment.baseUrl.url}/Cursos` 
    );
  }

  createCourse(body): Observable<any> {
    return this.http.post<any>(
      `${environment.baseUrl.url}/Cursos`,
      body
    );
  }

  updateCourse(body): Observable<any> {
    return this.http.put<any>(
      `${environment.baseUrl.url}/Cursos`,
      body
    );
  }

  deleteCourse(id): Observable<any> {
    return this.http.delete<any>(
      `${environment.baseUrl.url}/Cursos/${id}`
    );
  }

  getGrados(): Observable<any> {
    return this.http.get<any>(
      `${environment.baseUrl.url}/Grados` 
    );
  }

  createGrade(body): Observable<any> {
    return this.http.post<any>(
      `${environment.baseUrl.url}/Grados`,
      body
    );
  }

  updateGrade(body): Observable<any> {
    return this.http.put<any>(
      `${environment.baseUrl.url}/Grados`,
      body
    );
  }

  deleteGrade(id): Observable<any> {
    return this.http.delete<any>(
      `${environment.baseUrl.url}/Grados/${id}`
    );
  }

  getMaterias(): Observable<any> {
    return this.http.get<any>(
      `${environment.baseUrl.url}/Materias` 
    );
  }

  createMateria(body): Observable<any> {
    return this.http.post<any>(
      `${environment.baseUrl.url}/Materias`,
      body
    );
  }

  updateMateria(body): Observable<any> {
    return this.http.put<any>(
      `${environment.baseUrl.url}/Materias`,
      body
    );
  }

  deleteMateria(id): Observable<any> {
    return this.http.delete<any>(
      `${environment.baseUrl.url}/Materias/${id}`
    );
  }
}

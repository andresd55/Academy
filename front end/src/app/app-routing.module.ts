import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotesComponent } from './components/dailyregister/notes/notes.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FinalReportComponent } from './components/reports/final-report/final-report.component';
import { CreateStudentComponent } from './components/student/create-student/create-student.component';
import { MateriasComponent } from './components/settings/materias/materias.component';
import { CursosComponent } from './components/settings/cursos/cursos.component';
import { GradosComponent } from './components/settings/grados/grados.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'create_student', component: CreateStudentComponent },
      { path: 'notes', component: NotesComponent },
      { path: 'final_report', component: FinalReportComponent },
      { path: 'materias', component: MateriasComponent },
      { path: 'cursos', component: CursosComponent },
      { path: 'grados', component: GradosComponent },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

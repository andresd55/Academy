import { AfterContentInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, AfterContentInit {

  public listMenu: any = [];
  currentUserAplication: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.currentUserAplication = JSON.parse(localStorage.getItem('user'));
  }

  ngAfterContentInit(): void {
    this.menu();
  }

  menu() {
    if(this.currentUserAplication.rol == 1){
      this.listMenu = [
        {
          label: "Estudiantes",
          id: "Estudiantes",
          icon: "fas fa-users",
          subMenu: [
            {
              label: "Registro Estudiantes",
              rute: "create_student"
            }
          ]
        },
        {
          label: "Registro Diario",
          id: "Registro",
          icon: "fas fa-spell-check",
          subMenu: [
            {
              label: "Notas, Asistencias...",
              rute: "notes"
            }
          ]
        },
        {
          label: "Reportes Académicos",
          id: "Reportes",
          icon: "fas fa-file-invoice",
          subMenu: [
            {
              label: "Reportes Finales",
              rute: "final_report"
            }
          ]
        },
        {
          label: "Parametrización",
          id: "param",
          icon: "fas fa-cubes",
          subMenu: [
            {
              label: "Materias",
              rute: "materias"
            },
            {
              label: "Cursos",
              rute: "cursos"
            },
            {
              label: "Grados",
              rute: "grados"
            }
          ]
        }
      ];
    } else {
      this.listMenu = [
        {
          label: "Reporte Notas",
          id: "Registro",
          icon: "fas fa-spell-check",
          subMenu: [
            {
              label: "Notas, Asistencias...",
              rute: "notes"
            }
          ]
        }
      ];
    }
  }

  navigateUrl(route: string) {
    this.router.navigate(['home/' + route]).then(() => {
      window.location.reload();
    });
  }
}

import { AfterContentInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, AfterContentInit {

  public listMenu: any = [];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    this.menu();
  }

  menu() {
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
      }
    ];
  }

  navigateUrl(route: string) {
    this.router.navigate(['home/' + route]).then(() => {
      window.location.reload();
    });
  }
}

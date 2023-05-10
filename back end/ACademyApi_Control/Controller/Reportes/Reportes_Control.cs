using ACademyApi_Datos.Database;
using ACademyApi_Entidades.Database;
using ACademyApi_Entidades.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ACademyApi_Control.Controller.Reportes
{
    public class Reportes_Control
    {
        private ACademyDbContext db;

        public Reportes_Control()
        {
            db = new ACademyDbContext();
        }

        public IQueryable<GrillaReporteAcademico> GetReporteAcademico()
        {
            return ObtenerGrillaReporteAcademico("");
        }

        public IQueryable<GrillaReporteAcademico> GetReporteAcademico(FiltrosConsulta filtros)
        {
            string filtrosScript = string.Empty;

            filtrosScript += filtros.idCurso != 0 ? " AND e.idCurso = " + filtros.idCurso : "";
            filtrosScript += filtros.idGrado != 0 ? " AND e.idGrado = " + filtros.idGrado : "";
            filtrosScript += filtros.idMateria != 0 ? " AND md.idMateria = " + filtros.idMateria : "";

            return ObtenerGrillaReporteAcademico(filtrosScript);
        }

        private IQueryable<GrillaReporteAcademico> ObtenerGrillaReporteAcademico(string filtros)
        {
            string script = @"SELECT 
	                            TRIM(u.nombres + ' ' + u.apellidos) estudiante,
	                            c.nombre curso,
	                            g.nombre grado,
	                            m.nombre materia,
	                            nota1 nota1,
	                            nota2 nota2,
	                            nota3 nota3,
	                            nota1 + nota2 + nota3 notaFinal,
	                            (nota1 + nota2 + nota3)/3 promedio,
	                            ROW_NUMBER() OVER(PARTITION BY e.idCurso, e.idGrado, md.idMateria ORDER BY (nota1 + nota2 + nota3) DESC) AS puesto
                            FROM ACademyDB.dbo.MateriaEstudiante me
                            INNER JOIN ACademyDB.dbo.Estudiante e ON me.idEstudiante = e.idEstudiante
                            INNER JOIN ACademyDB.dbo.Usuario u ON e.idUsuario = e.idUsuario
                            INNER JOIN ACademyDB.dbo.MateriaDocente md ON md.idMateriaDocente = me.idMateriaDocente
                            INNER JOIN ACademyDB.dbo.Curso c ON e.idCurso = c.idCurso
                            INNER JOIN ACademyDB.dbo.Grado g ON e.idGrado = g.idGrado
                            INNER JOIN ACademyDB.dbo.Materia m ON md.idMateria = m.idMateria
                            WHERE g.idGrado <> 1 and u.idRol = 2";

            script += filtros;
            script += " ORDER BY 2, 3, 4, 8 DESC";

            return db.Database.SqlQuery<GrillaReporteAcademico>(script).AsQueryable();
        }

        public void Dispose()
        {
            ((IDisposable)db).Dispose();
        }
    }
}

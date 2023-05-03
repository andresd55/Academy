using ACademyApi_Datos.Database;
using ACademyApi_Entidades.Database;
using ACademyApi_Entidades.Entidades;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ACademyApi_Control.Controller.Registro
{
    public class Estudiantes_Control : IDisposable
    {
        private ACademyDbContext db;

        public Estudiantes_Control()
        {
            db = new ACademyDbContext();
        }

        public IQueryable<Estudiante> GetEstudiantes()
        {
            return db.Estudiante;
        }


        public Estudiante GetEstudiantes(int id)
        {
            return db.Estudiante.Find(id);
        }


        public void PutEstudiantes(Estudiante estudiantes)
        {
            db.Entry(estudiantes).State = EntityState.Modified;
        }


        public void PostEstudiantes(Estudiante estudiantes)
        {
            db.Estudiante.Add(estudiantes);
        }

        public void DeleteEstudiantes(Estudiante estudiantes)
        {
            db.Estudiante.Remove(estudiantes);
        }

        public bool EstudiantesExists(int id)
        {
            return db.Estudiante.Count(e => e.idEstudiante == id) > 0;
        }

        public void SaveChange()
        {
            db.SaveChanges();
        }

        public void Dispose()
        {
            ((IDisposable)db).Dispose();
        }

        public Estudiante MapeoRegistroEstudiante(RegistroEstudiante infoEstudiante)
        {
            var newEstudiante = new Estudiante()
            {
                idEstudiante = infoEstudiante.idEstudiante,
                nombres = infoEstudiante.nombres,
                apellidos = infoEstudiante.apellidos,
                correo = infoEstudiante.correo,
                genero = infoEstudiante.genero,
                idGrado = infoEstudiante.idGrado,
                idCurso = infoEstudiante.idCurso
            };

            return newEstudiante;
        }
    }
}

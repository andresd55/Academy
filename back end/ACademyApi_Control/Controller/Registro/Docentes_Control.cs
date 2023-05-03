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
    public class Docentes_Control : IDisposable
    {
        private ACademyDbContext db;

        public Docentes_Control()
        {
            db = new ACademyDbContext();
        }

        public IQueryable<Docente> GetDocentes()
        {
            return db.Docente;
        }


        public Docente GetDocentes(int id)
        {
            return db.Docente.Find(id);
        }


        public void PutDocentes(Docente docentes)
        {
            db.Entry(docentes).State = EntityState.Modified;
        }


        public void PostDocentes(Docente docentes)
        {
            db.Docente.Add(docentes);
        }

        public void DeleteDocentes(Docente docentes)
        {
            db.Docente.Remove(docentes);
        }

        public bool DocentesExists(int id)
        {
            return db.Docente.Count(e => e.idDocente == id) > 0;
        }

        public Docente MapeoRegistroDocente(RegistroDocente infoDocente)
        {
            var newDocente = new Docente()
            {
                idDocente = infoDocente.idDocente,
                apellidos = infoDocente.apellidos,
                correo = infoDocente.correo,
                foto = infoDocente.foto,
                genero = infoDocente.genero,
                nombres = infoDocente.nombres,
                password = infoDocente.password,
                usuario = infoDocente.usuario
            };

            return newDocente;
        }

        public void SaveChange()
        {
            db.SaveChanges();
        }

        public void Dispose()
        {
            ((IDisposable)db).Dispose();
        }
    }
}

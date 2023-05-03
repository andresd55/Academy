using ACademyApi_Datos.Database;
using ACademyApi_Entidades.Database;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ACademyApi_Control.Controller.Parametrizacion
{
    public class Cursos_Control : IDisposable
    {
        private ACademyDbContext db;

        public Cursos_Control()
        {
            db = new ACademyDbContext();
        }

        public IQueryable<Curso> GetCursos()
        {
            return db.Curso;
        }


        public Curso GetCurso(int id)
        {
            return db.Curso.Find(id);
        }

        public void PutCurso(Curso curso)
        {
            db.Entry(curso).State = EntityState.Modified;
        }


        public void PostCurso(Curso curso)
        {
            db.Curso.Add(curso);
        }

        public void DeleteCurso(Curso curso)
        {
            db.Curso.Remove(curso);
        }

        public bool CursoExists(int id)
        {
            return db.Curso.Count(e => e.idCurso == id) > 0;
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

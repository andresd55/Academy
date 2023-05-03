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
    public class Materias_Control : IDisposable
    {
        private ACademyDbContext db;

        public Materias_Control()
        {
            db = new ACademyDbContext();
        }

        public IQueryable<Materia> GetMaterias()
        {
            return db.Materia;
        }


        public Materia GetMateria(int id)
        {
            return db.Materia.Find(id);
        }

        public void PutMateria(Materia materia)
        {
            db.Entry(materia).State = EntityState.Modified;
        }

        public void PostMateria(Materia materia)
        {
            db.Materia.Add(materia);
        }

        public void DeleteMateria(Materia materia)
        {
            db.Materia.Remove(materia);
        }

        public bool MateriaExists(int id)
        {
            return db.Materia.Count(e => e.idMateria == id) > 0;
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

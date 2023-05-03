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
    public class Grados_Control : IDisposable
    {
        private ACademyDbContext db;

        public Grados_Control()
        {
            db = new ACademyDbContext();
        }

        public IQueryable<Grado> GetGrados()
        {
            return db.Grado;
        }


        public Grado GetGrado(int id)
        {
            return db.Grado.Find(id);
        }

        public void PutGrado(Grado grado)
        {
            db.Entry(grado).State = EntityState.Modified;
        }

        public void PostGrado(Grado grado)
        {
            db.Grado.Add(grado);
        }

        public void DeleteGrado(Grado grado)
        {
            db.Grado.Remove(grado);
        }

        public bool GradoExists(int id)
        {
            return db.Grado.Count(e => e.idGrado == id) > 0;
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

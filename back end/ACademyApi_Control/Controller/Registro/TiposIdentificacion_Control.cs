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
    public class TiposIdentificacion_Control : IDisposable
    {
        private ACademyDbContext db;

        public TiposIdentificacion_Control()
        {
            db = new ACademyDbContext();
        }

        public IQueryable<TipoIdentificacion> GetTipoIdentificaciones()
        {
            return db.TipoIdentificacion;
        }


        public TipoIdentificacion GetTipoIdentificacion(int id)
        {
            return db.TipoIdentificacion.Find(id);
        }

        public void PutTipoIdentificacion(TipoIdentificacion TipoIdentificacion)
        {
            db.Entry(TipoIdentificacion).State = EntityState.Modified;
        }


        public void PostTipoIdentificacion(TipoIdentificacion TipoIdentificacion)
        {
            db.TipoIdentificacion.Add(TipoIdentificacion);
        }

        public void DeleteTipoIdentificacion(TipoIdentificacion TipoIdentificacion)
        {
            db.TipoIdentificacion.Remove(TipoIdentificacion);
        }

        public bool TipoIdentificacionExists(int id)
        {
            return db.TipoIdentificacion.Count(e => e.idTipoIdentificacion == id) > 0;
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

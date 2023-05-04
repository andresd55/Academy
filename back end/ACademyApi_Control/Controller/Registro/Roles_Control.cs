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
    public class Roles_Control : IDisposable
    {
        private ACademyDbContext db;

        public Roles_Control()
        {
            db = new ACademyDbContext();
        }

        public IQueryable<Rol> GetRoles()
        {
            return db.Rol;
        }


        public Rol GetRol(int id)
        {
            return db.Rol.Find(id);
        }

        public void PutRol(Rol rol)
        {
            db.Entry(rol).State = EntityState.Modified;
        }


        public void PostRol(Rol rol)
        {
            db.Rol.Add(rol);
        }

        public void DeleteRol(Rol rol)
        {
            db.Rol.Remove(rol);
        }

        public bool RolExists(int id)
        {
            return db.Rol.Count(e => e.idRol == id) > 0;
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

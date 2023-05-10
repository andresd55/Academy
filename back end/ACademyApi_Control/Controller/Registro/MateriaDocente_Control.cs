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
    public class MateriaDocente_Control : IDisposable
    {
        private ACademyDbContext db;

        public MateriaDocente_Control()
        {
            db = new ACademyDbContext();
        }
        public int GetIdMateriaDocenteByIdMateria(int idMateria)
        {
            return db.MateriaDocente.Where(m => m.idMateria == idMateria).FirstOrDefault().idMateriaDocente;
        }

        public void PutMateriaDocente(MateriaDocente materiaDocente)
        {
            db.Entry(materiaDocente).State = EntityState.Modified;
        }


        public void PostMateriaDocente(MateriaDocente materiaDocente)
        {
            db.MateriaDocente.Add(materiaDocente);
        }

        public MateriaDocente MapeoRegistroMateriaDocente(RegistroMateriaDocente registroMateriaDocente)
        {
            var newMateriaDocente = new MateriaDocente()
            {
                idMateriaDocente = registroMateriaDocente.idMateriaDocente,
                idDocente = registroMateriaDocente.idDocente,
                idMateria = registroMateriaDocente.idMateria
            };

            return newMateriaDocente;
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

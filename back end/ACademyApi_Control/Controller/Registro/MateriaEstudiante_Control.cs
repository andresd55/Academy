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
    public class MateriaEstudiante_Control : IDisposable
    {
        private ACademyDbContext db;

        public MateriaEstudiante_Control()
        {
            db = new ACademyDbContext();
        }

        public IQueryable<MateriaEstudiante> GetMateriaEstudiante()
        {
            var consulta = db.MateriaEstudiante;

            return consulta;
        }

        public MateriaEstudiante GetMateriaEstudiante(int id)
        {
            return db.MateriaEstudiante.FirstOrDefault(x => x.idMateriaEstudiante == id);
        }


        public IQueryable<MateriaEstudiante> GetMateriaEstudiante(FiltrosConsulta filtros)
        {
            var consulta = db.MateriaEstudiante.AsQueryable();

            if (filtros.idCurso != 0)
            {
                consulta = consulta.Where(x => x.estudiante.idCurso == filtros.idCurso);
            }

            if (filtros.idGrado != 0)
            {
                consulta = consulta.Where(x => x.estudiante.idGrado == filtros.idGrado);
            }

            if (filtros.idMateria != 0)
            {
                consulta = consulta.Where(x => x.materiaDocente.idMateria == filtros.idMateria);
            }

            return consulta;
        }


        public void PutMateriaEstudiante(MateriaEstudiante estudiantes)
        {
            db.Entry(estudiantes).State = EntityState.Modified;
        }


        public void PostMateriaEstudiante(MateriaEstudiante estudiantes)
        {
            db.MateriaEstudiante.Add(estudiantes);
        }

        public void DeleteMateriaEstudiante(MateriaEstudiante estudiantes)
        {
            db.MateriaEstudiante.Remove(estudiantes);
        }

        public bool MateriaEstudianteExists(int id)
        {
            return db.MateriaEstudiante.Count(e => e.idMateriaEstudiante == id) > 0;
        }

        public void SaveChange()
        {
            db.SaveChanges();
        }

        public void Dispose()
        {
            ((IDisposable)db).Dispose();
        }

        public MateriaEstudiante MapeoRegistroMateriaEstudiante(RegistroMateriaEstudiante registroMateriaEstudiante)
        {
            var newMateriaEstudiante = new MateriaEstudiante()
            {
                idMateriaEstudiante = registroMateriaEstudiante.idMateriaEstudiante,
                idEstudiante = registroMateriaEstudiante.idEstudiante,
                idMateriaDocente = registroMateriaEstudiante.idMateriaDocente,
                faltas = registroMateriaEstudiante.faltas,
                nota1 = registroMateriaEstudiante.nota1,
                nota2 = registroMateriaEstudiante.nota2,
                nota3 = registroMateriaEstudiante.nota3,
                observacion = registroMateriaEstudiante.observacion
            };

            return newMateriaEstudiante;
        }
    }
}

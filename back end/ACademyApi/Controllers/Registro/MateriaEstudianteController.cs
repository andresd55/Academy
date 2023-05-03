using ACademyApi_Control.Controller.Registro;
using ACademyApi_Entidades.Database;
using ACademyApi_Entidades.Entidades;
using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;

namespace ACademyApi.Controllers.Registro
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class MateriaEstudianteController : ApiController
    {
        private MateriaEstudiante_Control _control;

        public MateriaEstudianteController()
        {
            _control = new MateriaEstudiante_Control();

        }

        // GET: api/MateriaEstudiante
        public List<MateriaEstudiante> GetMateriaEstudiante()
        {
            return _control.GetMateriaEstudiante().ToList();
        }

        // GET: api/MateriaEstudiante/5
        [ResponseType(typeof(MateriaEstudiante))]
        public IHttpActionResult GetMateriaEstudiante(int idGrado, int idCurso, int idMateria)
        {
            var filtros = new FiltrosConsulta()
            {
                idGrado = idGrado,
                idCurso = idCurso,
                idMateria = idMateria
            };

            List<MateriaEstudiante> consulta = _control.GetMateriaEstudiante(filtros).ToList();

            return Ok(consulta);
        }

        // PUT: api/MateriaEstudiante/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutMateriaEstudiante(MateriaEstudiante estudiantes)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _control.PutMateriaEstudiante(estudiantes);

            try
            {
                _control.SaveChange();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_control.MateriaEstudianteExists(estudiantes.idMateriaEstudiante))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/MateriaEstudiante
        [ResponseType(typeof(MateriaEstudiante))]
        public IHttpActionResult PostMateriaEstudiante(MateriaEstudiante estudiantes)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _control.PostMateriaEstudiante(estudiantes);
            _control.SaveChange();

            return CreatedAtRoute("DefaultApi", new { id = estudiantes.idEstudiante }, estudiantes);
        }

        // DELETE: api/MateriaEstudiante/5
        [ResponseType(typeof(MateriaEstudiante))]
        public IHttpActionResult DeleteMateriaEstudiante(int id)
        {
            MateriaEstudiante estudiantes = _control.GetMateriaEstudiante(id);
            if (estudiantes == null)
            {
                return NotFound();
            }

            _control.DeleteMateriaEstudiante(estudiantes);
            _control.SaveChange();

            return Ok(estudiantes);
        }
    }
}

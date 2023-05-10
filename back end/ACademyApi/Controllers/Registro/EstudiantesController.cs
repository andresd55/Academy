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
    public class EstudiantesController : ApiController
    {
        private Estudiantes_Control _control;
        private MateriaEstudiante_Control _controlMateriaEstudiante;
        private MateriaDocente_Control _controlMateriaDocente;

        public EstudiantesController()
        {
            _control = new Estudiantes_Control();
            _controlMateriaEstudiante = new MateriaEstudiante_Control();
            _controlMateriaDocente = new MateriaDocente_Control();
        }

        // GET: api/Estudiantes
        public List<Estudiante> GetEstudiantes()
        {
            return _control.GetEstudiantes().ToList();
        }

        // GET: api/Estudiantes/5
        [ResponseType(typeof(Estudiante))]
        public IHttpActionResult GetEstudiantes(int id)
        {
            Estudiante estudiantes = _control.GetEstudiantes(id);
            if (estudiantes == null)
            {
                return NotFound();
            }

            return Ok(estudiantes);
        }

        // PUT: api/Estudiantes/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutEstudiantes(int id, Estudiante estudiantes)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != estudiantes.idEstudiante)
            {
                return BadRequest();
            }

            _control.PutEstudiantes(estudiantes);

            try
            {
                _control.SaveChange();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_control.EstudiantesExists(id))
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

        // POST: api/Estudiantes
        [ResponseType(typeof(Estudiante))]
        public IHttpActionResult PostEstudiantes(RegistroEstudiante registroEstudiante)
        {
            var estudiante = _control.MapeoRegistroEstudiante(registroEstudiante);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _control.PutEstudiantes(estudiante);
            _control.SaveChange();

            foreach (int idMateria in registroEstudiante.arrayIdMaterias)
            {
                int idMateriaDocente = _controlMateriaDocente.GetIdMateriaDocenteByIdMateria(idMateria);
                var materiaEstudiante = _controlMateriaEstudiante.MapeoRegistroMateriaEstudiante(new
                RegistroMateriaEstudiante()
                {
                    idMateriaEstudiante = 0,
                    idEstudiante = estudiante.idEstudiante,
                    idMateriaDocente = idMateriaDocente,
                    faltas = 0,
                    nota1 = 0,
                    nota2 = 0,
                    nota3 = 0,
                    observacion = string.Empty
                });
                _controlMateriaEstudiante.PostMateriaEstudiante(materiaEstudiante);
                _controlMateriaEstudiante.SaveChange();
            }

            return CreatedAtRoute("DefaultApi", new { id = estudiante.idEstudiante }, estudiante);
        }

        // DELETE: api/Estudiantes/5
        [ResponseType(typeof(Estudiante))]
        public IHttpActionResult DeleteEstudiantes(int id)
        {
            Estudiante estudiantes = _control.GetEstudiantes(id);
            if (estudiantes == null)
            {
                return NotFound();
            }

            _control.DeleteEstudiantes(estudiantes);
            _control.SaveChange();

            return Ok(estudiantes);
        }
    }
}

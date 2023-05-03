using ACademyApi_Control.Controller.Parametrizacion;
using ACademyApi_Entidades.Database;
using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;

namespace ACademyApi.Controllers.Parametrizacion
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class CursosController : ApiController
    {
        private Cursos_Control _controlCurso;

        public CursosController()
        {
            _controlCurso = new Cursos_Control();

        }

        // GET: api/Cursos
        public IQueryable<Curso> GetCursos()
        {
            return _controlCurso.GetCursos();
        }

        // GET: api/Cursos/5
        [ResponseType(typeof(Curso))]
        public IHttpActionResult GetCursos(int id)
        {
            Curso curso = _controlCurso.GetCurso(id);
            if (curso == null)
            {
                return NotFound();
            }

            return Ok(curso);
        }

        // PUT: api/Cursos/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutCurso(Curso curso)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _controlCurso.PutCurso(curso);

            try
            {
                _controlCurso.SaveChange();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_controlCurso.CursoExists(curso.idCurso))
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

        // POST: api/Cursos
        [ResponseType(typeof(Curso))]
        public IHttpActionResult PostCursos(Curso curso)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _controlCurso.PostCurso(curso);
            _controlCurso.SaveChange();

            return CreatedAtRoute("DefaultApi", new { id = curso.idCurso }, curso);
        }

        // DELETE: api/Cursos/5
        [ResponseType(typeof(Curso))]
        public IHttpActionResult DeleteCursos(int id)
        {
            Curso Cursos = _controlCurso.GetCurso(id);
            if (Cursos == null)
            {
                return NotFound();
            }

            _controlCurso.DeleteCurso(Cursos);
            _controlCurso.SaveChange();

            return Ok(Cursos);
        }
    }
}

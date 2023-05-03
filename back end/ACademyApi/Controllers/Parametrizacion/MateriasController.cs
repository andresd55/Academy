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
    public class MateriasController : ApiController
    {
        private Materias_Control _controlMateria;

        public MateriasController()
        {
            _controlMateria = new Materias_Control();

        }

        // GET: api/Materias
        public IQueryable<Materia> GetMaterias()
        {
            return _controlMateria.GetMaterias();
        }

        // GET: api/Materias/5
        [ResponseType(typeof(Materia))]
        public IHttpActionResult GetMaterias(int id)
        {
            Materia materia = _controlMateria.GetMateria(id);
            if (materia == null)
            {
                return NotFound();
            }

            return Ok(materia);
        }

        // PUT: api/Materias/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutMateria(Materia Materia)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _controlMateria.PutMateria(Materia);

            try
            {
                _controlMateria.SaveChange();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_controlMateria.MateriaExists(Materia.idMateria))
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

        // POST: api/Materias
        [ResponseType(typeof(Materia))]
        public IHttpActionResult PostMaterias(Materia Materia)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _controlMateria.PostMateria(Materia);
            _controlMateria.SaveChange();

            return CreatedAtRoute("DefaultApi", new { id = Materia.idMateria }, Materia);
        }

        // DELETE: api/Materias/5
        [ResponseType(typeof(Materia))]
        public IHttpActionResult DeleteMaterias(int id)
        {
            Materia Materias = _controlMateria.GetMateria(id);
            if (Materias == null)
            {
                return NotFound();
            }

            _controlMateria.DeleteMateria(Materias);
            _controlMateria.SaveChange();

            return Ok(Materias);
        }
    }
}

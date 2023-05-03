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
    public class GradosController : ApiController
    {
        private Grados_Control _controlGrado;

        public GradosController()
        {
            _controlGrado = new Grados_Control();

        }

        // GET: api/Grados
        public IQueryable<Grado> GetGrados()
        {
            return _controlGrado.GetGrados();
        }

        // GET: api/Grados/5
        [ResponseType(typeof(Grado))]
        public IHttpActionResult GetGrados(int id)
        {
            Grado grado = _controlGrado.GetGrado(id);
            if (grado == null)
            {
                return NotFound();
            }

            return Ok(grado);
        }

        // PUT: api/Grados/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutGrado(Grado Grado)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _controlGrado.PutGrado(Grado);

            try
            {
                _controlGrado.SaveChange();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_controlGrado.GradoExists(Grado.idGrado))
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

        // POST: api/Grados
        [ResponseType(typeof(Grado))]
        public IHttpActionResult PostGrados(Grado Grado)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _controlGrado.PostGrado(Grado);
            _controlGrado.SaveChange();

            return CreatedAtRoute("DefaultApi", new { id = Grado.idGrado }, Grado);
        }

        // DELETE: api/Grados/5
        [ResponseType(typeof(Grado))]
        public IHttpActionResult DeleteGrados(int id)
        {
            Grado Grados = _controlGrado.GetGrado(id);
            if (Grados == null)
            {
                return NotFound();
            }

            _controlGrado.DeleteGrado(Grados);
            _controlGrado.SaveChange();

            return Ok(Grados);
        }
    }
}

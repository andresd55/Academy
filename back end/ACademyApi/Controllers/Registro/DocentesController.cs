using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using ACademyApi_Control.Controller.Registro;
using ACademyApi_Entidades.Database;
using ACademyApi_Entidades.Entidades;

namespace ACademyApi.Controllers.Registro
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class DocentesController : ApiController
    {
        private Docentes_Control _controlDocente;
        private MateriaDocente_Control _controlMateriaDocente;

        public DocentesController()
        {
            _controlDocente = new Docentes_Control();
            _controlMateriaDocente = new MateriaDocente_Control();

        }

        // GET: api/Docentes
        public IQueryable<Docente> GetDocentes()
        {
            return _controlDocente.GetDocentes();
        }

        // GET: api/Docentes/5
        [ResponseType(typeof(Docente))]
        public IHttpActionResult GetDocentes(int id)
        {
            Docente docentes = _controlDocente.GetDocentes(id);
            if (docentes == null)
            {
                return NotFound();
            }

            return Ok(docentes);
        }

        // PUT: api/Docentes/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutDocentes(int id, RegistroDocente registroDocente)
        {
            var docente = _controlDocente.MapeoRegistroDocente(registroDocente);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != registroDocente.idDocente)
            {
                return BadRequest();
            }

            var materiaDocente = _controlMateriaDocente.MapeoRegistroMateriaDocente(new RegistroMateriaDocente()
            {
                idMateriaDocente = registroDocente.idMateriaDocente,
                idDocente = docente.idDocente,
                idMateria = registroDocente.idMateria
            });

            _controlDocente.PutDocentes(docente);
            _controlMateriaDocente.PutMateriaDocente(materiaDocente);

            try
            {
                _controlDocente.SaveChange();
                _controlMateriaDocente.SaveChange();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_controlDocente.DocentesExists(id))
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

        // POST: api/Docentes
        [ResponseType(typeof(Docente))]
        public IHttpActionResult PostDocentes(RegistroDocente registroDocente)
        {
            var docente = _controlDocente.MapeoRegistroDocente(registroDocente);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _controlDocente.PostDocentes(docente);
            _controlDocente.SaveChange();

            var materiaDocente = _controlMateriaDocente.MapeoRegistroMateriaDocente(new RegistroMateriaDocente() { idMateriaDocente = 0, idDocente = docente.idDocente, idMateria = registroDocente.idMateria });
            _controlMateriaDocente.PostMateriaDocente(materiaDocente);
            _controlMateriaDocente.SaveChange();

            return CreatedAtRoute("DefaultApi", new { id = docente.idDocente }, docente);
        }

        // DELETE: api/Docentes/5
        [ResponseType(typeof(Docente))]
        public IHttpActionResult DeleteDocentes(int id)
        {
            Docente docentes = _controlDocente.GetDocentes(id);
            if (docentes == null)
            {
                return NotFound();
            }

            _controlDocente.DeleteDocentes(docentes);
            _controlDocente.SaveChange();

            return Ok(docentes);
        }

    }
}
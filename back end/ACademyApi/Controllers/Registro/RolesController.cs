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
    public class RolesController : ApiController
    {
        private Roles_Control _controlRol;

        public RolesController()
        {
            _controlRol = new Roles_Control();

        }

        // GET: api/Roles
        public IQueryable<Rol> GetRoles()
        {
            return _controlRol.GetRoles();
        }

        // GET: api/Roles/5
        [ResponseType(typeof(Rol))]
        public IHttpActionResult GetRoles(int id)
        {
            Rol rol = _controlRol.GetRol(id);
            if (rol == null)
            {
                return NotFound();
            }

            return Ok(rol);
        }

        // PUT: api/Roles/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutRol(Rol rol)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _controlRol.PutRol(rol);

            try
            {
                _controlRol.SaveChange();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_controlRol.RolExists(rol.idRol))
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

        // POST: api/Roles
        [ResponseType(typeof(Rol))]
        public IHttpActionResult PostRoles(Rol rol)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _controlRol.PostRol(rol);
            _controlRol.SaveChange();

            return CreatedAtRoute("DefaultApi", new { id = rol.idRol }, rol);
        }

        // DELETE: api/Roles/5
        [ResponseType(typeof(Rol))]
        public IHttpActionResult DeleteRoles(int id)
        {
            Rol rol = _controlRol.GetRol(id);
            if (rol == null)
            {
                return NotFound();
            }

            _controlRol.DeleteRol(rol);
            _controlRol.SaveChange();

            return Ok(rol);
        }
    }
}

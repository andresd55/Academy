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
    public class UsuariosController : ApiController
    {
        private Usuarios_Control _controlUsuario;
        private MateriaDocente_Control _controlMateriaDocente;

        public UsuariosController()
        {
            _controlUsuario = new Usuarios_Control();
            _controlMateriaDocente = new MateriaDocente_Control();

        }

        // GET: api/Usuarios
        public IQueryable<Usuario> GetUsuarios()
        {
            return _controlUsuario.GetUsuarios();
        }

        // GET: api/Usuarios/5
        [ResponseType(typeof(Usuario))]
        public IHttpActionResult GetUsuarios(int id)
        {
            Usuario usuarios = _controlUsuario.GetUsuarios(id);
            if (usuarios == null)
            {
                return NotFound();
            }

            return Ok(usuarios);
        }

        // PUT: api/Usuarios/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutUsuarios(int id, RegistroUsuario registroUsuario)
        {
            var Usuario = _controlUsuario.MapeoRegistroUsuario(registroUsuario);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != registroUsuario.idUsuario)
            {
                return BadRequest();
            }

            _controlUsuario.PutUsuarios(Usuario);

            try
            {
                _controlUsuario.SaveChange();
                _controlMateriaDocente.SaveChange();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_controlUsuario.UsuariosExists(id))
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

        // POST: api/Usuarios
        [ResponseType(typeof(Usuario))]
        public IHttpActionResult PostUsuarios(RegistroUsuario registroUsuario)
        {
            var usuario = _controlUsuario.MapeoRegistroUsuario(registroUsuario);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _controlUsuario.PostUsuarios(usuario);
            _controlUsuario.SaveChange();

            foreach(int idMateria in registroUsuario.arrayIdMaterias)
            {
                var materiaUsuario = _controlMateriaDocente.MapeoRegistroMateriaDocente(new RegistroMateriaDocente() { idMateriaDocente = 0, idDocente = usuario.idUsuario, idMateria = idMateria });
                _controlMateriaDocente.PostMateriaDocente(materiaUsuario);
                _controlMateriaDocente.SaveChange();
            }

            return CreatedAtRoute("DefaultApi", new { id = usuario.idUsuario }, usuario);
        }

        // DELETE: api/Usuarios/5
        [ResponseType(typeof(Usuario))]
        public IHttpActionResult DeleteUsuarios(int id)
        {
            Usuario usuario = _controlUsuario.GetUsuarios(id);
            if (usuario == null)
            {
                return NotFound();
            }

            _controlUsuario.DeleteUsuarios(usuario);
            _controlUsuario.SaveChange();

            return Ok(usuario);
        }

    }
}
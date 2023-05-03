using ACademyApi_Control.Controller.Login;
using ACademyApi_Entidades.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

namespace ACademyApi.Controllers.Login
{
    public class LoginController : ApiController
    {
        private Login_Control _control;

        public LoginController()
        {
            _control = new Login_Control();
        }

        // POST: api/Login
        [ResponseType(typeof(ResponseLogin))]
        public IHttpActionResult Post([FromBody] UserLogin user)
        {
            var login = _control.ValidarUsuario(user);

            if (login == null)
            {
                return NotFound();
            }

            return Ok(login);
        }
    }
}

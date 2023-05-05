using ACademyApi_Datos.Database;
using ACademyApi_Entidades.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ACademyApi_Control.Controller.Login
{
    public class Login_Control
    {
        private ACademyDbContext _db;

        public Login_Control()
        {
            _db = new ACademyDbContext();
        }

        public ResponseLogin ValidarUsuario(UserLogin user)
        {
            var login = _db.Usuario.Where(x => x.usuario == user.username && x.password == user.password)
                .Select(x => new ResponseLogin() {
                    nombre = (x.nombres + " "+x.apellidos).Trim(),
                    usuario = x.usuario,
                    email = x.correo,
                    foto = x.foto,
                    rol = x.idRol
                } ).FirstOrDefault();

            return login;
        }
    }
}

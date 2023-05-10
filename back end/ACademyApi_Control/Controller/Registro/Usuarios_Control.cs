using ACademyApi_Datos.Database;
using ACademyApi_Entidades.Database;
using ACademyApi_Entidades.Entidades;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ACademyApi_Control.Controller.Registro
{
    public class Usuarios_Control : IDisposable
    {
        private ACademyDbContext db;

        public Usuarios_Control()
        {
            db = new ACademyDbContext();
        }

        public IQueryable<Usuario> GetUsuarios()
        {
            return db.Usuario;
        }


        public Usuario GetUsuarios(int id)
        {
            return db.Usuario.Find(id);
        }


        public void PutUsuarios(Usuario Usuarios)
        {
            db.Entry(Usuarios).State = EntityState.Modified;
        }


        public void PostUsuarios(Usuario usuarios)
        {
            db.Usuario.Add(usuarios);
        }

        public void DeleteUsuarios(Usuario usuarios)
        {
            db.Usuario.Remove(usuarios);
        }

        public bool UsuariosExists(int id)
        {
            return db.Usuario.Count(e => e.idUsuario == id) > 0;
        }

        public Usuario MapeoRegistroUsuario(RegistroUsuario infoUsuario)
        {
            var newUsuario = new Usuario()
            {
                idUsuario = infoUsuario.idUsuario,
                apellidos = infoUsuario.apellidos,
                correo = infoUsuario.correo,
                foto = infoUsuario.foto,
                genero = infoUsuario.genero,
                nombres = infoUsuario.nombres,
                password = infoUsuario.password,
                usuario = infoUsuario.usuario,
                idRol = infoUsuario.idRol,
                identificacion = infoUsuario.identificacion,
                idTipoIdentificacion = infoUsuario.idTipoIdentificacion
            };

            return newUsuario;
        }

        public void SaveChange()
        {
            db.SaveChanges();
        }

        public void Dispose()
        {
            ((IDisposable)db).Dispose();
        }
    }
}

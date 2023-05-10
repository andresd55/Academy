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
    public class TipoIdentificacionController : ApiController
    {
        private TiposIdentificacion_Control _controlTiposIdentificacion;

        public TipoIdentificacionController()
        {
            _controlTiposIdentificacion = new TiposIdentificacion_Control();

        }

        // GET: api/TipoIdentificacion
        public IQueryable<TipoIdentificacion> GetTipoIdentificacion()
        {
            return _controlTiposIdentificacion.GetTipoIdentificaciones();
        }
    }
}

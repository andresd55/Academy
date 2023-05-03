using ACademyApi_Control.Controller.Reportes;
using ACademyApi_Entidades.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

namespace ACademyApi.Controllers.Reportes
{
    public class ReportesController : ApiController
    {
        private Reportes_Control _control;

        public ReportesController()
        {
            _control = new Reportes_Control();

        }

        // GET: api/Reportes
        public List<GrillaReporteAcademico> GetReporteAcademico()
        {
            return _control.GetReporteAcademico().ToList();
        }

        // GET: api/Reportes/5
        [ResponseType(typeof(GrillaReporteAcademico))]
        public IHttpActionResult GetReporteAcademico(int idGrado, int idCurso, int idMateria)
        {
            var filtros = new FiltrosConsulta()
            {
                idGrado = idGrado,
                idCurso = idCurso,
                idMateria = idMateria
            };

            List<GrillaReporteAcademico> consulta = _control.GetReporteAcademico(filtros).ToList();

            return Ok(consulta);
        }
    }
}

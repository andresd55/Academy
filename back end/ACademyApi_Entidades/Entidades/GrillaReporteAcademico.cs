using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ACademyApi_Entidades.Entidades
{
    public class GrillaReporteAcademico
    {

        public string estudiante { get; set; }

        public string curso { get; set; }

        public string grado { get; set; }

        public string materia { get; set; }

        public decimal nota1 { get; set; }

        public decimal nota2 { get; set; }

        public decimal nota3 { get; set; }

        public decimal notaFinal { get; set; }

        public decimal promedio { get; set; }

        public Int64 puesto { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ACademyApi_Entidades.Entidades
{
    public class RegistroMateriaEstudiante
    {
        public int idMateriaEstudiante { get; set; }

        public int idEstudiante { get; set; }

        public int idMateriaDocente { get; set; }

        public int faltas { get; set; }

        public decimal nota1 { get; set; }

        public decimal nota2 { get; set; }

        public decimal nota3 { get; set; }

        public string observacion { get; set; }
    }
}

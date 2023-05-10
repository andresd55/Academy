using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ACademyApi_Entidades.Entidades
{
    public class RegistroEstudiante
    {
        public int idEstudiante { get; set; }

        public int idGrado { get; set; }

        public int idCurso { get; set; }

        public int idUsuario { get; set; }

        public int[] arrayIdMaterias { get; set; }
    }
}

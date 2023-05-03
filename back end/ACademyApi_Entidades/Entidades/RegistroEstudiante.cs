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

        public string nombres { get; set; }

        public string apellidos { get; set; }

        public string correo { get; set; }

        public string genero { get; set; }

        public int idGrado { get; set; }

        public int idCurso { get; set; }

        public int idMateriaDocente { get; set; }
    }
}

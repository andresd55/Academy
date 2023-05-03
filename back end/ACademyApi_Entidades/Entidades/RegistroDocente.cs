using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ACademyApi_Entidades.Entidades
{
    public class RegistroDocente
    {
        public int idDocente { get; set; }

        public string nombres { get; set; }

        public string apellidos { get; set; }

        public string correo { get; set; }

        public byte[] foto { get; set; }

        public string genero { get; set; }

        public string usuario { get; set; }

        public string password { get; set; }

        public int idMateriaDocente { get; set; }
        
        public int idMateria { get; set; }
    }
}

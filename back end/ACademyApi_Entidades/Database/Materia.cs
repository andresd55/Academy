using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ACademyApi_Entidades.Database
{
    public class Materia
    {
        [Key]
        public int idMateria { get; set; }

        public string nombre { get; set; }

        [JsonIgnore]
        public virtual List<MateriaDocente> materiaDocente { get; set; }
    }
}

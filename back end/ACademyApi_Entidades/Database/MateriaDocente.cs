using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ACademyApi_Entidades.Database
{
    public class MateriaDocente
    {
        [Key]
        public int idMateriaDocente { get; set; }

        public int idMateria { get; set; }

        public int idDocente { get; set; }

        [ForeignKey("idMateria")]
        public virtual Materia materia { get; set; }

        [ForeignKey("idDocente")]
        [JsonIgnore]
        public virtual Usuario docente { get; set; }

        [JsonIgnore]
        public virtual List<MateriaEstudiante> materiaEstudiante { get; set; }
    }
}

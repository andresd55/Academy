using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ACademyApi_Entidades.Database
{
    public partial class Estudiante
    {
        [Key]
        public int idEstudiante { get; set; }

        public int idGrado { get; set; }

        public int idCurso { get; set; }

        public int idUsuario { get; set; }

        [ForeignKey("idCurso")]
        public virtual Curso curso { get; set; }

        [ForeignKey("idGrado")]
        public virtual Grado grado { get; set; }

        [ForeignKey("idUsuario")]
        public virtual Usuario usuario { get; set; }

        [JsonIgnore]
        public virtual List<MateriaEstudiante> materiaEstudiante { get; set; }
    }
}

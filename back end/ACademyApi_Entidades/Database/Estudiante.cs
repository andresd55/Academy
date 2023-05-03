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

        public string nombres { get; set; }

        public string apellidos { get; set; }

        public string correo { get; set; }

        public string genero { get; set; }

        public int idGrado { get; set; }

        public int idCurso { get; set; }

        [ForeignKey("idCurso")]
        public virtual Curso curso { get; set; }

        [ForeignKey("idGrado")]
        public virtual Grado grado { get; set; }

        [JsonIgnore]
        public virtual List<MateriaEstudiante> materiaEstudiante { get; set; }
    }
}

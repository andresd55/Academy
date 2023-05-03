using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ACademyApi_Entidades.Database
{
    public class MateriaEstudiante
    {
        [Key]
        public int idMateriaEstudiante { get; set; }

        public int idEstudiante { get; set; }

        public int idMateriaDocente { get; set; }

        [DefaultValue(0)]
        public int faltas { get; set; }

        [DefaultValue(0)]
        public decimal nota1 { get; set; }

        [DefaultValue(0)]
        public decimal nota2 { get; set; }

        [DefaultValue(0)]
        public decimal nota3 { get; set; }

        public string observacion { get; set; }

        [ForeignKey("idEstudiante")]
        public virtual Estudiante estudiante { get; set; }

        [ForeignKey("idMateriaDocente")]
        public virtual MateriaDocente materiaDocente { get; set; }
    }
}

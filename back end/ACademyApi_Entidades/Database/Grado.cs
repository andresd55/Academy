﻿using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Xml.Serialization;

namespace ACademyApi_Entidades.Database
{
    public partial class Grado
    {
        [Key]
        public int idGrado { get; set; }

        public string nombre { get; set; }

        [JsonIgnore]
        public virtual List<Estudiante> estudiantes { get; set; }
    }
}
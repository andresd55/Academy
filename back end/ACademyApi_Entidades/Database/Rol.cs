using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Xml.Serialization;

namespace ACademyApi_Entidades.Database
{
    public partial class Rol
    {
        [Key]
        public int idRol { get; set; }

        public string nombre { get; set; }
    }
}

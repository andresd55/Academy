using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Xml.Serialization;

namespace ACademyApi_Entidades.Database
{
    public partial class TipoIdentificacion
    {
        [Key]
        public int idTipoIdentificacion { get; set; }

        public string nombre { get; set; }
    }
}

namespace ACademyApi_Entidades.Database
{
    using Newtonsoft.Json;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    public partial class Usuario
    {
        [Key]
        public int idUsuario { get; set; }

        public string nombres { get; set; }

        public string apellidos { get; set; }

        public string correo { get; set; }

        public byte[] foto { get; set; }

        public string genero { get; set; }

        public string usuario { get; set; }

        public string password { get; set; }
        public int idRol { get; set; }

        [JsonIgnore]
        public virtual List<MateriaDocente> materiaDocente { get; set; }
    }
}

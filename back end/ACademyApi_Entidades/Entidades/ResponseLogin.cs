using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ACademyApi_Entidades.Entidades
{
    public class ResponseLogin
    {
        public string nombre { get; set; }

        public string usuario { get; set; }

        public string email { get; set; }

        public byte[] foto { get; set; }
        public int rol { get; set; }
    }
}

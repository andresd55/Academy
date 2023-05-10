using ACademyApi_Entidades.Database;
using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;

namespace ACademyApi_Datos.Database
{
    public partial class ACademyDbContext : DbContext, IDisposable
    {
        public ACademyDbContext()
            : base("name=ACademy")
        {
        }
        public virtual DbSet<Curso> Curso { get; set; }
        public virtual DbSet<Usuario> Usuario { get; set; }
        public virtual DbSet<Rol> Rol { get; set; }
        public virtual DbSet<Estudiante> Estudiante { get; set; }
        public virtual DbSet<Grado> Grado { get; set; }
        public virtual DbSet<Materia> Materia { get; set; }
        public virtual DbSet<MateriaDocente> MateriaDocente { get; set; }
        public virtual DbSet<MateriaEstudiante> MateriaEstudiante { get; set; }
        public virtual DbSet<TipoIdentificacion> TipoIdentificacion { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();

            base.OnModelCreating(modelBuilder);
        }
    }
}

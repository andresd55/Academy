namespace ACademyApi_Datos.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Materias : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.MateriaEstudiante",
                c => new
                    {
                        idMateriaEstudiante = c.Int(nullable: false, identity: true),
                        idEstudiante = c.Int(nullable: false),
                        idMateriaDocente = c.Int(nullable: false),
                        faltas = c.Int(nullable: false),
                        nota1 = c.Decimal(nullable: false, precision: 18, scale: 2),
                        nota2 = c.Decimal(nullable: false, precision: 18, scale: 2),
                        nota3 = c.Decimal(nullable: false, precision: 18, scale: 2),
                        observacion = c.String(),
                    })
                .PrimaryKey(t => t.idMateriaEstudiante)
                .ForeignKey("dbo.Estudiante", t => t.idEstudiante, cascadeDelete: true)
                .ForeignKey("dbo.MateriaDocente", t => t.idMateriaDocente, cascadeDelete: true)
                .Index(t => t.idEstudiante)
                .Index(t => t.idMateriaDocente);
            
            CreateTable(
                "dbo.MateriaDocente",
                c => new
                    {
                        idMateriaDocente = c.Int(nullable: false, identity: true),
                        idMateria = c.Int(nullable: false),
                        idDocente = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.idMateriaDocente)
                .ForeignKey("dbo.Docente", t => t.idDocente, cascadeDelete: true)
                .ForeignKey("dbo.Materia", t => t.idMateria, cascadeDelete: true)
                .Index(t => t.idMateria)
                .Index(t => t.idDocente);
            
            CreateTable(
                "dbo.Materia",
                c => new
                    {
                        idMateria = c.Int(nullable: false, identity: true),
                        nombre = c.String(),
                    })
                .PrimaryKey(t => t.idMateria);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.MateriaEstudiante", "idMateriaDocente", "dbo.MateriaDocente");
            DropForeignKey("dbo.MateriaDocente", "idMateria", "dbo.Materia");
            DropForeignKey("dbo.MateriaDocente", "idDocente", "dbo.Docente");
            DropForeignKey("dbo.MateriaEstudiante", "idEstudiante", "dbo.Estudiante");
            DropIndex("dbo.MateriaDocente", new[] { "idDocente" });
            DropIndex("dbo.MateriaDocente", new[] { "idMateria" });
            DropIndex("dbo.MateriaEstudiante", new[] { "idMateriaDocente" });
            DropIndex("dbo.MateriaEstudiante", new[] { "idEstudiante" });
            DropTable("dbo.Materia");
            DropTable("dbo.MateriaDocente");
            DropTable("dbo.MateriaEstudiante");
        }
    }
}

namespace ACademyApi_Datos.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Estudiantes : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Curso",
                c => new
                    {
                        idCurso = c.Int(nullable: false, identity: true),
                        nombre = c.String(),
                    })
                .PrimaryKey(t => t.idCurso);
            
            CreateTable(
                "dbo.Estudiante",
                c => new
                    {
                        idEstudiante = c.Int(nullable: false, identity: true),
                        nombres = c.String(),
                        apellidos = c.String(),
                        correo = c.String(),
                        genero = c.String(),
                        idGrado = c.Int(nullable: false),
                        idCurso = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.idEstudiante)
                .ForeignKey("dbo.Curso", t => t.idCurso, cascadeDelete: true)
                .ForeignKey("dbo.Grado", t => t.idGrado, cascadeDelete: true)
                .Index(t => t.idGrado)
                .Index(t => t.idCurso);
            
            CreateTable(
                "dbo.Grado",
                c => new
                    {
                        idGrado = c.Int(nullable: false, identity: true),
                        nombre = c.String(),
                    })
                .PrimaryKey(t => t.idGrado);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Estudiante", "idGrado", "dbo.Grado");
            DropForeignKey("dbo.Estudiante", "idCurso", "dbo.Curso");
            DropIndex("dbo.Estudiante", new[] { "idCurso" });
            DropIndex("dbo.Estudiante", new[] { "idGrado" });
            DropTable("dbo.Grado");
            DropTable("dbo.Estudiante");
            DropTable("dbo.Curso");
            RenameTable(name: "dbo.Docente", newName: "Docentes");
        }
    }
}

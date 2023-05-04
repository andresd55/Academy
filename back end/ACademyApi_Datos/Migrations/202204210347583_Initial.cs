namespace ACademyApi_Datos.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Usuario",
                c => new
                    {
                        idUsuario = c.Int(nullable: false, identity: true),
                        nombres = c.String(),
                        apellidos = c.String(),
                        correo = c.String(),
                        foto = c.Binary(),
                        genero = c.String(),
                        usuario = c.String(),
                        password = c.String(),
                    })
                .PrimaryKey(t => t.idUsuario);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Usuario");
        }
    }
}

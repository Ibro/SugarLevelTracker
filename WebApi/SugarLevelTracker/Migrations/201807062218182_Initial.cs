using System.Data.Entity.Migrations;

namespace SugarLevelTracker.Migrations
{
    public partial class Initial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.SugarLevels",
                c => new
                {
                    Id = c.Int(nullable: false, identity: true),
                    Value = c.Single(nullable: false),
                    Name = c.String(nullable: false),
                    MeasuredAt = c.DateTime(nullable: false),
                })
                .PrimaryKey(t => t.Id);
        }

        public override void Down()
        {
            DropTable("dbo.SugarLevels");
        }
    }
}
using Microsoft.EntityFrameworkCore.Migrations;

namespace backend.Migrations.Identity
{
    public partial class User_UserDatails_Relation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DetailsId",
                table: "AspNetUsers",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DetailsId",
                table: "AspNetUsers");
        }
    }
}

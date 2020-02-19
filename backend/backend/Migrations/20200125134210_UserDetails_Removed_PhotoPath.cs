using Microsoft.EntityFrameworkCore.Migrations;

namespace backend.Migrations
{
    public partial class UserDetails_Removed_PhotoPath : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PhotoPath",
                table: "UserDetails");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PhotoPath",
                table: "UserDetails",
                type: "longtext CHARACTER SET utf8mb4",
                nullable: true);
        }
    }
}

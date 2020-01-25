using Microsoft.EntityFrameworkCore.Migrations;

namespace backend.Migrations
{
    public partial class Candidacies_OwnerId_NotNull : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "OwnerId",
                table: "Candidacies",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "OwnerId",
                table: "Candidacies",
                type: "int",
                nullable: true,
                oldClrType: typeof(int));
        }
    }
}

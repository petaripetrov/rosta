using Microsoft.EntityFrameworkCore.Migrations;

namespace backend.Migrations
{
    public partial class OwnerId_Candidacy : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Candidacies_Users_OwnerId",
                table: "Candidacies");

            migrationBuilder.AlterColumn<int>(
                name: "OwnerId",
                table: "Candidacies",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Candidacies_Users_OwnerId",
                table: "Candidacies",
                column: "OwnerId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Candidacies_Users_OwnerId",
                table: "Candidacies");

            migrationBuilder.AlterColumn<int>(
                name: "OwnerId",
                table: "Candidacies",
                type: "int",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_Candidacies_Users_OwnerId",
                table: "Candidacies",
                column: "OwnerId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

namespace backend.Migrations
{
    public partial class Survey_Users_FK_Changed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Surveys_Users_AuthorId",
                table: "Surveys");

            migrationBuilder.AlterColumn<int>(
                name: "AuthorId",
                table: "Surveys",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Surveys_Users_AuthorId",
                table: "Surveys",
                column: "AuthorId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Surveys_Users_AuthorId",
                table: "Surveys");

            migrationBuilder.AlterColumn<int>(
                name: "AuthorId",
                table: "Surveys",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Surveys_Users_AuthorId",
                table: "Surveys",
                column: "AuthorId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

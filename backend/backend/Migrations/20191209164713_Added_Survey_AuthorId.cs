using Microsoft.EntityFrameworkCore.Migrations;

namespace backend.Migrations
{
    public partial class Added_Survey_AuthorId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AuthorId",
                table: "Surveys",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Surveys_AuthorId",
                table: "Surveys",
                column: "AuthorId");

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

            migrationBuilder.DropIndex(
                name: "IX_Surveys_AuthorId",
                table: "Surveys");

            migrationBuilder.DropColumn(
                name: "AuthorId",
                table: "Surveys");
        }
    }
}

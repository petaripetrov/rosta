using Microsoft.EntityFrameworkCore.Migrations;

namespace backend.Migrations
{
    public partial class User_ChangedTo_UserDetails : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Candidacies_Users_OwnerId",
                table: "Candidacies");

            migrationBuilder.DropForeignKey(
                name: "FK_Surveys_Users_AuthorId",
                table: "Surveys");

            migrationBuilder.DropForeignKey(
                name: "FK_User_Users_DetailsId",
                table: "User");

            migrationBuilder.DropForeignKey(
                name: "FK_Users_Schools_SchoolId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_User_DetailsId",
                table: "User");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Users",
                table: "Users");

            migrationBuilder.RenameTable(
                name: "Users",
                newName: "UserDetails");

            migrationBuilder.RenameIndex(
                name: "IX_Users_SchoolId",
                table: "UserDetails",
                newName: "IX_UserDetails_SchoolId");

            migrationBuilder.AddColumn<string>(
                name: "UserId1",
                table: "UserDetails",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserDetails",
                table: "UserDetails",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_UserDetails_UserId1",
                table: "UserDetails",
                column: "UserId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Candidacies_UserDetails_OwnerId",
                table: "Candidacies",
                column: "OwnerId",
                principalTable: "UserDetails",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_Surveys_UserDetails_AuthorId",
                table: "Surveys",
                column: "AuthorId",
                principalTable: "UserDetails",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_UserDetails_Schools_SchoolId",
                table: "UserDetails",
                column: "SchoolId",
                principalTable: "Schools",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_UserDetails_User_UserId1",
                table: "UserDetails",
                column: "UserId1",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Candidacies_UserDetails_OwnerId",
                table: "Candidacies");

            migrationBuilder.DropForeignKey(
                name: "FK_Surveys_UserDetails_AuthorId",
                table: "Surveys");

            migrationBuilder.DropForeignKey(
                name: "FK_UserDetails_Schools_SchoolId",
                table: "UserDetails");

            migrationBuilder.DropForeignKey(
                name: "FK_UserDetails_User_UserId1",
                table: "UserDetails");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserDetails",
                table: "UserDetails");

            migrationBuilder.DropIndex(
                name: "IX_UserDetails_UserId1",
                table: "UserDetails");

            migrationBuilder.DropColumn(
                name: "UserId1",
                table: "UserDetails");

            migrationBuilder.RenameTable(
                name: "UserDetails",
                newName: "Users");

            migrationBuilder.RenameIndex(
                name: "IX_UserDetails_SchoolId",
                table: "Users",
                newName: "IX_Users_SchoolId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Users",
                table: "Users",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_User_DetailsId",
                table: "User",
                column: "DetailsId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Candidacies_Users_OwnerId",
                table: "Candidacies",
                column: "OwnerId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_Surveys_Users_AuthorId",
                table: "Surveys",
                column: "AuthorId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_User_Users_DetailsId",
                table: "User",
                column: "DetailsId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Schools_SchoolId",
                table: "Users",
                column: "SchoolId",
                principalTable: "Schools",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}

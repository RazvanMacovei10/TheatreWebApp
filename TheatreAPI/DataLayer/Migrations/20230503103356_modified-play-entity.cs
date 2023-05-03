using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataLayer.Migrations
{
    /// <inheritdoc />
    public partial class modifiedplayentity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TheatreId",
                table: "Plays",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Plays_TheatreId",
                table: "Plays",
                column: "TheatreId");

            migrationBuilder.AddForeignKey(
                name: "FK_Plays_Theatres_TheatreId",
                table: "Plays",
                column: "TheatreId",
                principalTable: "Theatres",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Plays_Theatres_TheatreId",
                table: "Plays");

            migrationBuilder.DropIndex(
                name: "IX_Plays_TheatreId",
                table: "Plays");

            migrationBuilder.DropColumn(
                name: "TheatreId",
                table: "Plays");
        }
    }
}

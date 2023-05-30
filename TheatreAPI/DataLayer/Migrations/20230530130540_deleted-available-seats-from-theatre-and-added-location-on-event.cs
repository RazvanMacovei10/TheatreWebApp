using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataLayer.Migrations
{
    /// <inheritdoc />
    public partial class deletedavailableseatsfromtheatreandaddedlocationonevent : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TotalSeats",
                table: "Theatres");

            migrationBuilder.RenameColumn(
                name: "AvailableSeats",
                table: "Events",
                newName: "AvailableTickets");

            migrationBuilder.AddColumn<string>(
                name: "Location",
                table: "Events",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Location",
                table: "Events");

            migrationBuilder.RenameColumn(
                name: "AvailableTickets",
                table: "Events",
                newName: "AvailableSeats");

            migrationBuilder.AddColumn<int>(
                name: "TotalSeats",
                table: "Theatres",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}

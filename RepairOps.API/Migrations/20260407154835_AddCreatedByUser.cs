using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RepairOps.API.Migrations
{
    /// <inheritdoc />
    public partial class AddCreatedByUser : Migration
    {
        /// <inheritdoc />
protected override void Up(MigrationBuilder migrationBuilder)
{
    // Column and index already exist from previous partial migration
    // Just update existing records and add the foreign key

    migrationBuilder.Sql("UPDATE `RepairTickets` SET `CreatedByUserId` = 1 WHERE `CreatedByUserId` = 0;");

    migrationBuilder.AddForeignKey(
        name: "FK_RepairTickets_Users_CreatedByUserId",
        table: "RepairTickets",
        column: "CreatedByUserId",
        principalTable: "Users",
        principalColumn: "Id",
        onDelete: ReferentialAction.Cascade);
}

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RepairTickets_Users_CreatedByUserId",
                table: "RepairTickets");

            migrationBuilder.DropIndex(
                name: "IX_RepairTickets_CreatedByUserId",
                table: "RepairTickets");

            migrationBuilder.DropColumn(
                name: "CreatedByUserId",
                table: "RepairTickets");
        }
    }
}

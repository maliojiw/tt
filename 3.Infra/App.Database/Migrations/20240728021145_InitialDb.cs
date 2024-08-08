using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace App.Database.Migrations
{
    /// <inheritdoc />
    public partial class InitialDb : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false, comment: "คีร์ของข้อมูล"),
                    nickname = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true, comment: "ชื่อเรียก"),
                    fullname = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true, comment: "ชื่อเต็ม"),
                    phone = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true, comment: "โทรศัพท์"),
                    email = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true, comment: "อีเมล/username"),
                    password = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true, comment: "รหัสผ่าน"),
                    created = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "เวลาสร้าง"),
                    updated = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "เวลาปรับปรุงล่าสุด"),
                    isActive = table.Column<bool>(type: "boolean", nullable: true, comment: "ใช้งานได้หรือไม่")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}

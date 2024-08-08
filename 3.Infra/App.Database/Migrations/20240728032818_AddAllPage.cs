using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace App.Database.Migrations
{
    /// <inheritdoc />
    public partial class AddAllPage : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "isAdmin",
                table: "Users",
                type: "boolean",
                nullable: true,
                comment: "เป็น Admin")
                .Annotation("Relational:ColumnOrder", 7);

            migrationBuilder.AddColumn<bool>(
                name: "isResearcher",
                table: "Users",
                type: "boolean",
                nullable: true,
                comment: "เป็น นักวิจัย")
                .Annotation("Relational:ColumnOrder", 9);

            migrationBuilder.AddColumn<bool>(
                name: "isWorker",
                table: "Users",
                type: "boolean",
                nullable: true,
                comment: "เป็น เจ้าหน้าที่ภาคสนาม")
                .Annotation("Relational:ColumnOrder", 8);

            migrationBuilder.CreateTable(
                name: "ActionTypes",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false, comment: "คีร์ของข้อมูล"),
                    name = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true, comment: "วิธีกำจัด"),
                    created = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "เวลาสร้าง"),
                    updated = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "เวลาปรับปรุงล่าสุด"),
                    isActive = table.Column<bool>(type: "boolean", nullable: true, comment: "ใช้งานได้หรือไม่")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ActionTypes", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "CountGroups",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false, comment: "คีร์ของข้อมูล"),
                    name = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true, comment: "ประมาณการ จำนวนที่พบ"),
                    nearbyCount = table.Column<int>(type: "integer", nullable: true, comment: "เทียบได้เป็นจำนวน"),
                    created = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "เวลาสร้าง"),
                    updated = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "เวลาปรับปรุงล่าสุด"),
                    isActive = table.Column<bool>(type: "boolean", nullable: true, comment: "ใช้งานได้หรือไม่")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CountGroups", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "CountTypes",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false, comment: "คีร์ของข้อมูล"),
                    name = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true, comment: "วิธีตรวจนับ"),
                    created = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "เวลาสร้าง"),
                    updated = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "เวลาปรับปรุงล่าสุด"),
                    isActive = table.Column<bool>(type: "boolean", nullable: true, comment: "ใช้งานได้หรือไม่")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CountTypes", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Places",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false, comment: "คีร์ของข้อมูล"),
                    name = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true, comment: "ชื่อเรียกจุดที่พบ"),
                    province = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true, comment: "จังหวัด"),
                    amphor = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true, comment: "อำเภอ"),
                    tumbon = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true, comment: "ตำบล"),
                    riverName = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true, comment: "ชื่อแม่น้ำ"),
                    nearbyPlace = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true, comment: "สถานที่ใกล้เคียง"),
                    locationLat = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true, comment: "Lat"),
                    locationLong = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true, comment: "Long"),
                    created = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "เวลาสร้าง"),
                    updated = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "เวลาปรับปรุงล่าสุด"),
                    isActive = table.Column<bool>(type: "boolean", nullable: true, comment: "ใช้งานได้หรือไม่")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Places", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "ActionHistorys",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false, comment: "คีร์ของข้อมูล"),
                    actionDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "วันที่ทำ กิจกรรม"),
                    note = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true, comment: "รายละเอียดเพิ่มเติม"),
                    userId = table.Column<Guid>(type: "uuid", nullable: true, comment: "ผู้ให้ข้อมูล"),
                    actionId = table.Column<Guid>(type: "uuid", nullable: true, comment: "ประเภทกิจกรรม"),
                    created = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "เวลาสร้าง"),
                    updated = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "เวลาปรับปรุงล่าสุด"),
                    isActive = table.Column<bool>(type: "boolean", nullable: true, comment: "ใช้งานได้หรือไม่")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ActionHistorys", x => x.id);
                    table.ForeignKey(
                        name: "FK_ActionHistorys_ActionTypes_actionId",
                        column: x => x.actionId,
                        principalTable: "ActionTypes",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_ActionHistorys_Users_userId",
                        column: x => x.userId,
                        principalTable: "Users",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "FoundHistorys",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false, comment: "คีร์ของข้อมูล"),
                    foundDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "วันที่พบ"),
                    countTypeId = table.Column<Guid>(type: "uuid", nullable: true, comment: "วิธีนับจำนวน"),
                    placeId = table.Column<Guid>(type: "uuid", nullable: true, comment: "ตำแหน่งที่พบ"),
                    totalFound = table.Column<Guid>(type: "uuid", nullable: true, comment: "จำนวนที่พบ"),
                    note = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true, comment: "รายละเอียดเพิ่มเติม"),
                    userId = table.Column<Guid>(type: "uuid", nullable: true, comment: "ผู้ให้ข้อมูล"),
                    created = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "เวลาสร้าง"),
                    updated = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "เวลาปรับปรุงล่าสุด"),
                    isActive = table.Column<bool>(type: "boolean", nullable: true, comment: "ใช้งานได้หรือไม่")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FoundHistorys", x => x.id);
                    table.ForeignKey(
                        name: "FK_FoundHistorys_CountGroups_totalFound",
                        column: x => x.totalFound,
                        principalTable: "CountGroups",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_FoundHistorys_CountTypes_countTypeId",
                        column: x => x.countTypeId,
                        principalTable: "CountTypes",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_FoundHistorys_Places_placeId",
                        column: x => x.placeId,
                        principalTable: "Places",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_FoundHistorys_Users_userId",
                        column: x => x.userId,
                        principalTable: "Users",
                        principalColumn: "id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_ActionHistorys_actionId",
                table: "ActionHistorys",
                column: "actionId");

            migrationBuilder.CreateIndex(
                name: "IX_ActionHistorys_userId",
                table: "ActionHistorys",
                column: "userId");

            migrationBuilder.CreateIndex(
                name: "IX_FoundHistorys_countTypeId",
                table: "FoundHistorys",
                column: "countTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_FoundHistorys_placeId",
                table: "FoundHistorys",
                column: "placeId");

            migrationBuilder.CreateIndex(
                name: "IX_FoundHistorys_totalFound",
                table: "FoundHistorys",
                column: "totalFound");

            migrationBuilder.CreateIndex(
                name: "IX_FoundHistorys_userId",
                table: "FoundHistorys",
                column: "userId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ActionHistorys");

            migrationBuilder.DropTable(
                name: "FoundHistorys");

            migrationBuilder.DropTable(
                name: "ActionTypes");

            migrationBuilder.DropTable(
                name: "CountGroups");

            migrationBuilder.DropTable(
                name: "CountTypes");

            migrationBuilder.DropTable(
                name: "Places");

            migrationBuilder.DropColumn(
                name: "isAdmin",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "isResearcher",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "isWorker",
                table: "Users");
        }
    }
}

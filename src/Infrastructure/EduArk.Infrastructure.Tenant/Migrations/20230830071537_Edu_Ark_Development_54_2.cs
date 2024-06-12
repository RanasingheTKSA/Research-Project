using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EduArk.Infrastructure.Tenant.Migrations
{
    /// <inheritdoc />
    public partial class Edu_Ark_Development_54_2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LessonGrade",
                table: "Lesson");

            migrationBuilder.DropColumn(
                name: "LessonSubject",
                table: "Lesson");

            migrationBuilder.AddColumn<int>(
                name: "AcademicLevelId",
                table: "Lesson",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "SubjectId",
                table: "Lesson",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Lesson_AcademicLevelId",
                table: "Lesson",
                column: "AcademicLevelId");

            migrationBuilder.CreateIndex(
                name: "IX_Lesson_SubjectId",
                table: "Lesson",
                column: "SubjectId");

            migrationBuilder.AddForeignKey(
                name: "FK_Lesson_AcademicLevel_AcademicLevelId",
                table: "Lesson",
                column: "AcademicLevelId",
                principalTable: "AcademicLevel",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Lesson_Subject_SubjectId",
                table: "Lesson",
                column: "SubjectId",
                principalTable: "Subject",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Lesson_AcademicLevel_AcademicLevelId",
                table: "Lesson");

            migrationBuilder.DropForeignKey(
                name: "FK_Lesson_Subject_SubjectId",
                table: "Lesson");

            migrationBuilder.DropIndex(
                name: "IX_Lesson_AcademicLevelId",
                table: "Lesson");

            migrationBuilder.DropIndex(
                name: "IX_Lesson_SubjectId",
                table: "Lesson");

            migrationBuilder.DropColumn(
                name: "AcademicLevelId",
                table: "Lesson");

            migrationBuilder.DropColumn(
                name: "SubjectId",
                table: "Lesson");

            migrationBuilder.AddColumn<string>(
                name: "LessonGrade",
                table: "Lesson",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LessonSubject",
                table: "Lesson",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}

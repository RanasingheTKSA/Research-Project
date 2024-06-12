namespace EduArk.Application.DTOs.TenantDTOs
{
    public class LessonDTO
    {
        public LessonDTO() 
        {
            Grades = new List<string>();
        }

        public int Id { get; set; }
        public string? LessonName { get; set; }
        public string? LessonDescription { get; set; }
        public string? LessonGrade { get; set; }
        public string? LessonSubject { get; set; }
        public string? LessonStatus { get; set; }
        public List<string> Grades { get; set; }
        public int AcademicLevelId { get; set; }
        public string? AcademicLevelName { get; set; }

        public int SubjectId { get; set; }
        public string? SubjectName { get; set; }

        public string? CreatedDate { get; set; }
        public string? UpdatedDate { get; set; }
        public bool? IsActive { get; set; }
    }
}

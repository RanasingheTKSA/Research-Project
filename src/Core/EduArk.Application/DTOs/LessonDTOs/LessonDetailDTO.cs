namespace EduArk.Application.DTOs.LessonDTOs
{
    public class LessonDetailDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int AcademicLevelId { get; set; }
        public int SubjectId { get; set; }
    }
}

using EduArk.Application.DTOs.CommonDTOs;

namespace EduArk.Application.DTOs.TenantDTOs
{
    public class LessonDetailsFilterDTO : CorePaginationFilterDTO
    {
        public int AcademicLevelId { get; set; }
        public int SubjectId { get; set; }
    }
}

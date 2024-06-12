namespace EduArk.Domain.Entities.Tenant
{
    public class LearningPatternSetting : BaseEntity
    {
        public int StudentId { get; set; }
        public int AcademicLevelId { get; set; }
        public string LearningPattern { get; set; }

        public virtual AcademicLevel AcademicLevel { get; set; }
        public virtual Student Student { get; set; }
    }
}

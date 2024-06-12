using EduArk.Domain.Repositories.Query.Base;

namespace EduArk.Domain.Repositories.Query.Tenant
{
    public interface ILessonQueryRepository : IQueryRepository<Lesson>
    {
        //Task<IQueryable<Lesson>> GetAllListOfLessonsAsync(CancellationToken cancellationToken);
    }
}
